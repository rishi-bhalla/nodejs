const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/accounts');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    // uses async & await
    try {
        await user.save();
        //sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token});
    } catch(e) {
        res.status(400).send(e);
    }

    // uses promises
    
    /*user.save().then(() => {
        res.status(201).send(user);
    }).catch(e => {
        res.status(400).send(e);
    });*/
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch(e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {

    // user will be authenticated by the 'auth' middleware, no need to find the user again as 
    //we already have it from auth

    res.send(req.user);

    // uses async & await
    /*try {
        const users = await User.find({});
        res.send(users);
    } catch(e) {
        res.status(500).send(e);
    }*/

    // uses promises
    
    /*User.find({}).then(users => {
        res.send(users);
    }).catch(e => {
        res.status(500).send();
    });*/
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        /*
        NOT USING FINDBYIDANDUPDATE AS IT CAUSES ISSUES WITH MONGOOSE MIDDLEWARE TO USE THE HASHING LIBRARY
        FOR HASHING PASSWORDS RIGHT BEFORE WE SAVE THE OBJECT INTO THE DATABASE. SO NOW WE USE FIND AND THEN SAVE.

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true
        });*/
        
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        
        res.send(req.user);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        /*
        since we have already found the user in the auth function, we don't need to find and delete any more.
        we can directly delete the user

        const user = await User.findByIdAndDelete(req.user._id);

        if(!user) {
            return res.status(404).send();
        }*/

        await req.user.remove();
        //sendCancellationEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch(e) {
        res.status(500).send(e);
    }
});

const upload = multer({
    /**
        The "dest" option will store the files on the filesystem. 
        This has been commented out as we need to store the data into the database, so we need to have access to 
        it inside our route handler.
     */

    //dest: 'avatars',      
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload jpg, jpeg or png files.'));
        }

        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error('User not found.');
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch(e) {
        res.status(404).send();
    }
});

module.exports = router;