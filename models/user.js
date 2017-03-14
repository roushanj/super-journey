var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


//user schema

var userSchema = mongoose.Schema({

	username: {
           
           type: String,
           index:true
 	},

	password: {
          type: String
	},

	email: {
          type: String
	}
});