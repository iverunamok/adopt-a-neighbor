const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	"imgURL": String,
	"username": {type: String, required: true},
	"password": {type: String, required: true},
	"admin": {type: Boolean, default: false},
	"zip_code": Number,
	"yard_work": Boolean,
	"indoor_cleaning": Boolean,
	"filing_paperwork": Boolean,
	"heavy_lifting": Boolean,
	"transportation": Boolean,
	"visiting": Boolean,
	"errands": Boolean,
	"other": Boolean,
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