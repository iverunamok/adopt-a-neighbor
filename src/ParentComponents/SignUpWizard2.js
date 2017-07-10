import React, {Component} from 'react';
import {BrowserRouter as Router,Redirect, Route, Link} from 'react-router-dom';

export default class SignUpWizard2 extends Component {

	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			address: "",
		};
		console.log("Constructor did things")
	}

	userName(event) {
		console.log("Set the username to ", this.state.userName)
		this.setState({username: event.target.value});
	}

	passWord(event) {
		this.setState({password: event.target.value});
	}

	userAddress(event) {
		this.setState({address: event.target.value});
	}

	submitLogin(){
		fetch('/user', {
  				method: 'POST',
  			 	headers: {
    				'Content-Type': 'application/json'
  			 	},
  				body: JSON.stringify(this.state)
		})
		.then(resp => resp.json())
		.then(json =>{
			console.log(json)
			 const {token, username} = json
			 this.props.login({token, username})


		})
	
	}
		
	keyPress(event){
		if(event.key === 'Enter'){
			this.submitLogin()
		}
	}

	render(){
		if (this.props.token) return <Redirect to='/HelperChooser'/>
		return(

			<div>
					<div>
						Username: <input placeholder="Type in your username here" onChange={this.userName.bind(this)}/>
					</div>
					<div>
						Password: <input type="password" placeholder="Enter password" onChange={this.passWord.bind(this)}/>
					</div>
					<div>
						Address: <input type="address"  placeholder="Enter Your Address" onChange={this.userAddress.bind(this)}/>
					</div>
					<button onClick={this.submitLogin.bind(this)}> Submit</button>
			</div>
		)
	}
}

SignUpWizard2.contextTypes = {
  router: React.PropTypes.object
}
