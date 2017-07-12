const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = Schema({
	"from": String,
	"to": String,
	"text": [String],
	"received": {type: Boolean, default: false},
	"date": {type: Date, default: new Date()}
})
module.exports = mongoose.model('Message', MessageSchema);