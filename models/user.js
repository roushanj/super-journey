var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

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

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser, callback) {
	
	bcryptjs.hash(newUser.password, null, function(err, hash) {
    newUser.password = hash;
    newUser.save(callback);
});
}

module.exports.getuserbyUsername=function(user, callback) {
	var query = {username:username};
	User.findOne(query, callback);
};
module.exports.comparePassword=function(candidatePassword, hash, callback) {
	 bcryptjs.compare(candidatePassword,hash,function (err, callback) {

	 	if (err) {throw err};
	 	callback(null , isMatch);
	 })
};  


module.exports.getuseryId=function(id, callback) {


	User.findById(id, callback);
	

};
