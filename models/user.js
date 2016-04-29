var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username:     String,
  passwordHash: [String],
  favSongIds:   [String],
  favArtistIds: [String],
  //favAlbumIDs:  [String],
  aboutMe:      String
  thumbnailUrl: String
});

module.exports = mongoose.model('User', UserSchema);