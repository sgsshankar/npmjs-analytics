var util = require('util');
var Xray = require('x-ray');
var Promise = require('bluebird');
var trim = require('trim');

var x = Xray();
var base = 'https://www.npmjs.com';
var url;
var profile = {};
var packages = {};

module.exports = {

	 getDetails: function(username) {
		var pdetails = {}
		pdetails.packages = []
		return new Promise(function(resolve, reject) {
			getProfileDetails(username).then(function(profile) {
				pdetails.author = profile.author;
				pdetails.authorImg = profile.authorImg;
				pdetails.fullName = profile.fullName;
				pdetails.links = profile.links;
				pdetails.links.email = new Buffer((profile.links.email).replace(new RegExp("%", 'g'), ''), 'hex').toString("ascii");
				packages = profile.content.packages;
				pdetails.totalPackages = packages.length;
				for (var i in packages) {
					(function(i) {
						pkage = trim(packages[i]).split('\n')[0];
						getPackageDetails(pkage).then(function(pkagedetails) {
							var plished = trim(pkagedetails.published).split('\n')[4];
							var pd = {
								packageName: pkagedetails.packageName,
								published: trim(plished),
								stats: pkagedetails.stats,
								collaborators: pkagedetails.collaborators
							}
							pdetails.packages.push(pd);
							if (i == (pdetails.totalPackages - 1)) {
								resolve(pdetails)
							}
						})
					})(i)
				}
			})
		})
	}

}


function getProfileDetails(username) {
	return new Promise(function(resolve, reject) {
		url = base + '/~' + username;
		x(url, {
			author: '.content-column h1',
			authorImg: '.sidebar .avatar img@src',
			fullName: '.sidebar .fullname',
			links: x('.sidebar .profile-sidebar-links', {
				email: '.email a@data-email',
				homepage: '.homepage a@href',
				github: '.github a@href',
				twitter: '.twitter a@href',
				freenode: '.freenode a@href'
			}),
			content: x('.content-column', {
				totalPackages: '#packages',
				packages: x('.collaborated-packages', ['li'])
			})
		})(function(err, obj) {
			if (err) {
				reject(err)
			} else {
				profile = obj
				resolve(profile)
			}
		})
	});
}

function getPackageDetails(packagename) {
	return new Promise(function(resolve, reject) {
		url = base + '/package/' + packagename;
		x(url, '.sidebar', {
			published: '.last-publisher',
			stats: {
				daily: '.daily-downloads',
				weekly: '.weekly-downloads',
				monthly: '.monthly-downloads'
			},
			collaborators: x('.collaborators li', [{
				author: 'a img@alt',
			}])
		})(function(err, obj) {
			if (err) {
				reject(err)
			} else {
				packages = obj;
				packages.packageName = packagename
				resolve(packages)
			}
		})
	});
}