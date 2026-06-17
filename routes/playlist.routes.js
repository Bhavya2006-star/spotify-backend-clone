const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  getPlaylists
} = require("../controllers/playlist.controller");

router.post("/create", createPlaylist);
router.get("/all", getPlaylists);

module.exports = router;