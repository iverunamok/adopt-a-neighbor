const Message = require('../models/messages')
const User = require('../models/users');
const mongoose = require('mongoose');
	
	function create (req, res){
		const message = new Message ({
			from: req.user.username,
			to: req.body.to,
			text: req.body.text
		})
		message.save(function(err, result){
			if (err){
				res.status(500)
				res.json(err)
			}
			else {
				res.send(result);
			}
		})
	}
	function receive (req, res){ //gets all messages from users
		const user2 = req.query.user2//user2 is the other person
		const user1 = req.user.username//this is the person logged-in
		const u2toU1 = {
			from: user2,//from them to us
			to: user1
		}
		const u1toU2 = {
			from: user1,//from us to them
			to: user2
		}

		Message.find({
			$or : [u1toU2, u2toU1]//find recieves between either of them
		})
			.sort({date: "descending"})//this sorts it by date
			.exec((err, messages) =>{
				console.log('updating', messages)
				Message.update({from: user2, to: user1}, {$set: {received: true}}, {multi: true}, function(err, update){ 
				// making sure the received messages are marked true upon getting to Messages page
					res.json(messages)
				}) 
				// tests for a match in the string (res.json)
				// console.log(res, res)
			})
			//ex: Kelsey logs in, you have messages from Mike, so Kelsey clicks on the screen from Mike,
			//it gets all the messages between you guys and sorts the by date, marks them as received(or seen),
			//so when it checks later to see if there are unread messages, it updates it.
	}
	// function messageFriend(req, res){
	// 	User.findOne({
	// 		username: req.params.username
	// 	}, 
	// 	function(err, result) {
	// 		console.log(err. result)
	// 		res.json(result.username)
	// 	})
	// }
	function sentMessages(req, res){ //finds messages to the username that are not recieved,
									 //sent to you not marked as recieved
		Message.find({
			to: req.user.username,
			received: false
		})
			.sort({date: "descending"})
			.exec((err, messages) => {console.log(messages, err); res.json(messages)})
}
module.exports = {
	create : create,
	receive: receive,
	// messageFriend: messageFriend,
	sentMessages: sentMessages
}