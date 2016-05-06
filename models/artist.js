var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  name:        {type: String, unique:true},
  songIds:     [String],
  description: String,
  url:         String
});

module.exports = mongoose.model('Artist', ArtistSchema);