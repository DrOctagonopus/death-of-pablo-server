var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username:     String,
  passwordHash: [String],
  favSongIDs:   [String],
  favArtistIDs: [String],
});

module.exports = mongoose.model('User', UserSchema);