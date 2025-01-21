import React, { useState } from 'react';
import { useTaskContext } from '../context/taskContext'

const AddTasks = () => {
    const [task, setTask] = useState('');
    const { addTask } = useTaskContext()

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setTask('')
    }

    return (
        <div className='flex flex-col items-center'>
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
                <input
                    type='text'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder='Add new task'
                    className='w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <button type='submit'
                    className='mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'>
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default AddTasks
