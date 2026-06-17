const Song = require("../models/song.model");

// Create Song
const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Songs
const getSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};

// Update Song
const updateSong = async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSong);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Song
const deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);

    res.json({
      message: "Song Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createSong,
  getSongs,
  updateSong,
  deleteSong
};