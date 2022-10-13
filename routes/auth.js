const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
SECRET_KEY = "123456789"

// Login through username and password
router.post('/', async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('Invalid email or password');
    
        const passValid = await bcrypt.compare(req.body.password, user.password);
        if (!passValid) return res.status(400).send('Invalid email or password');
        
        // Generate token
        const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, SECRET_KEY);
        const uId = user._id;
        return res.status(200).send({ token:token });
    }
    catch(ex) {
        res.status(500).send("Error" + ex.message);
    }
    
  });

  module.exports = router;