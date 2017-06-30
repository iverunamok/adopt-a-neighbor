
const request = require('superagent');
const User = require('../models/users');
const GeoJSON = require('geojson');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function receive (req, res){
	console.log(req.user);
	const zip_code = req.query.zip_code;
	console.log(zip_code);
	const distance = req.query.distance;
	const first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
	const last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM"
	const geoURL = first.concat(zip_code).concat(last);
	request
		.get(geoURL)
			.end(function(err, geoRes){
				console.log(geoRes)
				const location = JSON.parse(geoRes.text).results[0].geometry.location;
				User.find({
					location: {
						$near: {
							$geometry : {
								type: "Point",
								coordinates: [location.lng, location.lat]
							},
							$maxDistance : distance * 1609.34
						}
					}
				},
				function(err,result) {
					console.log(err, result)
					const newRes = result.filter(function(el) {
						return el.username !== req.user.username;
					})
					res.json(newRes)
				}
			)

		})
}
function findFriend(req, res) {
		User.findOne({
				username: req.params.username
		},
		function(err,result) {
				console.log(err,result)
				res.json(result)
		}
	)
}
module.exports={
	findFriend: findFriend,
	receive: receive
}