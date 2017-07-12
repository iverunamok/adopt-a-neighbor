//the index.js is the brain of the backend,
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
const config = require('../src/config');
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/adoptaneighbor');
app.set('superSecret', config.secret);
app.use(express.static('public'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var suffix = {
  'image/jpeg' : 'jpg',
  'image/png' : 'png'
}
if(config.env === 'prod'){
  app.use(express.static('build'))
}
app.use(express.static('public'))

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    console.log('directory ',path.join(__dirname, '../public/profilePictures/'))
    cb(null,path.join(__dirname, '../public/profilePictures'))
  },
  filename: function (req, file, cb){
    console.log('naming file',  file.fieldname + Date.now() +'.'+ suffix[file.mimetype])
    cb(null, file.fieldname + Date.now() +'.'+ suffix[file.mimetype] )
  }
})

const upload = multer({storage: storage}).single("profilePicture")


app.use(express.static(path.join(__dirname, '..', 'public')))

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
				req.decoded = decoded;//where you get currently logged in user
				req.user = decoded._doc //as long as we're loggin in we can refer to the user info by req.user
				next();
			}
		});
	} else {
	//if there is no token
	//return an error-
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
}
app.post('/api/authenticate', userController.authenticate)
app.post('/user', upload, userController.create)
app.get('/test')
app.put('/user', userController.update)
app.post('/messages', requireLogin, messagesController.create)
app.get('/messages', requireLogin, messagesController.receive)
app.get('/profile', requireLogin, (req,res) => res.json(req.user))
app.get('/user', requireLogin, searchesController.receive)
app.get('/findFriend/:username', searchesController.findFriend)
app.get('/fieldMatch', requireLogin, searchesController.fieldMatch)
app.get('/sentMessages', requireLogin, messagesController.sentMessages)

app.listen(port)
