import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Splash extends Component {
	state = {
		key: 'value'
	}
	//this is the front page, if they are a new user, send them to HelperChooser.js, if they are a returning
  //user, send them to login.js page
	render(){
		return( 
  <div>
    <div className="text-center jumbotron">
      <h1>Adopt-A-Neighbor</h1>
      <p></p>
    </div>
    <div className="row">
      <div className="col-md-6 panel panel-primary panel-default">
        <div className="panel-heading">
          <h3 className="panel-title"></h3>
        </div>
        <div className="panel-body">
          We believe our local communities can work together to create a united neighborhood that supports and offers hands-on assistance to elders. Joining your community will allow you to send requests for support, or to participate as a helpful neighbor. You will be linked with people in <b>Your</b> neighborhood. Please join the Adopt-A-Neighbor community as a <i>helper</i> or <i>receiver</i> by clicking on New Neighbor.
        </div>
        <div className="panel-footer">
            <Link to="/HelperChooser"><button type="button" className="btn btn-primary">JOIN NOW</button></Link>
        </div>
      </div>
  </div>
      <div className="col-md-6 panel panel-primary panel-default">
        <div className="panel-heading">
          <h3 className="panel-title"></h3>
        </div>
        <div className="panel-body">
          Welcome Back! Your willingness to help your neighbors is honorable.You are making a difference in your community and impacting the lives of others. Thank You.
        </div>
      <div className="panel-footer">
            <Link to="/Login"><button type="button" className="btn btn-primary">RETURNING USER</button></Link>
      </div>
    </div>
  </div>
	)}
}
