const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const { model } = require('./models/task');

const app = express();

// this line automatically parses the incoming json into object
app.use(express.json()); 
app.use(userRouter);
app.use(taskRouter);

module.exports = app;