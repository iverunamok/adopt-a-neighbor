import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class HelperChooser extends Component {


	clickButton = (helper) => () => {//closure variable
		fetch('/user', {
  			   method: 'PUT',
  			   headers: {
                  'Content-Type': 'application/json'
  				},
  				body: JSON.stringify({
    				username: this.props.username,
    				helper: helper,
  				})
  			})

	}

	render(){
		console.log('Here are the props', this.props)
		if (!this.props.token && this.props.cookieLoaded){
			console.log('No token :(')
			this.props.history.push('/Login')
		}
		return(<div className="fluid-container">
					<div className="rightfont">
						<div className="appheader">
								<div className= "col-md-12">
									<h2 className="text-primary text-center">Join the Community</h2>
								</div>
						</div>
					<h2 className="text-primary text-center">Are you a here to help neighbors?</h2>
						<Link to="/SignUpWizardHelper"><button className="btn btn-block" onClick={this.clickButton(true)}>Helper</button></Link>
					<h2 className="text-primary text-center">Are you here to receive support from neighbors?</h2>
						<Link to="/SignUpWizardReceiver"><button className="btn btn-block" onClick={this.clickButton(false)}>Receiver</button></Link>
					</div>
				</div>)
	}
}