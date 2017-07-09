import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// export default class Neighbors extends Component {
//   constructor(props){
//     super(props)
//     console.log(props)
//     this.state = {
//       userlist: []
//     };
//   }

//   componentDidMount() {
//     this.loadData()
//   }
  
//   loadData(){
//     fetch ('/api/user?token=' + this.props.token)
//       .then(response => response.json())
//       .then(json => {
//         console.log(json)
//         this.setState({
//           userlist: json
//         })
//       })
//   }

//   render(){
//     const { users } = this.state
//     console.log(users)
//     return (
//       <ul>
//         { users ? (
//           users.map(user => (
//             <li>user.username</li>
//           ))
//         ) : (
//           <li>Loading...</li>
//         )}
//       </ul>
//     )
//   }
// }

export default class Neighbors extends Component {
	constructor(props){
    super(props)
    console.log(props)
    this.state = {
          userlist: []
    };
 }
  
  fetchingUsers(){
    console.log("here????", this.state.userlist)
    fetch('/fieldMatch', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this.state.userlist,
        token: this.props.token
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          userlist: json
        });
      })
    })
  }

  render(){
    const { users } = this.state
    console.log("WEEEEEEeeeeeee is this working", users)
    return (
      <div>
        <ul>
          { users ? (
            users.map(user => (
              <li>user.username</li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    )
  }
}