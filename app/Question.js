var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : Number,
    textUa: String,
    textEng: String,
    answer: Boolean
});

module.exports = Question = mongoose.model('Question', schema);