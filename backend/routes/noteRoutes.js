const express = require("express");
const Note = require("../models/note");
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("../utilities")
const router = express.Router();

router.post("/add-note", authenticationToken, async (req, res) => {
    try {
        const { title, content, tag } = req.body;

        console.log("Decoded User:", req.user);

        const newNote = new Note({
            title,
            content,
            tag,
            isPinned: false,
            userId: req.user.id,
        });

        await newNote.save();

        return res.json({
            error: false,
            message: "Note added successfully",
            note: newNote,
        });

    } catch (error) {
        console.log("ADD NOTE ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tag, isPinned } = req.body;

    const userId = req.user.id;

    if (!title && !content && !tag && typeof isPinned === "undefined") {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tag) note.tag = tag;
        if (typeof isPinned !== "undefined") note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });

    } catch (error) {
        console.log("EDIT NOTE ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.get("/get-all-notes/", authenticationToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const notes = await Note.find({ userId }).sort({ isPinned: -1 })

        return res.json({
            error: false,
            notes,
            message: "All notes retieved successfully",
        });

    } catch (error) {
        console.log("EDIT NOTE ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }

})

router.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const userId = req.user.id;

    try {
        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        };

        await Note.deleteOne({ _id: noteId, userId });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        console.log("Deleted NOTE ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.put("/update-note-pinned/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;

    const userId = req.user.id;

    try {
        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (typeof isPinned !== "undefined") note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });

    } catch (error) {
        console.log("EDIT NOTE ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

router.get("/search-notes", authenticationToken, async (req, res) => {
    const userId = req.user.id; // user id from token
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            error: true,
            message: "Search query is required"
        });
    }

    try {
        const matchingNotes = await Note.find({
            userId: userId,   // FIXED
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully"
        });

    } catch (error) {
        console.error(error); // show actual error in backend terminal
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});



module.exports = router;