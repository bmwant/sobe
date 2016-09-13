var express = require('express'),
  session = require('express-session'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  routes = require('./routes'),
  config = require('./config');


var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.use(session({secret: 'lwdllsmdu8*86z69h!f0g&@vujj!wjb%$*ckmxf1t&thv&8evu'}))
app.disable('etag');

app.get('/', routes.index);
app.get('/question', routes.getQuestion);

var uri = 'mongodb://10.0.0.10/sobe';
mongoose.connect(uri);

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('Connected to MongoDB database ' + uri);
});
