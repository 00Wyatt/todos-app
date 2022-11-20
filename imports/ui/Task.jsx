import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    return (
        <li className="p-3 flex items-center border border-lightGrey rounded shadow">
            <input
                className="mr-2 outline-primary"
                type="checkbox"
                checked={!!task.isChecked}
                onClick={() => onCheckboxClick(task)}
                readOnly
            />
            <span className="grow font-medium">{task.text}</span>
            <button className="px-1.5 bg-secondary text-white text-xl font-bold outline-primary rounded hover:opacity-90 transition-opacity"
                onClick={() => onDeleteClick(task)}>&times;</button>
        </li>
    )
};