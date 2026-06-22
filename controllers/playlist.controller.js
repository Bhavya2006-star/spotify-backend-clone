const Playlist = require("../models/playlist.model");

const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPlaylist,
  getPlaylists
};