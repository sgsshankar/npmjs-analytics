var express = require('express');
var router = express.Router();
var util = require('util');
var Xray = require('x-ray');
var Promise = require('bluebird');
var trim = require('trim');

var x = Xray();
var base = 'https://www.npmjs.com';
var url;
var profile = {};
var packages = {};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Profile Analytics for npmjs.com'
	});
});

module.exports = router;


