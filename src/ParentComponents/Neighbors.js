import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Neighbors extends Component {
	constructor(props){
    super(props)
    console.log(props)
    this.state = {
          userList: []
    };
 }
  
  fetchingUsers(){
    console.log("here????")
    if(this.props.token){
      fetch('/fieldMatch?token=' + this.props.token,
        { method: 'GET',
          mode: 'no-cors',
        })
        .then(response => response.json())
        .then(neighbors => this.setState({userList: neighbors}))
    }
  }

  componentDidMount(){
    this.fetchingUsers();
  }

  render(){
    return (
      <div>
        <ul>
          {this.state.userList.map(user => (
            <li>{user.username} </li>
            ))}
        </ul>
      </div>
    )
  }
}
           //need to turn these into seperate pieces, fully independent?\
           //maybe I could do a map with multiple function parameters? ask nathan
                          //*user Image
                              // <ul>
                              //     {this.state.userList.map(userIMG => (
                              //       <li>{userIMG.imgURL}</li>
                              //       ))}
                              // </ul>
                          //*user Fields? still needs work
                              // <ul>
                              //   {this.state.userList.map(variable => {
                              //             const obj = {}
                              //             obj[variable] = true;
                              //             return obj
                              //            })}
                              // </ul>
                          //*user Location? still need a map function to give only approx location... 
                          //*do we want to pull out city or zipcode here? organize this by closest to farthest
                              // <ul>
                              //    {this.state.userList}.map(userLocation => (
                              //      <li> {userLocation.address}))</li>
                              // </ul>
                          //*message each user button? still needs work? what would be easiest
                              // <div>
                              //    <Link to="/Messages">
                              //        <button onClick={this.fetchingUsers.bind(this)}>Message</button>
                              //    </Link>
                              // </div>
     