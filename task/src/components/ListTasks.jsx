import React from 'react'
import { useTaskContext } from '../context/taskContext'

const ListTasks = () => {
    const { tasks, completedTasks, toggleTaskCompletion } = useTaskContext();

    return (
        <div className='mt-6 w-full max-w-md'>
            {tasks.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks</h2>
                    <ul className='space-y-2'>
                        {tasks.map((task) => (
                            <li key={task.id}
                                className='p-3 bg-white rounded shadow-sm border flex items-center'>
                                <input type='checkbox'
                                    onChange={() => toggleTaskCompletion(task.id)}
                                    className='mr-3'
                                />
                                <span>{task.text}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Completed</h2>
                    <ul className="space-y-2">
                        {completedTasks.map((task) => (
                            <li key={task.id} className="p-3 bg-gray-100 rounded shadow-sm border line-through">
                                {task.text}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default ListTasks
