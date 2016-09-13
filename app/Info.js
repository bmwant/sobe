var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : Number,
    text_ua: String,
    text_eng: String,
    photo: String
});

module.exports = Info = mongoose.model('Info', schema);