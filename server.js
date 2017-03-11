var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var main = require('./routes/main');
var memories = require('./routes/memories');
var user = require('./routes/user');
var app = express();
var port = 3000;


app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, ('client'))));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: false}));

app.use('/', main);
app.use('/user', user);
app.use('/user', memories);



app.listen(port, function() {

	console.log('server is listening');
});