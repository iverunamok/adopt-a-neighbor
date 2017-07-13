import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Home extends Component {	
  
  
	render(){
		  return(<div>
				<div className="appheader">
					<div className="rightfont">
			        	<h2>
			          	Welcome back {this.props.username}!
                  {this.props.profilePic ? <img style={{height: 150, width:150}}src={'/profilePictures/' + this.props.profilePic} /> : ''}
			        	</h2>
			    </div>
			    <div className="rightfont">
			    	<div className="row">
						<div className="col-md-12"> 
							<h2 className="text-primary text-center">Find neighbors near you:</h2>
						</div>
						<div className="col-md-12">
							<Link to="/Neighbors"><button className="btn btn-block" type="button">Neighbors</button></Link>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<h2 className="text-primary text-center">Check your messages here:</h2>
						</div>
						<div className="col-md-12">
							<Link to="/Messages"><button className="btn btn-block" type="button">Messages</button></Link>
						</div>
					</div>
					</div>
				</div>
				</div>
			)
	}

}
