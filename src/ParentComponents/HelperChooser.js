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
		return(<div>
				<div>Are you a here to help neighbors?</div>
					<div>
						<Link to="/SignUpWizardHelper"><button onClick={this.clickButton(true)}>Helper</button></Link>
				<div>Are you here to receive support from neighbors?</div>
						<Link to="/SignUpWizardReceiver"><button onClick={this.clickButton(false)}>Receiver</button></Link><br />
					</div>
				</div>)
	}
}