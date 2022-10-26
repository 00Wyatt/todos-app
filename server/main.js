import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';

// Insert new tasks into collection.
const insertTask = (taskText, user) =>
    TasksCollection.insert({
        text: taskText,
        userId: user._id,
        createdAt: new Date()
    });

// Default user credentials.
const SEED_USERNAME = 'gandalf';
const SEED_PASSWORD = 'password';

// Runs when server is started.
Meteor.startup(() => {
    // Create the default user.
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }

    // Create variable for the default user.
    const user = Accounts.findUserByUsername(SEED_USERNAME);

    // Insert default tasks.
    if (TasksCollection.find().count() === 0) {
        [
            'First Task',
            'Second Task',
            'Third Task',
            'Fourth Task',
            'Fifth Task',
            'Sixth Task',
            'Seventh Task'
        ].forEach(taskText => insertTask(taskText, user));
    }
});
