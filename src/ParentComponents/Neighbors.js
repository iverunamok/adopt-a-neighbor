import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {HELP_FIELDS, variable} from '../config'
import Messages, {MessagePane} from './Messages'

export default class Neighbors extends Component {
	constructor(props){
    super(props)
    console.log(props)
    this.state = {
          userList: []
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

  toggleMessage(){
    this.setState({showMessage: !this.state.showMessage})
  }

  render(){
    console.log(this.props)
    const {username, profilePic} = this.props
    return (
      <div>
        <h1>{username}</h1>
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
          {this.state.showMessage ? <Messages {...this.props} toggleMessage={this.toggleMessage.bind(this)} /> : <span />}
        </div>
     </div>)
  }
}
