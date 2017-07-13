import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
		};
	}
	userName(event) {
		this.setState({username: event.target.value});
	}
	passWord(event) {
		this.setState({password: event.target.value});
	}
	submitLogin(){
		fetch('/api/authenticate', {
  				method: 'POST',
  			 	headers: {
    				'Content-Type': 'application/json'
  			 	},
  				body: JSON.stringify(this.state)
		})
		.then(resp => resp.json())
		.then(json =>{
			 const {token, username} = json
			 this.props.login({token, username})
			 this.context.router.history.push('/Home')
		})
	
	}
	keyPress(event){
		if(event.key === 'Event'){
			this.submitLogin()
		}
	}
	render(){
		const {username, password} = this.state
		return( 
			<div className="fluid-container">
			<div className="rightfont">
			<div className="appheader">
					<div class="col-md-12">
						<h2 class="text-primary text-center">Re-Join Your Community</h2>
					</div>
			</div>
			</div>
			<form className="form-horizontal">
				<div>
				<label for="inputUsername" className="sr-only">
					Username: </label><input type="username" id="inputUsername" className="form-control" value={username} placeholder="Type in your username here" onChange={this.userName.bind(this)}/>
				</div>
				<div>
				<label for="inputPassword" className="sr-only">
					Password: </label><input type="password" id="inputPassword" className="form-control" value={password} placeholder="Enter password" onChange={this.passWord.bind(this)} onKeyPress={this.keyPress.bind(this)}/>
				</div>
				<div>
					<button className="btn btn-block" type="button" onClick={this.submitLogin.bind(this)}>Login</button>
				</div>
			</form>
			</div>
		)	 
	}
}

Login.contextTypes = {
  router: React.PropTypes.object
}




