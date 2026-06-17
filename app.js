require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Database Connection
const connectDB = require("./config/dbConnection");
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/song.routes");
const playlistRoutes = require("./routes/playlist.routes");

app.use("/auth", authRoutes);
app.use("/songs", songRoutes);
app.use("/playlists", playlistRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Spotify Backend Running Successfully");
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});