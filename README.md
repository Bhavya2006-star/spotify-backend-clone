# Spotify Backend Clone

A complete Express.js backend API clone for Spotify functionality.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Song Management**: Create, read, update, and delete songs
- **Playlist Management**: Create playlists and manage songs
- **Duration Parsing**: Flexible duration input (`mm:ss`, `hh:mm:ss`, or seconds)
- **Formatted Responses**: API returns both numeric and formatted duration values

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` file with:
```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/spotifyDB
JWT_SECRET=your_secret_key
```

3. Start the server:
```bash
npm start
```

Or with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Songs
- `GET /songs` - Get all songs
- `GET /songs/all` - Get all songs (alias)
- `POST /songs/add` - Add a new song
- `POST /songs/create` - Add a new song (alias)
- `PUT /songs/update/:id` - Update a song
- `DELETE /songs/delete/:id` - Delete a song

### Playlists
- `GET /playlists` - Get all playlists
- `GET /playlists/all` - Get all playlists (alias)
- `POST /playlists/create` - Create a playlist

## Project Structure

```
├── app.js
├── package.json
├── .env
├── config/
│   └── dbConnection.js
├── controllers/
│   ├── auth.controller.js
│   ├── song.controller.js
│   └── playlist.controller.js
├── models/
│   ├── user.model.js
│   ├── song.model.js
│   └── playlist.model.js
├── routes/
│   ├── auth.routes.js
│   ├── song.routes.js
│   └── playlist.routes.js
└── middleware/
    └── auth.middleware.js
```

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt

---

**Repository**: [spotify-backend-clone](https://github.com/Bhavya2006-star/spotify-backend-clone)
