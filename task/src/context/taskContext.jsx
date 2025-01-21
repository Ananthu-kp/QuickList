import React, { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        if (task.trim()) {
            setTasks((prev) => [...prev, task]);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask }}>
            {children}
        </TaskContext.Provider>
    )
}