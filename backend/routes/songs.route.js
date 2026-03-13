const express = require('express');
const router = express.Router();
const upload = require('../services/storage.service');
const Song = require("../models/song.model"); // Import the Song Model

// POST: Add a new song
router.post("/", upload.single('audio'), async (req, res) => {
    try {
        const { title, artist } = req.body;
        const audio = req.file ? req.file.path : req.body.audio; // Use uploaded file path or fallback to req.body
        const newSong = new Song({ title, artist, audio });
        await newSong.save();
        res.status(201).json({ message: "Song saved successfully!", song: newSong });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Fetch all songs
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find({});
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Fetch single random song (simplified without mood)
router.get("/random", async (req, res) => {
    try {
        const songs = await Song.find({});
        if (songs.length === 0) return res.status(404).json({ error: "No songs found" });

        // Pick a random song from the array
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        res.status(200).json(randomSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
