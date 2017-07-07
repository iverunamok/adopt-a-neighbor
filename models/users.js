const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	"imgURL": String,
	"username": {type: String, required: true},
	"password": {type: String, required: true},
	"admin": {type: Boolean, default: false},
	"address": String,
	"helper": Boolean,
	"yard_work": {type: Boolean, default: false},
	"indoor_cleaning": {type: Boolean, default: false},
	"filing_paperwork": {type: Boolean, default: false},
	"heavy_lifting": {type: Boolean, default: false},
	"transportation": {type: Boolean, default: false},
	"visiting": {type: Boolean, default: false},
	"errands": {type: Boolean, default: false},
	"technology_help": {type: Boolean, default: false},
	"other": {type: Boolean, default: false},
	"lng": Number,
	"lat": Number,
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [Number]
	}
})
UserSchema.index({location: '2dsphere'});

module.exports = mongoose.model('User', UserSchema);