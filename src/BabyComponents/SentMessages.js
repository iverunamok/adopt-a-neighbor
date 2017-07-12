// import React, { Component } from 'react';
// import {Link} from 'react-router-dom'

// export default class SentMessages extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       messArr: [],
//     };
//   }
  
//   filterMessages(){
//       fetch('/sentMessages?token=' + this.props.token,
//         { method: 'GET',
//         })
//         .then(response => response.json())
//         .then(neighbors => {
//           this.setState({messArr: stuff})
//         })
//     }


//   render(){ 
//     return (<div> {this.state.messArr.map(message => <Message key={message._id} message={message}/>)}</div>) // takes each component of the messages array and it is assigning it as a message component
//   }
// }
// class Message extends Component{ 
//   messageNeighbor() {
//     this.props.message.setState({received: true})
//   }

//   render(){
//     return (<div>
//               <span> {this.props.message.from}: </span> 
//                  {this.props.message.text.join(' ')} 
//                  <Link to="../ParentComponents/Messages"><button onClick={this.messageNeighbor.bind(this)}> Reply </button></Link><br/>
//             </div>)
//   }
// }

 // if (messages.length===0) {
 //      return startArr;
 //    }
 //    const user = messages[0].from
 //    const userArr = messages.filter(function(message){
 //      return message.from === user
 //    })
  
 //    userArr.sort(function(a,b){
 //      var aDate=new Date(a.date)
 //      var bDate=new Date(b.date)
 //      return (aDate.getTime()>bDate.getTime())
 //    })
 //    const oneMess = startArr
 //    oneMess.push(userArr[0])
 //    const newArr = messages.filter(function(message){
 //      return message.from !== user
 //    })

 //    return this.filterMessages(newArr, oneMess)