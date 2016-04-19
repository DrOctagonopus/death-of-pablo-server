var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username:     String,
  passwordHash: [String],
  favSongIDs:   [String],
  favArtistIDs: [String],
  favAlbumIDs: [String],
  aboutMe: String
});

module.exports = mongoose.model('User', UserSchema);