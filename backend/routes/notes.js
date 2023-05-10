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


// Route 3: Update the note:PUT "/api/notes/updatenote".  require login
router.put('/updatenote/:id', fetchUser,
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    // body('name', 'Enter Valid name').isLength({ min: 3 }),
    async (req, res) => {
        const { title, description, tag } = req.body;
        //create new note
        const newNote = new Notes();
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        //find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        newNote._id = note._id; //explicitly add the id 
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    })


module.exports = router