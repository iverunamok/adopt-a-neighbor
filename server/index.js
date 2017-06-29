//the index.js is the brain, 
//has all the routes in it
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const userController = require('../controllers/users');
const messagesController = require('../controllers/messages');
const searchesController = require('../controllers/search');
const jwt = require('jsonwebtoken');
const config = require('../config');


const port = process.env.PORT || 3005;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/adoptaneighbor');
app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan)('dev'));

//const upload = multer({storage: storage}).single("profilePicture")



function requireLogin(req, res, next) {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if(token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if(err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
			//if everything is good, save to request for use in other routes
				req.decoded = decoded;
				req.user = decoded._doc //as long as we're loggin in we can refer to the user info by req.user
				next();
			}
		});
	} else {
	//if there is no token
	//return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
}
app.post('/api/authenticate', userController.authenticate)
app.post('/user', userController.create)
app.put('/user', userController.update)
app.post('/messages', requireLogin, messagesController.create)
app.get('/messages', requireLogin, messagesController.receive)
app.get('/profile', requireLogin, (req,res) => res.json(req.user))
app.get('/user', requireLogin, searchesController.receive)
app.get('/findFriend/:username', searchesController.findFriend)
app.get('/sentMessages', requireLogin, messagesController.sentMessages)

app.listen(port)
