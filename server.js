var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  routes = require('./app/routes'),
  config = require('./app/config'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser');;

var app = express();
var port = process.env.PORT || 8070;

app.disable('etag');

app.use(cookieParser());
app.use(bodyParser.urlencoded());

// Static
app.use('/node_modules', express.static('node_modules'));
app.use(express.static('static'));

app.get('/', routes.index);
app.get('/question', routes.getQuestion);
app.get('/info', routes.getInfo);
app.get('/result', routes.showResult);
app.get('/score', routes.getScore);
app.post('/submit', routes.submit);

var uri = 'mongodb://127.0.0.1:27017/sobe';
mongoose.connect(uri);

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('Connected to MongoDB database ' + uri);
});
