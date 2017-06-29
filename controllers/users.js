const User = require('../models/users');
const request = require('superagent');
//const config = require('../config');
const jwt = require('jsonwebtoken');


function create (req, res){
	console.log('body', req.body);
	const zip = req.body.zip_code;
	const first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
	const last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM";
	const geoURL = first.concat(zip).concat(last);
	request
		.get(geoURL)
		.end(function(err, geoRes){
			const location = JSON.parse(geoRes.text).results[0].geometry.location;
			const user = new User ({
				//imgURL: (req.file ? req.file.path.split('public')[1] : ""),
				//help_neighbor: req.body.help_neighbor,
				username: req.body.username,
				password: req.body.password,
				zip_code: req.body.zip_code,
				//yard_work: req.body.yard_work,
				//indoor_cleaning: req.body.indoor_cleaning,
				//filing_paperwork: req.body.filing_paperwork,
				//heavy_lifting: req.body.heavy_lifting,
				//transportation: req.body.transportation,
				//visiting: req.body.visiting,
				//errands: req.body.errands,
				//other: req.body.other,
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
					res.json(result)
					//const token = jwt.sign(user, config.secret);
					//res.send({token: token, result});
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
	User.findOne({
		username: req.body.username
	}
		function(err, user) {
			if (err) throw err;
			if(!user) {
				res.json{success: false, message: 'Oops, you may have entered the wrong username, please go back and try again.'});
			}else if (user) {

				if(user.password != req.body.password) {
					res.json({ success: false, message: 'Wrong password, please try again.'});
				}else {

				const token = jwt.sign(user, config.secret, {expiresIn: 60 * 60 * 24 * 30});

				res.json({
					success: true,
					message: 'Enjoy your hella trill token!',
					token: token,
					username: req.body.username,
					address: user.address
					});	
				}

			}
		})
};

module.exports = {
	update: update,
	create: create,
	authenticate: authenticate
}

