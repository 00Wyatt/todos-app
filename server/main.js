import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import { ServiceConfiguration } from 'meteor/service-configuration';

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

    ServiceConfiguration.configurations.upsert(
        { service: 'github' },
        {
          $set: {
            loginStyle: 'popup',
            clientId: '9ca17aff7cc92c474e8f',
            secret: 'ced3832e979fa951e793c21d5ffe8c4aa33110db',
          },
        }
      );
});
