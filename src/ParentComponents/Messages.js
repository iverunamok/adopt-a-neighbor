import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


export default class Messages extends Component {
  constructor(props){
  super(props)
  this.state = {
    text: "",
    messages : [],
    messArr: [],
    redirect: false
  };
  }

  // componentDidMount(){
  //   setInterval(this.recieveMessage.bind(this), 3000)

  // }

  textSet(event) {
    this.setState({text: event.target.value});
  }

  submitMessage(){
    console.log('this.props', this.props)
    fetch('/messages?token=' + this.props.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: this.props.user1, 
        to: this.props.username, 
        text: this.state.text,
        token: this.props.token,
        date: this.props.date
      })
    })
    .then((response) => {
      this.setState({text: ''})
      this.props.toggleMessage()
      //this.receiveMessage()
    })
  }
  receiveMessage(){
    var {username} = this.props
    fetch('/messages/:' + username + '/?token='+ this.props.token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.setState({messages : response || []})
    })
  }

  sentMessages(){
      fetch('/sentMessages?token=' + this.props.token,
        { method: 'GET',
        })
        .then(response => response.json())
        .then(neighbors => {
          this.setState({messArr: []})
        })
    }
  
  render(){
    if(this.state.redirect) return <Redirect to="/Home" />
    return(
    	<div>
          <div>
            <br/><textArea value={this.state.text} placeholder="Enter Message to your neighbor!" onChange={this.textSet.bind(this)}></textArea><br/>
            <button className="button" onClick={this.submitMessage.bind(this)}>Submit</button><br/> <br/>
          </div>
      </div>
    )
  }
}


