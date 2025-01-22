import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [completedTasks, setCompletedTasks] = useState(() => {
        const savedCompletedTasks = localStorage.getItem("completedTasks");
        return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }, [completedTasks]);

    const addTask = useCallback((task) => {
        const trimmedTask = task.trim();
        if (!trimmedTask) {
            toast.error("Task cannot be empty!");
            return;
        }
        if (trimmedTask.length > 25) {
            toast.error("Task length is too long.");
            return;
        }
        const taskExists = tasks.some(
            (existingTask) => existingTask.text.toLowerCase() === trimmedTask.toLowerCase()
        );
        if (taskExists) {
            toast.error("Task already exists!");
            return;
        }

        const newTask = { id: Date.now(), text: trimmedTask, completed: false };
        setTasks((prev) => [...prev, newTask]);
        toast.success("Task added successfully!");
    }, [tasks]);

    const toggleTaskCompletion = useCallback((id) => {
        setTasks((prevTasks) => {
            const taskToMove = prevTasks.find((task) => task.id === id);
            if (taskToMove) {
                setCompletedTasks((prevCompleted) => {
                    const alreadyCompleted = prevCompleted.some((task) => task.id === id);
                    if (!alreadyCompleted) {
                        return [...prevCompleted, { ...taskToMove, completed: true }];
                    }
                    return prevCompleted; 
                });
                return prevTasks.filter((task) => task.id !== id);
            }
            return prevTasks;
        });
    }, []);
    

    const deleteTask = useCallback((id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter((task) => task.id !== id);
            return updatedTasks;
        });
        setCompletedTasks((prevCompleted) =>
            prevCompleted.filter((task) => task.id !== id)
        );
        toast.success("Task deleted successfully!");
    }, []);

    const editTask = useCallback((id, newTask) => {
        const trimmedTask = newTask.trim();
        if (trimmedTask.length > 25) {
            toast.error("Task length is too long.");
            return;
        }
        const taskExists = tasks.some(
            (task) =>
                task.text.toLowerCase() === trimmedTask.toLowerCase() && task.id !== id
        );
        if (taskExists) {
            toast.error("Task already exists!");
            return;
        }
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, text: trimmedTask } : task
            )
        );
        toast.success("Task updated successfully!");
    }, [tasks]);

    const deleteAllCompletedTask = useCallback(() => {
        setCompletedTasks([]);
        toast.success("All completed tasks deleted!");
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, completedTasks, addTask, toggleTaskCompletion, deleteTask, editTask, deleteAllCompletedTask }} >
            {children}
        </TaskContext.Provider>
    );
};