import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
const {HELP_FIELDS, variable} = require('../config');


export default class SignUpWizardHelper extends Component {
	constructor(props){
	    super(props)
	    this.state = {};
	   	HELP_FIELDS.forEach(field => this.state[variable(field)] = false)
	}
  	toggle = (field) => () => {
  		const update = {}
  		update[field] = !this.state[field]
  		this.setState(update)
	}
	clickButton(){
		fetch('/user', {
  			   method: 'PUT',
  			   headers: {
                  'Content-Type': 'application/json'
  				},
  				body: JSON.stringify({
    				username: this.props.username,
    				...this.state,
    				token: this.props.token
  				})
		})

	}
	render(){
		const { toggle } = this
		return(
			<div>
				<p>Thank you for gifting your skillzzzzz to the community!! Let us know WHAT YA GOT by checking all that apply! </p>
				{
					HELP_FIELDS.map(field => (
						<div>
        					<input
        						name="visit" type="checkbox" checked={this.state[variable(field)]} onChange={toggle(variable(field))} />
        					<label> {field} </label>
        				</div>
						))
				}
				
        		<div>
					<Link to="/Home"><button onClick={this.clickButton.bind(this)}>Submit</button></Link>
    			</div>
    		</div>	
        )
	}
}