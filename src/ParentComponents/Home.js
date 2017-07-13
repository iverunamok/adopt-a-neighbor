import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Home extends Component {




	render(){
		return(
			<div>
				<div>
			        <ul>
			          Hello {this.props.username}
								{this.props.profilePic ? <img style={{height: 150, width:150}}src={'/profilePictures/' + this.props.profilePic} /> : ''}

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
