const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Error Handling Middleware
const handleErrors = (res) => {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
};

// ROUTE 1: Fetch all the Notes using - GET "/api/notes/fetchnotes" (Login Required)
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json({ success: true, data: notes });
    } catch (error) {
        handleErrors(res);
    }
});

// ROUTE 2: Add a Note using - POST "/api/notes/addnote" (Login Required)
router.post('/addnote', fetchuser, [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty')
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const note = new Note({
            user: req.user.id,
            title,
            description,
            tag
        });

        const savedNote = await note.save();

        res.json({ success: true, data: savedNote });

    } catch (error) {
        handleErrors(res);
    }
});

// ROUTE 3: Update an existing Note using - PUT "/api/notes/updatenote/:id" (Login Required)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, error: 'Not Found' });
        }

        // Allow updation only if the user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not Allowed' });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ success: true, data: updatedNote });
    } catch (error) {
        handleErrors(res);
    }
});

// ROUTE 4: Delete an existing Note using - DELETE "/api/notes/deletenote/:id" (Login Required)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, error: 'Not Found' });
        }

        // Allow deletion only if the user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not Allowed' });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Note has been deleted', data: note });
    } catch (error) {
        handleErrors(res);
    }
});

module.exports = router;
