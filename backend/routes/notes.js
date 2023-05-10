const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');

const Notes = require('../models/Notes');


// Route 1: Get all the notes:GET "/api/notes/getAllNotes". require login
router.get('/getAllNotes', fetchUser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id });
            res.json(notes)
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('Internal Server error')
        }

    })


// Route 2: Add the note:POST "/api/notes/addnote".  require login
router.get('/addnote', fetchUser,
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    // body('name', 'Enter Valid name').isLength({ min: 3 }),
    async (req, res) => {
        const { title, description, tag } = req.body;
        //if there are error return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //if there is error
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const note = new Notes({
                title, description, tag, user: req.user.id //user.id will come from fetchUser
            })
            const savenote = await note.save()
            // const notes = await Notes.find({ user: req.user.id });
            res.json(savenote)

        }
        catch (error) {
            console.error(error.message);
            return res.status(500).send('Internal Server error')
        }

    })



module.exports = router