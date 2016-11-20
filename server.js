var express = require('express'),
  session = require('express-session'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  routes = require('./app/routes'),
  config = require('./app/config'),
  path = require('path'),
  cookieParser = require('cookie-parser');


var app = express();
var port = process.env.PORT || 8070;

// app.engine('handlebars', exphbs({defaultLayout: 'index'}));
// app.set('view engine', 'handlebars');
app.use(session({secret: 'lwdllsmdu8*86z69h!f0g&@vujj!wjb%$*ckmxf1t&thv&8evu'}));
app.disable('etag');

app.use(cookieParser());
// Static
app.use('/node_modules', express.static('node_modules'));
app.use(express.static('static'));

app.get('/', routes.index);
app.get('/question', routes.getQuestion);
app.get('/info', routes.getInfo);

var uri = 'mongodb://192.168.99.100:27017/sobe';
mongoose.connect(uri);

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('Connected to MongoDB database ' + uri);
});
