var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy= require('passport-local'),strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/super');
var db = mongoose.connection;

var main = require('./routes/main');
var user = require('./routes/user');
var app = express();
var port = 3000;

//default layouts DIR

app.set('views',path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout : 'layouts'}));
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, ('public'))));

//Middleware 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: false}));
app.use(cookieParser());

// Express session Middleware

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

// Express Validator

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(function(req, res, next){
    
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     next();

});

app.use('/', main);
app.use('/users', user);



app.listen(port, function() {

	console.log('server is listening');
});