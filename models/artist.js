var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  name:    String,
  songIDs: [String],
  //dateOfBirth: Date
});

module.exports = mongoose.model('Artist', ArtistSchema);