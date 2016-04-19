var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  title:     String,
  lyrics:    String,
  artistIDs: [String],
  albumID: String,
  rank: Number,
  score: Number,
  rapDensity: Number,
  lyricsWithRhymes: [String],
  rhymesPerVerse: Number,
  vocabLevel: Number
});

module.exports = mongoose.model('Song', SongSchema);