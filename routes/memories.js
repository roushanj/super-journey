var express = require('express');
var router = express.Router();

router.get('/memories', function(req, res, next) {

	res.render('user.html');
});

module.exports = router;