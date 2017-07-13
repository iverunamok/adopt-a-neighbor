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
			<div className="fluid-container">
			<div className="rightfont">
			<div className="appheader">
				<h2 className="form-signin-heading">Join Your Community</h2>
			</div>
			</div>
				<form className="form-horizontal">
					<div>
					<label for="inputUsername" className="sr-only">
						Create Username: </label><input type="username" id="inputUsername" className="form-control" placeholder="Type in your username here" onChange={this.userName.bind(this)}/>
					</div>
					<div>
					<label for="inputPassword" className="sr-only">
						Create Password: </label><input type="password" id="inputPassword" className="form-control" placeholder="Enter a password" onChange={this.passWord.bind(this)}/>
					</div>
					<div>
					<label for="inputAddress" className="sr-only">
						Enter Your Address: </label><input type="address" id="inputAddress" className="form-control" placeholder="Enter Your Address" onChange={this.userAddress.bind(this)}/>
					</div>
					<button className="btn btn-block" type="button" onClick={this.submitLogin.bind(this)}>Submit</button>
				</form>
			</div>
		)
	}
}

SignUpWizard2.contextTypes = {
  router: React.PropTypes.object
}
