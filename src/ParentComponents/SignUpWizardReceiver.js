import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {variable, HELP_FIELDS} from '../config'
	


	export default class SignUpWizardReciever extends Component {
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
				<div className="fluid-container">
				<div className="rightfont">
				<div className="appheader">
				<h2>Welcome Neighbor!</h2>
				</div>
					<h3 class="text-primary text-center"><i>Sometimes asking for and receiving help from Neighbors makes us all closer</i></h3><h3>Let the community know what you need help with:</h3>
					{HELP_FIELDS.map((field) => {
								console.log("field ", field)
								return(
										<div className="form-check">	
		        							<input className="form-check-input" id={variable(field)} type="checkbox" value="" checked={this.state[variable(field)]} onChange={toggle(variable(field))} />
											<label className="form-check-label" for={variable(field)}> {field} </label>
			        					</div>
									)}
								)
					}
	        		<div>
						<Link to="/Home"><button className="btn btn-block" onClick={this.clickButton.bind(this)}>Submit</button></Link>
	    			</div>
	    		</div>
	    		</div>	
        )
	}
}