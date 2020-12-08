/**
 * This file is more of testing the various CRUD operations with mongodb and does not contribute to the overall application.
 * This is more of a standalone file.
 */

// CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to the database!');
    }

    console.log('Connected correctly!');
    const db = client.db(databaseName);

    /*db.collection('users').findOne({ _id: new ObjectID('5fb569c1c9be563fb004e109') }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch user!');
        }

        console.log(user);
    });*/

    /*db.collection('users').find({ age: 22 }).toArray((error, users) => {
        console.log(users);
    });

    db.collection('users').find({ age: 22 }).count((error, count) => {
        console.log(count);
    });*/

    /*db.collection('users').findOne({ name: 'Rishi', age: 25 }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch user!');
        }

        console.log(user);
    });*/
    
    /*db.collection('users').insertOne({
        _id: id,
        name: 'Test',
        age: 26
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user!');
        }

        console.log(result.ops);
    });*/

    /*db.collection('users').insertMany([
        {
            name: 'Love',
            age: 21
        }, 
        {
            name: 'Varan',
            age: 18
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert users!');
        }
        console.log(result.ops);
    });*/

    /*db.collection('tasks').insertMany([
        {
            describe: 'Task 1',
            completed: true
        },
        {
            describe: 'Task 2',
            completed: true
        },
        {
            describe: 'Task 3',
            completed: false
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert tasks!');
        }

        console.log(result.ops);
    });*/

    /*db.collection('tasks').findOne({ _id: new ObjectID('5fb5622981cf293cfc7c4d7e') }, (error, task) => {
        console.log(task);
    });

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks);
    });*/


    // UPDATE

    /*db.collection('users').updateOne({ 
        _id: new ObjectID('5fb55df9cd8334384872a1cc') 
    }, {
        $set: {
            name: 'Rishi Update'
        }
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });*/

    /*db.collection('users').updateOne({ 
        _id: new ObjectID('5fb55df9cd8334384872a1cc') 
    }, {
        $inc: {
            age: 'Rishi Update'
        }
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });*/

    /*db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => {
        console.log(result.modifiedCount);
    }).catch(error => {
        console.log(error);
    })*/

    
    // DELETE
    /*db.collection('users').deleteMany({
        age: 22
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });*/

    db.collection('tasks').deleteMany({
        describe: 'Task 1'
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
});
