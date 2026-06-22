const Song = require("../models/song.model");

const parseDuration = (value) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return value;

  const normalized = value.trim();
  if (/^\d+$/.test(normalized)) return Number(normalized);

  const parts = normalized.split(":").map((part) => part.trim());
  if (parts.length === 2) {
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);
    if (!Number.isNaN(minutes) && !Number.isNaN(seconds) && seconds >= 0 && seconds < 60) {
      return minutes * 60 + seconds;
    }
  }

  if (parts.length === 3) {
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    const seconds = Number(parts[2]);
    if (
      !Number.isNaN(hours) &&
      !Number.isNaN(minutes) &&
      !Number.isNaN(seconds) &&
      minutes >= 0 &&
      minutes < 60 &&
      seconds >= 0 &&
      seconds < 60
    ) {
      return hours * 3600 + minutes * 60 + seconds;
    }
  }

  return Number(normalized);
};

const formatDuration = (seconds) => {
  if (typeof seconds !== "number" || Number.isNaN(seconds) || seconds < 0) {
    return null;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const padded = (value) => String(value).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${padded(minutes)}:${padded(secs)}`;
  }

  return `${minutes}:${padded(secs)}`;
};

const normalizeSongResponse = (song) => {
  const raw = song.toObject ? song.toObject() : song;
  const formattedDuration = formatDuration(raw.duration);
  return {
    ...raw,
    formattedDuration
  };
};

// Create Song
const createSong = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      duration: parseDuration(req.body.duration)
    };

    if (req.body.duration != null && Number.isNaN(payload.duration)) {
      return res.status(400).json({ message: "Invalid duration format" });
    }

    const song = await Song.create(payload);
    res.status(201).json(normalizeSongResponse(song));
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Songs
const getSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs.map(normalizeSongResponse));
};

// Update Song
const updateSong = async (req, res) => {
  try {
    const updatePayload = { ...req.body };
    if (req.body.duration != null) {
      updatePayload.duration = parseDuration(req.body.duration);
      if (Number.isNaN(updatePayload.duration)) {
        return res.status(400).json({ message: "Invalid duration format" });
      }
    }

    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json(normalizeSongResponse(updatedSong));
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