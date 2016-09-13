var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    invite: String,
    code: String,
    current_question: { type: Number, default: 1 },
    score: { type: Number, default: 0 },
    valid: { type: Boolean, default: true }
});

module.exports = Session = mongoose.model('Session', schema);