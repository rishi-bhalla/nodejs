const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Rishi1',
    email: 'rishi1@test.com',
    password: 'test@123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

const userTwoId = mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Rishi2',
    email: 'rishi2@test.com',
    password: 'test@123',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task One',
    completed: false,
    owner: userOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Two',
    completed: true,
    owner: userOne._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Three',
    completed: true,
    owner: userTwo._id
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};