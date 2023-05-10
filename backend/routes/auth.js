const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');

//Create a user using :POST "/api/auth/createuser". Doesn't require Authentication
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
            user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.json(user)
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('some error occured');
        }
    });

module.exports = router