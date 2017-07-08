
const request = require('superagent');
const User = require('../models/users');
const GeoJSON = require('geojson');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {HELP_FIELDS, variable} = require('../src/config')

function receive (req, res){
	console.log(req.user);
	const addy = req.query.address;
	const addyPlus = addy.replace(/ /g, "+");
	console.log(address);
	const distance = 15; //changed this from req.query.distance;
	const first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
	const last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM"
	const geoURL = first.concat(addyPlus).concat(last);
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

function fieldMatch(req, res) {
	console.log("hellloooooo", req.user)//check out more of what this is returning,
					//figure out how to call "myself" and then match the other users


	User.findOne({
			username: req.user.username
		} ,(err, user) => {
			if (err) {
				throw err;
			}
			const helpFields = HELP_FIELDS.map(variable)
									 .filter((variable) => user[variable])
									 .map(variable => {
									 	const obj = {}
									 	obj[variable] = true;
									 	return obj
									 })
			User.find({
					helper: !user.helper,
					$or : helpFields
				}, {password: false}, (err, users) => {
				res.json(users)
			})

		})
}
module.exports={
	findFriend: findFriend,
	receive: receive,
	fieldMatch: fieldMatch
}
