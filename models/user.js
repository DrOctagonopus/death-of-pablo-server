var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username:     {type: String, required:true, unique:true},
  passwordHash: {type: String, required:true},
  favSongIds:   [String],
  favArtistIds: [String],
  //favAlbumIDs:  [String],
  aboutMe:      String,
  thumbnailUrl: String
});

module.exports = mongoose.model('User', UserSchema);