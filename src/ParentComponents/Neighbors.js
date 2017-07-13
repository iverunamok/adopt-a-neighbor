import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {HELP_FIELDS, variable} from '../config'
import Messages, {MessagePane} from './Messages'

export default class Neighbors extends Component {
	constructor(props){
    super(props)
    console.log(props)
    this.state = {
          userList: [],
          text: ""
    }
 }

  fetchingNeighbors(){
    console.log("here????")
    if(this.props.token){
      fetch('/fieldMatch?token=' + this.props.token,
        { method: 'GET',
        })
        .then(response => response.json())
        .then(neighbors => {
          console.log('nay, boars!', neighbors)
          this.setState({userList: neighbors})
        })
    }
  }

  componentDidMount(){
    this.fetchingNeighbors();
  }

  render(){
    return(
      <div>
        <div>
          {this.state.userList.map(user => <Neighbor {...user} {...this.props} />)}
        </div>
      </div>
    )
  }
}

class Neighbor extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
          showMessage: false
    }
    this.toggleMessage = this.toggleMessage.bind(this)
 }

   submitMessage(){
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
      this.toggleMessage()
    })
  }

  textSet(event) {
    this.setState({text: event.target.value});
  }

  toggleMessage(){
    this.setState({showMessage: !this.state.showMessage})
  }

  render(){
    console.log(this.props)
    const {username, profilePic} = this.props
    return (
      <div>
      <div className="fluid-container">
      <div className="rightfont">
      <div className="appheader">
      <div className="col-md-12">
      <h2 className="text-primary text-center" className="rightfont" className="textBlack">Neighbors</h2>
      </div>
      </div>
        <h2>{username}</h2>
				{profilePic ? <img style={{height: 150, width:150}}src={'/profilePictures/' + profilePic} /> : ''}
        {
          HELP_FIELDS
            .filter(field => this.props[variable(field)])
            .map((field) => {
              return <div id={field}> {field} </div>
          })
        }
            <button onClick={this.toggleMessage}>Message</button>
        <div>
          {this.state.showMessage ? 
            (<span><br/>
            <textArea value={this.state.text} placeholder="Enter Message to your neighbor!" onChange={this.textSet.bind(this)}>
            </textArea>
            <br/>
            <button className="button"  onClick={this.submitMessage.bind(this)}>Submit</button>
            <br/> 
            <br/>
            </span>
            ) : ''}
        </div>
        </div>
     </div>
     </div>)
  }
}
