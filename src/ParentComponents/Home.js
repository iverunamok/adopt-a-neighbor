import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: ''
		}
	}

getUserName(){
		fetch('/user?token=' + this.props.token), {
  				method: 'GET',
  			 	headers: {
    				'Content-Type': 'application/json'
  			 	},
  				body: JSON.stringify({
  					username: this.state
			})

		}
	}



		
	render(){
		return(<div>
				<div> 
					<h1>Find neighbors near you:</h1>
				</div>
				<form action="">
					<Link to="/Neighbors"><button className="button" onClick={this.getUserName.bind(this)}>Neighbors</button></Link>
					<div>Check your messages here:</div>
					<Link to="/Messages"><button className="button" onClick={this.getUserName.bind(this)}>Messages</button></Link>
				</form>
				</div>
			)
	}

}