import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import fieldMatch from '../controllers/search.js'


export default class Neighbors extends Component {
	constructor(props){
    super(props)
    console.log(props)
    this.state = {
          userlist: []
    };
 }
 	searchResult(){
    const self = this
    $.get('/api/user?token=' + this.props.token,//need to change this jquery to
          function(response){ 
              self.setState({userlist : response})
          })
  }

  getUsers(){
  	fetch('/fieldMatch', {
  		method: 'GET',
		headers: {
  			'Content-Type': 'application/json'
		},
		body: JSON.stringify(this.state)
  	})
  	
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

	render(){
		console.log(searchResult)
		return 
		
	}
}