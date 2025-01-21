import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTask = localStorage.getItem('tasks');
        return savedTask ? JSON.parse(savedTask) : [];
    });
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }, [tasks])

    const addTask = useCallback((task) => {
        const trimmedTask = task.trim();
        if (!trimmedTask) {
            toast.error("Task cannot be empty!")
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

        setTasks((prev) => [
            ...prev,
            { id: Date.now(), text: trimmedTask, completed: false },
        ]);
        toast.success('Task added successfully!')
    }, [tasks]);

    const toggleTaskCompletion = useCallback((id) => {
        setTasks((prevTasks) => {
            const taskToToggle = prevTasks.find((task) => task.id === id);

            if (!taskToToggle) return prevTasks;

            setCompletedTasks((prevCompleted) => {
                if (!prevCompleted.some((task) => task.id === id)) {
                    return [...prevCompleted, { ...taskToToggle, completed: true }];
                }
                return prevCompleted;
            });
            return prevTasks.filter((task) => task.id !== id);
        });
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks((prevTasks) => {
            const deletedTasks = prevTasks.filter((task) => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(deletedTasks));
            return deletedTasks;
        });
        setCompletedTasks((prevCompleted) => prevCompleted.filter((task) => task.id !== id));
        toast.success('Task deleted successfully!');
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
        setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, text: newTask } : task))
        toast.success('Task updated successfully!');
    }, [tasks])

    const deleteAllCompletedTask = useCallback(() => {
        setCompletedTasks([]);
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter((task) => !task.completed);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });

        toast.success('All completed tasks deleted!');
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, completedTasks, deleteTask, editTask, deleteAllCompletedTask }}>
            {children}
        </TaskContext.Provider>
    );
};