var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : Number,
    text_ua: String,
    text_eng: String,
    answer: Boolean
});

module.exports = Question = mongoose.model('Question', schema);