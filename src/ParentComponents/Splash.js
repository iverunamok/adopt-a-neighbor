import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../App.css'


export default class Splash extends Component {
	state = {
		key: 'value'
	}
  //console.log("pathname ",this.props.location.pathname)
	//this is the front page, if they are a new user, send them to HelperChooser.js, if they are a returning
  //user, send them to login.js page
	render(){
		return( 
      <div className="fluid-container"> 
        <div className="appheader">
          <div className="rightfont">
            <h1>Adopt-A-Neighbor</h1>
          </div>
        </div>
        <div>
          <img src="https://s10.postimg.org/4i6dt803t/20170709_140852.jpg" id="myleshelping" className="img-center" className="img-responsive" alt="Helpful Neighbor"></img>
        </div>
          <div className="rightfont">
          <div className="blurb">
              <h3 className="text-primary text-center">We believe our local communities can work together to create a united neighborhood that supports and offers hands-on assistance to elders. Joining your community will allow you to send requests for support, or to participate as a helpful neighbor. You will be linked with people in <b>Your</b> neighborhood. Please join the Adopt-A-Neighbor community as a <i>helper</i> or <i>receiver</i> by clicking on New Neighbor.</h3>
          </div>
          </div>
        <div className="row">
            <Link to="/SignUpWizard2"><button className="button btn-primary btn-lg outline btn-block" type="button">JOIN NOW</button></Link>
            <Link to="/Login"><button className="button btn-block" type="button">RETURNING USER</button></Link>
        </div>
      </div>
	)}
}
