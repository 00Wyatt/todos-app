import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';

const toggleChecked = ({ _id, isChecked }) =>
    Meteor.call('tasks.setIsChecked', _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const App = () => {
    // Wrap user in useTracker hook to be reactive.
    const user = useTracker(() => Meteor.user());

    const [hideCompleted, setHideCompleted] = useState(false);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const userFilter = user ? { userId: user._id } : {};
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

    const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
        const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const tasks = TasksCollection.find(
            hideCompleted ? pendingOnlyFilter : userFilter,
            {
                sort: { createdAt: -1 },
            }
        ).fetch();

        // Get number of uncompleted tasks.
        const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

        return { tasks, pendingTasksCount };
    });

    // Set variable to add uncompleted tasks to title.
    const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
        }`;

    // Save logout method into a variable.
    const logout = () => Meteor.logout();

    return (
        <div className="bg-white text-darkGrey">
            <header className="absolute top-0 inset-x-0 shadow-md">
                <div className="py-2 text-center">
                    <h1 className="text-secondary text-2xl font-semibold">
                        <span className="text-primary">To-do </span>List
                        {pendingTasksTitle}
                    </h1>
                </div>
            </header>
            <div className="min-h-screen pt-12 grid max-width">
                {user ? (
                    <Fragment>
                            <div className="p-3 flex flex-col gap-3">
                                <div className="text-secondary py-2 self-start font-semibold cursor-pointer" onClick={logout}>
                                    {user.username || user.profile.name}
                                </div>
                                <TaskForm />
                                <div className="my-2 justify-self-center self-center">
                                    <button className="button-outline" onClick={() => setHideCompleted(!hideCompleted)}>
                                        {hideCompleted ? 'Show All' : 'Hide Completed'}
                                    </button>
                                </div>
                                {isLoading && <div className="loading">Loading...</div>}
                                <ul className="grid gap-1.5">
                                    {tasks.map(task => <Task
                                        key={task._id} task={task}
                                        onCheckboxClick={toggleChecked}
                                        onDeleteClick={deleteTask}
                                    />)}
                                </ul>
                            </div>
                    </Fragment>
                ) : (
                    <LoginForm />
                )}
            </div>
        </div>
    );
};
