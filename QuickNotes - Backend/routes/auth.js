const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_Secret = process.env.JWT_Secret;
let success = false;

// ROUTE 1: Create a User using - POST "/api/auth/signup" (No Login Required)
router.post('/signup', [
    body('name', 'Name must be between 3 and 20 characters').isLength({ min: 3, max: 20 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 })
], async (req, res) => {
    // If there are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: 'sorry a user with this mail is already exists' });
        }

        // If user not exists then create a new user
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, JWT_Secret);
        success = true;
        return res.json({success, token});
        // return res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Authenticate a User using - POST "/api/auth/login" (No Login Required)
router.post('/login', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    // If there are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'invalid email or password' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: 'invalid email or password' });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, JWT_Secret);
        success = true;
        return res.json({success, token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 3: Get logged-in User details using - POST "/api/auth/getuser" (Login Required)
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;