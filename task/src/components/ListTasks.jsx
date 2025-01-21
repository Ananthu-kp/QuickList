import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTaskContext } from '../context/taskContext';
import EditTaskModal from '../swals/EditTaskModal';
import { confirmDelete, confirmDeleteAll } from '../swals/DeleteConfirmModal';

const ListTasks = () => {
    const { tasks, completedTasks, toggleTaskCompletion, deleteTask, editTask, deleteAllCompletedTask } = useTaskContext();

    const handleEditTask = async (task) => {
        const newTask = await EditTaskModal(task);
        if (newTask) {
            editTask(task.id, newTask);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            deleteTask(taskId);
        }
    };

    const handleDeleteAllCompleted = async () => {
        const result = await confirmDeleteAll();
        if (result.isConfirmed) {
            deleteAllCompletedTask();
        }
    };

    return (
        <div className='mt-6 w-full max-w-md'>
            {tasks.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Active Tasks</h2>
                    <ul className='space-y-2'>
                        {tasks.slice().reverse().map((task) => (
                            <li key={task.id}
                                className='p-3 bg-white rounded shadow-sm border flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <input type='checkbox'
                                        onChange={() => toggleTaskCompletion(task.id)}
                                        className='mr-3'
                                    />
                                    <span>{task.text}</span>
                                </div>
                                <div className='flex space-x-3'>
                                    <FaEdit
                                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                        onClick={() => handleEditTask(task)}
                                    />
                                    <FaTrash
                                        className="text-red-500 hover:text-red-700 cursor-pointer"
                                        onClick={() => handleDeleteTask(task.id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Completed Tasks</h2>
                    <ul className="space-y-2">
                        {completedTasks.map((task) => (
                            <li
                                key={task.id}
                                className="p-3 bg-gray-100 rounded shadow-sm border line-through flex items-center justify-between">
                                <span>{task.text}</span>
                                <FaTrash
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => handleDeleteTask(task.id)}
                                />
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleDeleteAllCompleted} className='mt-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700'>
                        Delete All Tasks
                    </button>
                </>
            )}
        </div>
    );
};

export default ListTasks;
