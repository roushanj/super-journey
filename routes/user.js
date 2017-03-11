var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	res.render('user.html');
});

router.post('/', function(req, res, next) {

	res.send("congrats");
});
module.exports = router;