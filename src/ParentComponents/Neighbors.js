import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Neighbors extends Component {
	constructor(props){
    super(props)
    console.log(props)
    this.state = {
          userList: [
    {
        "_id": "595fe0c58c18c309fd455b6a",
        "username": "brenda",
        "address": "59801",
        "lat": 46.8500521,
        "lng": -113.9869641,
        "helper": false,
        "__v": 0,
        "other": false,
        "errands": false,
        "transportation": false,
        "heavy_lifting": true,
        "filing_paperwork": false,
        "indoor_cleaning": true,
        "yard_work": false,
        "technology_help": false,
        "visiting": true,
        "location": {
            "coordinates": [
                -113.9869641,
                46.8500521
            ],
            "type": "Point"
        },
        "admin": false
    },
    {
        "_id": "595ff7356b3bd60a85c15270",
        "username": "mike2",
        "address": "59802",
        "lat": 46.9539821,
        "lng": -113.9120099,
        "helper": false,
        "__v": 0,
        "other": false,
        "errands": false,
        "transportation": true,
        "heavy_lifting": false,
        "filing_paperwork": false,
        "indoor_cleaning": false,
        "yard_work": false,
        "technology_help": false,
        "visiting": false,
        "location": {
            "coordinates": [
                -113.9120099,
                46.9539821
            ],
            "type": "Point"
        },
        "admin": false
    }
]
    };
 }
  
  // fetchingUsers(){
  //   console.log("here????", this.state.userlist)
  //   fetch('/fieldMatch', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       ...this.state.userlist,
  //       token: this.props.token
  //     })
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //       this.setState({
  //         userlist: json
  //       });
  //     })
  //   })
  // }

  render(){
    return (
      <div>
        <ul>
            {this.state.userList.map(user => (
              <li>{user.username}</li>
            ))}
        </ul>
      </div>
    )
  }
}