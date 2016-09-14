var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : Number,
    textUa: String,
    textEng: String,
    photo: String
});

module.exports = Info = mongoose.model('Info', schema);