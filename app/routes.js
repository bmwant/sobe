var mongoose = require('mongoose'),
  session = require('express-session'),
  uuid = require('node-uuid'),
  Question = require('./Question'),
  Session = require('./Session'),
  Info = require('./Info');


function checkSessionCode(code) {
  console.log('Checking session', code);
  var query = Session.findOne({code: code});
  return query.then(function(doc) {
    if(doc === null || !doc.valid) {
      return false;
    }
    return true;
  });
}

function createSession(invite) {
  var code = uuid.v4();
  session.code = code;
  var query = Session.findOne({invite: invite});
  return query.then(function(doc) {
    if(doc === null || !doc.valid) {
      return false;
    }

    doc.code = code;
    doc.save();
    return code;
  });
}

function getCurrentInfo(code) {
  var query = Session.findOne({code: code});
  // doc always should be not null because we have checkSessionCode invocation
  return query.then(function(doc) {
    var queryInfo = Info.findOne({id: doc.currentQuestion});
    return queryInfo.then(function(info) {
      return info;
    });
  });
}

function getCurrentQuestion(code) {
  var query = Session.findOne({code: code});
  return query.then(function(currentSession) {
    var queryQuestion = Question.findOne({id: currentSession.currentQuestion});
    return queryQuestion.then(function(question) {
      return question;
    });
  });
}

module.exports = {
  index: function(req, res) {

    var invite = req.query.invite;
    if(invite === undefined) {
      res.sendStatus(403);
      return;
    }
    createSession(invite).then(function(newSession) {
      if(!newSession) {
        res.status(400).send('Invalid invite code!');
      } else {
        console.log('Created session', newSession);
        res.render('index');
      }
    });
    
  },
  getQuestion: function(req, res) {
    checkSessionCode(session.code).then(function(valid) {
      if(!valid) {
        res.sendStatus(403);
      } else {
        getCurrentQuestion(session.code).then(function(question) {
          res.json({
            'textUa': question.textUa,
            'textEng': question.textEng
          });
        }); 
      }
    });
  },
  getInfo: function(req, res) {
    checkSessionCode(session.code).then(function(valid) {
      if(!valid) {
        res.sendStatus(403);
      } else {
        getCurrentInfo(session.code).then(function(info) {
          res.json({
            'textUa': info.textUa,
            'textEng': info.textEng,
            'photo': info.photo 
          });
        });      
      }
    });
  }
}