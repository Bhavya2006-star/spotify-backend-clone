const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "spotify-backend-clone", ".env") });

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Database Connection
const connectDB = require("./spotify-backend-clone/config/dbConnection");
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require("./spotify-backend-clone/routes/auth.routes");
const songRoutes = require("./spotify-backend-clone/routes/song.routes");
const playlistRoutes = require("./spotify-backend-clone/routes/playlist.routes");

app.use("/auth", authRoutes);
app.use("/songs", songRoutes);
app.use("/playlists", playlistRoutes);

app.get("/", (req, res) => {
  res.send("Spotify Backend Running Successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
