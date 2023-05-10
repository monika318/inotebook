const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "ThisisaTrail";

// Route 1: Create a user using :POST "/api/auth/createuser". Doesn't require Authentication
router.post('/createuser',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('name', 'Enter Valid name').isLength({ min: 3 }),
    async (req, res) => {
        //if there are error return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //if there is error
            return res.status(400).json({ errors: errors.array() });
        }
        //Check whether the user with the same email exists already
        try {
            let user = await Users.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ errors: "Sorry a user with this email already exists" });
            }

            //salt and pepper concept
            const salt = await bcrypt.genSalt(10);
            //await ensures this line has to be finished to go further down the code
            const secPass = await bcrypt.hash(req.body.password, salt);

            //Create and new user
            user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            res.json({ token });

        } catch (error) {
            console.error(error.message);
            return res.status(500).send('some error occured');
        }
    });

//Route 2: Authenticate a user using :POST "/api/auth/login". No login Required
router.post('/login',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    async (req, res) => {
        //If there are error return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //if there is error
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body; //user detail from the frontend
        try {
            let user = await Users.findOne({ email });//bringing user from the database through the schema
            if (!user) {
                return res.status(400).json('Please enter correct credentials');
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json('Please enter correct credentials');
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            res.json({ token });
        }
        catch (error) {
            console.error(error.message);
            return res.status(500).send('Internal Server error');
        }

    })


module.exports = router