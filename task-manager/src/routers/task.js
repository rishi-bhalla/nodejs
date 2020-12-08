const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    // uses async & await
    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }

    // uses promises

    /*task.save().then(() => {
        res.status(201).send(task);
    }).catch(e => {
        res.status(400).send(e);
    });*/
});

// GET /tasks
// GET /tasks?completed=true
// GET /tasks?completed=false
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    // uses async & await
    try {

        /**
         * There are two approaches to find the tasks associated with a particular user:
         * 
         * 1. We can directly do a find query on the owner attribute where owner is the foreign key of user id 
         *    in the tasks collection.
         * 
         * 2. We can use the mongoose's execPopulate notion where all the references are managed by mongoose.
         */

        // const tasks = await Task.find({ owner: req.user._id });  APPROACH 1

        // await req.user.populate('tasks').execPopulate();        // APPROACH 2 get all tasks

        // additional behaviour to add filter criteria's to the tasks

        await req.user.populate({                               
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort    // ascending = 1, descending = -1
            }
        }).execPopulate();

        res.send(req.user.tasks);
    } catch(e) {
        res.status(500).send(e);
    }

    // uses promises

    /*Task.find({}).then(tasks => {
        res.send(tasks);
    }).catch(e => {
        res.status(500).send();
    });*/
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    
    // uses async & await
    try {
        // find by task id and owner of the task
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        } 
         
        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }

    // uses promises

    /*Task.findById(_id).then(task => {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch(e => {
        res.status(500).send();
    });*/
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        // find the task by id and its owner
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        /*
        NOT USING FINDBYIDANDUPDATE AS IT CAUSES ISSUES WITH MONGOOSE MIDDLEWARE TO USE THE HASHING LIBRARY
        FOR HASHING PASSWORDS RIGHT BEFORE WE SAVE THE OBJECT INTO THE DATABASE. SO NOW WE USE FIND AND THEN SAVE.
        
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });*/
    
        if(!task) {
            return res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
    
        res.send(task);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // find task by id and its owner
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if(!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;