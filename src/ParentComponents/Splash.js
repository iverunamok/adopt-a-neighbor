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
          We believe our communities can each help one another to create a united neighborhood that supports and offers hands-on assistance to elders. Joining your community will allow you to send requests for help. You will be linked with a neighbor who is available to help out. Please join the Adopt-A-Neighbor community by clicking on New Neighbor. If you have been here before, click on Returning Neighbor to login.
        </div>
        <div className="panel-footer">
            <Link to="/Login"><button type="button" className="btn btn-primary">JOIN NOW</button></Link>
        </div>
    </div>
  </div>
      <div className="col-md-6 panel panel-primary panel-default">
      <div className="panel-heading">
        <h3 className="panel-title"></h3>
      </div>
      <div className="panel-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div className="panel-footer">
        <button type="button" className="btn btn-primary">NEW</button>
      </div>
    </div>
    </div>
	)}
}
