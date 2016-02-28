var express = require('express');
var router = express.Router();
var scraper =  require('.././lib/scraper');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Profile Analytics for npmjs.com'
	});
});

/* GET details */
router.get('/profile/:username', function(req, res, next) {
	var username = req.params.username;
	scraper.getDetails(username).then(function(result) {
		res.send(result);
	})
});

module.exports = router;
