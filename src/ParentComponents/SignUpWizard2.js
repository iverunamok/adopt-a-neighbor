import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class SignUpWizard2 extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			address: "",
		};
		console.log("Constructor did things")
	}

	userName(event) {
		console.log("Set the username to ", this.state.userName)
		this.setState({username: event.target.value});
	}

	passWord(event) {
		this.setState({password: event.target.value});
	}

	userAddress(event) {
		this.setState({address: event.target.value});
	}

	submitLogin(){
		console.log("TEST");
		        fetch('/user', {
		                  method: 'PUT',
		                   headers: {
		                    'Content-Type': 'application/json'
		                   },
		                  body: JSON.stringify({
		                      username: this.props.username,
													password: this.props.password,
													address: this.props.address
		            })
					})
		 }


	keyPress(event){
		if(event.key === 'Enter'){
			this.submitLogin()
		}
	}


	render(){
		return(
			<div>
					<div>
						Username: <input placeholder="Type in your username here"/>
					</div>
					<div>
						Password: <input type="password" placeholder="Enter password"/>
					</div>
					<div>
						Address: <input type="address"  placeholder="Enter Your Address"/>
					</div>
					<form action="">
						<Link to="/Login"><button onClick={this.submitLogin.bind(this)}> Submit</button></Link>
					</form>
			</div>
		)
	}
}

// 	render()
// 			console.log("processed return")
// 			const {username, password, address} = this.state.event
// 			return(
// 				<div>
// 					<div>
// 						Username: <input value={username} placeholder="Type in your username here" onChange={this.userName.bind(this)}/>
// 					</div>
// 						<div>
// 							Password: <input type="password" value={password} placeholder="Enter password" onChange={this.passWord.bind(this)} onKeyPress={this.keyPress.bind(this)}/>
// 						</div>
// 					</div>
// 					</div>
// 						Address: <imput type="address" value={address} placeholder="Enter Your Address" onChange={this.address.bind(this)} onKeyPress={this.keyPress.bind(this)}/>
// 					</div>
// 			</div>
// 					<button onClick={this.submitLogin.bind(this)}> Login</button>
// 				</div>
// 			</div>)
// 		)
// }
//
// Login.contextTypes = {
//   router: React.PropTypes.object
// }
//
// // BOWWOWBUDDIES
// import React, { Component } from 'react'
// import './App.css';
// import $ from 'jquery';
// import ReactDom from 'react-dom';
// import {browserHistory} from 'react-router'
// import { apiUrl } from '../config'
//
//
// export default class Profile extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       imgURL: "",
//       username: "",
//       password: "",
//       address: "",
//
//       anything: "",
//       imagePreviewUrl: ''
//     };
//   }
//
//   userName(event) {
//     this.setState({username: event.target.value});
//   }
//
//   passWord(event) {
//     this.setState({password: event.target.value});
//   }
//
//   addRess(event) {
//     this.setState({address: event.target.value});
//   }
//
//   sterileChange (event) {
//     this.setState({sterile: !this.state.sterile})
//   }
//
//   anySet(event) {
//     this.setState({anything: event.target.value});
//   }
//
//   _handleImageChange(e) {
//     e.preventDefault()
//     console.log('yoooooo', e.target.files)
//     e.preventDefault();
//
//     let reader = new FileReader();
//     let file = e.target.files[0];
//
//     reader.onloadend = () => {
//       console.log('setting state')
//       this.setState({
//         imagePreviewUrl: reader.result
//       });
//     }
//
//     reader.readAsDataURL(file)
//   }
//
//   submitProfile(e){
//     e.preventDefault();
//     var self = this;
//     var fd = new FormData();
//     fd.append('profilePicture', ReactDom.findDOMNode(this.refs.file).files[0]); //appending the profile pic hi tom
//     for (var key in this.state){
//       fd.append(key, this.state[key]) //sending in form data hi tom
//     }
//     $.ajax({
//         method: 'POST',
//         url: apiUrl + '/api/user',
//         processData: false,
//         contentType: false,
//         data: fd
//       })
//       .done(function(result){
//         console.log(result)
//         self.props.login({
//           token: result.token,
//           address: self.state.address,
//           username: self.state.username
//         })
//         browserHistory.push('/Homepage')
//       })
//     }
//
//     render() {
//       let { imagePreviewUrl } = this.state;
//       let $imagePreview = null;
//       if (imagePreviewUrl) {
//         $imagePreview = (<img className="previewImage"src={imagePreviewUrl} />);
//       } else {
//         $imagePreview = (<div className="previewText"></div>);
//       }
//       return (
//         <div className="App">
//         <form ref="uploadForm" className="uploader" onSubmit={(e)=> e.preventDefault()} encType="multipart/form-data">
//           <div className="UserProfile">
//             <h2 className="headProfile" htmlFor="headProfile">Owner Profile</h2>
//               <ul className="flex-outer">
//                 <li>
//                   <label htmlFor="user">Create a Username</label>
//                   <input className="user" type="textbox" onChange={this.userName.bind(this)}></input><br/>
//                 </li>
//                 <li>
//                   <label htmlFor="password">Create a Password</label>
//                   <input className="password" type="password" onChange={this.passWord.bind(this)}></input><br/>
//                 </li>
//                 <li>
//                   <label htmlFor="address">Address</label>
//                   <input className="address" type="textbox" onChange={this.addRess.bind(this)}></input><br/>
//                 </li>
//                 <li>
//                   <label htmlFor="about">About you</label>
//                   </li>
//                   <li className="flex-inner">
//                   <textArea onChange={this.aboutYou.bind(this)}></textArea>
//                 </li>
//               </ul>
//           </div>
//         </form>
//
//           <div className="UserProfile">
//             <div className="DogProfile">
//               <div className="flex-outer">
//                 <form>
//                   <h2 className="dogProfile" htmlFor= "headProfile">Dog Profile</h2>
//                     <ul class="flex-outer">
//
//             	<div className="flex-outer">
//               	<textArea placeholder="Anything else?" onChange={this.anySet.bind(this)}></textArea>
//             </div>
//           <button className="button" onClick={this.submitProfile.bind(this)}>submit</button>
//       );
//     }
//   }
