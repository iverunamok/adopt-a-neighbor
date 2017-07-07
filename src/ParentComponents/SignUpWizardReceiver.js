import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
	
	const FIELDS = ['Visiting',
				'Technology Help',
				'Yard Work',
				'Indoor Cleaning',
				'Filing Paperwork',
				'Heavy Lifting',
				'Transportation',
				'Errands',
				'Other']

	const variable = (label) => label.toLowerCase().replace(/\s/g, '_')

	export default class SignUpWizardReciever extends Component {
		constructor(props){
		    super(props)
		    this.state = {};
		   	FIELDS.forEach(field => this.state[variable(field)] = false)
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
					<p> Sometimes asking for and recieving help from Neighbors really makes us all closer. Let the community know what you need help with! </p>
					{
						FIELDS.map(field => (
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