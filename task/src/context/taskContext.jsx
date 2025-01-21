import React, { createContext, useState, useContext, useCallback } from "react";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const addTask = (task) => {
        if (task.trim()) {
            setTasks((prev) => [...prev, { id: Date.now(), text: task, completed: false }]);
        }
    }

    const toggleTaskCompletion = useCallback(
        (id) => {
            setTasks((prevTasks) => {
                const taskToComplete = prevTasks.find((task) => task.id === id);
                if (taskToComplete) {
                    setCompletedTasks((prevCompleted) => {
                        if (!prevCompleted.some((task) => task.id === id)) {
                            return [ ...prevCompleted, { ...taskToComplete, completed: true }];
                        }
                        return prevCompleted;
                    });
                    return prevTasks.filter((task) => task.id !== id);
                }
                return prevTasks;
            });
        },
        [setTasks, setCompletedTasks]
    );

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, completedTasks }}>
            {children}
        </TaskContext.Provider>
    )
}