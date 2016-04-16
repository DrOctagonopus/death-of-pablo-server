var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  title:     String,
  lyrics:    String,
  artistIDs: [String]
  //album:
  //releaseDate:
});

module.exports = mongoose.model('Song', SongSchema);