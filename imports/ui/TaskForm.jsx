import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const TaskForm = () => {
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call('tasks.insert', text);

        setText('');
    };

    return (
        <form className="w-full flex items-center" onSubmit={handleSubmit}>
            <input
                className="input mr-2"
                type="text"
                placeholder="Type to add new tasks"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="button min-w-fit" type="submit">Add Task</button>
        </form>
    );
};