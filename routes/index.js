var express = require('express');
var router = express.Router();
var scraper = require('.././lib/scraper');


/* GET home page */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Profile analytics for npmjs.com',
	});
});

/* test page. */
router.get('/test', function(req, res, next) {
	res.render('index', {
		title: 'Profile of sgsshankar',
		profile_url: 'https://www.npmjs.com/~sgsshankar',
		profile_name: 'sgsshankar',
		profile_pic: 'https://s.gravatar.com/avatar/33734124f18c6434c29235bc0c64ba28?size=496&default=retro'
	});
});

/* GET details */
router.get('/profile', function(req, res, next) {
	var username = req.query.profile;
	scraper.getDetails(username).then(function(result) {
		res.send(result);
	})
});

module.exports = router;