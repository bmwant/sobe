var mongoose = require('mongoose'),
  uuid = require('node-uuid'),
  Question = require('./Question'),
  Session = require('./Session'),
  Info = require('./Info'),
  config = require('./config'),
  path = require('path');


function checkSessionCode(code) {
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
  var query = Session.findOne({invite: invite});
  return query.then(function(doc) {
    if(doc === null || !doc.valid) {
      return false;
    }
    if(doc.code !== undefined) {
      console.log('Returning visitor on state', doc.currentQuestion);
      return doc.code;
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

function updateStep(code, answer) {
  var query = Session.findOne({code: code});
  return query.then(function(currentSession) {
    console.info('1');
    var queryQuestion = Question.findOne({id: currentSession.currentQuestion});
    return queryQuestion.then(function(question) {
      if (question === null) {
        return true;
      }
      if (answer === question.answer) {
        currentSession.score += 1;
      }
      var finished = true;
      if (currentSession.currentQuestion < config.totalQuestions) {
        currentSession.currentQuestion += 1;
        finished = false;
      }
      console.log('this->UPdate is ', finished);
      currentSession.save();
      console.log('UPdate is ', finished);
      return finished;
    });
  });
}

module.exports = {
  index: function(req, res) {
    var invite = req.query.invite;
    if(invite === undefined) {
      res.status(403).send('You should have invite code to access this site!');
      return;
    }
    createSession(invite).then(function(newSession) {
      if(!newSession) {
        res.status(400).send('Invalid or already expired invite code. \
          You cannot play the game multiple times!');
      } else {
        console.log('Loaded session', newSession);
        res.cookie('sid', newSession);
        res.sendFile(path.join(__dirname + '/../views/page.html'));
      }
    });
  },
  showResult: function(req, res) {
    var code = req.cookies.sid;
    checkSessionCode(code).then(function(valid) {
      if(!valid) {
        res.status(403).send('You are not able to access this page again');
      } else {
        var query = Session.findOne({code: code});
        return query.then(function(currentSession) {
          currentSession.valid = false;
          currentSession.save();
          res.sendFile(path.join(__dirname + '/../views/result.html'));
        });
      }
    });
  },
  getQuestion: function(req, res) {
    var code = req.cookies.sid;
    checkSessionCode(code).then(function(valid) {
      if(!valid) {
        res.sendStatus(403);
      } else {
        getCurrentQuestion(code).then(function(question) {
          res.json({
            'textUa': question.textUa,
            'textEng': question.textEng
          });
        });
      }
    });
  },
  getInfo: function(req, res) {
    var code = req.cookies.sid;
    checkSessionCode(code).then(function(valid) {
      if(!valid) {
        res.sendStatus(403);
      } else {
        getCurrentInfo(code).then(function(info) {
          console.log(info);
          res.json({
            'textUa': info.textUa,
            'textEng': info.textEng,
            'photo': info.photo
          });
        });
      }
    });
  },
  submit: function(req, res) {
    var answer = req.body.answer === '1';
    console.log('Answer is', answer);
    var code = req.cookies.sid;
    checkSessionCode(req.cookies.sid).then(function(valid) {
      if(!valid) {
        res.sendStatus(403);
      } else {
        updateStep(code, answer).then(function(finished) {
          res.json({'finished': finished});
        });
      }
    });
  }
}
