const express = require("express");
const router = express.Router();

const {
  createSong,
  getSongs,
  updateSong,
  deleteSong
} = require("../controllers/song.controller");

router.post("/create", createSong);
router.get("/all", getSongs);
router.put("/update/:id", updateSong);
router.delete("/delete/:id", deleteSong);

module.exports = router;