const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

// add user to database
router.post('/', async (req, res) => {
    try{
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt)
        let user = new User({
            username: req.body.username,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
        });
        await user.save();
        return res.send({
            username:user.username,
            isAdmin:user.isAdmin
        });
    }
    catch(ex) {
        res.status(500).send("Error" + ex.message);
    }
    
});

module.exports = router;