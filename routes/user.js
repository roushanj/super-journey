var express = require('express');
var router = express.Router();
var User = require('../models/user');

//Register route

router.get('/register', function(req, res, next) {

	res.render('register');
});

router.post('/register', function(req, res, next){
   
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;
   var password2 = req.body.password2;


   req.checkBody('username','username is required').notEmpty();
   req.checkBody('email','email is required').isEmail();
   req.checkBody('password','password is required').notEmpty();
   req.checkBody('password2','password2 is required').equals(req.body.password);

   var errors = req.validationErrors();

   if (errors) {
   	res.render('register', {errors:errors});

   } else{
   	  
   	  var newuser = new User({

   	  	  username: username,
   	  	  email: email,
   	  	  password: password
   	  });

   	  User.createUser(newuser, function (err, user) {
             
            if (err) throw err;
            console.log(user);
                     
   	  });

   	  req.flash('success_msg', 'your are Registered');
      res.redirect('/users/login');
   }
});

//login route

router.get('/login', function(req, res, next) {

	res.render('login');

});



module.exports = router;