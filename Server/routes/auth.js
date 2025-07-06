const express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require('../Models/User.js')

const router = express.Router();

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        //does user already exist
        let user = await User.findOne({email});
        if (user) return res.json({msg: 'user already exists'})

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //save new user
        user = new User({name, email, password: hashedPassword});
        await user.save();

        //create JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({token, user: {id: user._id, name:user.name, email:user.email}})
    }catch(error){
    res.json(error)
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.json({ msg: 'Invalid Credentials'});

        //validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({msg: 'Invalid Password'});

        //create JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: '1d',
        });

        res.json({
            token,
            user: { id:user._id, name:user.name, email:user.email },
        }); 
    }catch(error){
        console.log(error);
        res.json(error)
    }
})

module.exports = router;