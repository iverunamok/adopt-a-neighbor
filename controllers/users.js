const User = require('../models/users');
const request = require('superagent');
const config = require('../config');
const jwt = require('jsonwebtoken');


function create (req, res){
	console.log('body', req.body);
	const addy = req.body.address;
	const addyPlus = addy.replace(/ /g, "+");
	const first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
	const last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM";
	const geoURL = first.concat(addyPlus).concat(last);
	request
		.get(geoURL)
		.end(function(err, geoRes){
			const location = JSON.parse(geoRes.text).results[0].geometry.location;
			const user = new User ({
				//imgURL: (req.file ? req.file.path.split('public')[1] : ""),
				
				username: req.body.username,
				password: req.body.password,
				address: req.body.address,
				//helper: req.body.helper,
				lat: location.lat,
				lng: location.lng,
				location: {
					coordinates: [location.lng, location.lat]
				}
			})
			user.save(function(err, result){
				if (err) {
					res.status(500);
					res.json(err);

				} else {
					const token = jwt.sign(user, config.secret);
					res.send({token: token, result});
				}
			})	
	})
}

const update = (req, res) => {
	User.findOneAndUpdate({username: req.body.username}, req.body, (err, result) =>{
		if (err){
			res.status(500).json(err)
		} else {
			res.json(result)
		}
	})
}

function authenticate(req, res) {
	console.log('authenticating', req.body)
	User.findOne({
		username: req.body.username
	}, function(err, user) {
		console.log('found user',user)
			if (err) throw err;
			if(!user) {
				console.log('Wrong username')
				res.json({success: false, message: 'Oops, you may have entered the wrong username, please go back and try again.'});
			} else if (user) {
				if(user.password != req.body.password) {
					console.log('wrong password')
					res.json({ success: false, message: 'Wrong password, please try again.'});
				} else {
					const token = jwt.sign(user, config.secret, {expiresIn: 60 * 60 * 24 * 30});
					console.log('Login successful')
					res.json({
						success: true,
						message: 'Enjoy your hella trill token!',
						token: token,
						username: req.body.username,
						address: user.address
						});	
					}
				}
		}
	)
};

module.exports = {
	update: update,
	create: create,
	authenticate: authenticate
}

