import React from 'react'
import { useTaskContext } from '../context/taskContext'

const ListTasks = () => {
    const { tasks } = useTaskContext();

    return (
        <div className='mt-6 w-full max-w-md'>
            <ul className='space-y-2'>
                {tasks.map((task, index) => (
                    <li key={index}
                        className='p-3 bg-white rounded shadow-sm border'>
                        {task}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default ListTasks
