import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class Messages extends Component {
  constructor(props){
  super(props)
  this.state = {
    text: "",
    messages : [],
    messArr: [],
    userList: [],
    redirect: false,
    showingUser: ''
  };

  this.allMessages = this.allMessages.bind(this)
  }

  componentWillReceiveProps(){
    console.log('receiving props')

  }

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
        to: this.state.showingUser, 
        text: this.state.text,
        token: this.props.token,
        date: this.props.date
      })
    })
    .then((response) => {
      this.setState({text: ''})
    })
  }

  allLoggedInUserMessages(){
    fetch('/messages' + '?token=' + this.props.token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(allMessageArray => {
      console.log("Hi MITCH", allMessageArray)
    })
  }

  allMessages(user){
    return () => {
      if(this.state.showingUser === user){
        this.setState({showingUser: false})
      } else{
        this.setState({showingUser: user})
        console.log('going to get the messages', this.props.token)
        fetch('/messages/' + user + '?token='+ this.props.token, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(messageHistoryArr => {
          console.log('MHA ', messageHistoryArr)
          this.setState({messArr : messageHistoryArr.messages || []})
        })
      }
    
   }
  }

  render(){
    const {username, User1} = this.props
    if (this.props.token && this.state.userList.length === 0){
      fetch('/getAllSenderNames?token=' + this.props.token)
      .then(res => res.json())
      .then(json => this.setState({userList: json}))
    }
    if(this.state.redirect) return <Redirect to="/Home" />
     return(

    	<div>
          {this.state.userList.map(user => {
           return (<div>
             Show messages from {user} <button onClick={this.allMessages(user).bind(this)}>See Messages</button>
           </div>) 

          })}
            <br/><textArea value={this.state.text} placeholder="Enter Message to your neighbor!" onChange={this.textSet.bind(this)}></textArea><br/>
            <button className="button" onClick={this.submitMessage.bind(this)}>Reply</button><br/> <br/>
          <div>
            {this.state.showingUser ? this.state.messArr.map((user) =>{
                return(
                  <div>
                    <h3>{user.to}</h3>
                    <span>{user.date.slice(0,10)}</span>
                    <p>{user.text}</p>
                  </div>
                )
            }) : ''}
          </div>
      </div>
    )
  }
}
