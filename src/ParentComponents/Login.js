import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
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
		return <div>
				<div>
					Username: <input value={username} placeholder="Type in your username here" onChange={this.userName.bind(this)}/>
				</div>
				<div>
					Password: <input type="password" value={password} placeholder="Enter password" onChange={this.passWord.bind(this)} onKeyPress={this.keyPress.bind(this)}/>
				</div>
				<div>
					<button onClick={this.submitLogin.bind(this)}> Login</button>
				</div>
			 </div>
	}
}

Login.contextTypes = {
  router: React.PropTypes.object
}




