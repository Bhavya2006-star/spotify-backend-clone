const updatePlaylist = async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json(error);
  }
};