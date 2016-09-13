var mongoose = require('mongoose'),
  session = require('express-session'),
  uuid = require('node-uuid'),
  Question = require('./Question'),
  Session = require('./Session'),
  Info = require('./Info');


function checkSessionCode(code) {
  var query = Session.findOne({code: code});
  query.then(function(result) {
    console.log(result);
  })
}

function createSession(invite) {
  var code = uuid.v4();
  session.code = code;
  var query = Session.findOne({invite: invite});
  query.then(function(doc) {
    if(doc === null || !doc.valid) {
      return false;
    }

    doc.code = code;
    doc.save();
    return code;
  });
}

module.exports = {
  index: function(req, res) {

    var invite = req.query.invite;
    if(invite === undefined) {
      res.sendStatus(403);
      return;
    }
    createSession(invite);

    var data = Question.find(function(err, results) {
      console.log(results);
    });

    res.render('index');
  },
  getQuestion: function(req, res) {
    checkSessionCode(session.code);
    console.log('You are trying to get question %s for invite %s', 1, session.invite);
    res.json({a: 15});
  },
  getInfo: function(req, res) {

  }
}