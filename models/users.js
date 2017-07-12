const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {HELP_FIELDS, variable} = require('../src/config')


const schema = {
	"username": {type: String, required: true},
	"password": {type: String, required: true},
	"admin": {type: Boolean, default: false},
	"date": {type: Date, default: new Date()},
	"address": String,
	"helper": Boolean,
	"lng": Number,
	"lat": Number,
	"profilePic": String,
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [Number]
	}
}

HELP_FIELDS.map(variable)
	       .forEach(variable => schema[variable] = {type: Boolean, default: false})


const UserSchema = new Schema(schema)
UserSchema.index({location: '2dsphere'});

module.exports = mongoose.model('User', UserSchema);
