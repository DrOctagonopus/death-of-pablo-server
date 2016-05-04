var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  name:        String,
  songIds:     [String],
  description: String
});

module.exports = mongoose.model('Artist', ArtistSchema);