import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Home extends Component {
<<<<<<< Updated upstream



		
	render(){
		return(<div>
				<div>
			        <ul>
			          Hello {this.props.username}
			        </ul>
			    </div>
				<div> 
					<h1>Find neighbors near you:</h1>
				</div>
				<form action="">
					<Link to="/Neighbors"><button className="button">Neighbors</button></Link>
					<div>Check your messages here:</div>
					<Link to="/Messages"><button className="button">Messages</button></Link>
				</form>
				</div>
			)
	}

}
=======
	constructor(props){
		super(props)
		this.state = {
			username: '',
		}
	}

findUser(){
	fetch('/status' + this.state.username + '/' + (this.state.username ? username:))
}

render() {
	const { user, username } = this.state
	return (
		<div className="Home">
			<div className="App-header")
}
//fetch goes to our backend, express goes to our database
//fetch request in findUser
//response.user
//use findone function to call in the username variable (and image)
//button for messages (messages.js), button for neighbors (neighbors.js)

//to test this in postman (the backend API), type the route URL,
//if finding errors, probably miss
//make a token request first through the api/authenticate
//use postman to request for a token, then you have a token
//localhost3001: backend
>>>>>>> Stashed changes
