var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  title:     String,
  lyrics:    String,
  artistIds: [String],
  rank:       Number,
  score:      Number,
  rapDensity: Number,
  rhymesPerVerse: [Number],
  vocabLevel: Number,
  rhymeDistribution: Number,
});

module.exports = mongoose.model('Song', SongSchema);