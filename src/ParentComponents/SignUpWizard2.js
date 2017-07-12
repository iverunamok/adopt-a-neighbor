import React, {Component} from 'react';
import {BrowserRouter as Router,Redirect, Route, Link} from 'react-router-dom';
import ReactDom from 'react-dom';

export default class SignUpWizard2 extends Component {

	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			address: "",
			profilePic: "",
			imagePreviewUrl: ""
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

// 	_handleImageChange(e) {
// 	e.preventDefault()
// 	console.log('yoooooo', e.target.files)
// 	e.preventDefault();
//
// 	let reader = new FileReader();
// 	let file = e.target.files[0];
//
// 	reader.onloadend = () => {
// 		console.log('setting state')
// 		this.setState({
// 			imagePreviewUrl: reader.result
// 		});
// 	}
//
// 	reader.readAsDataURL(file)
// }



	submitLogin(){
		const fd = new FormData();
		fd.append('profilePicture', ReactDom.findDOMNode(this.refs.file).files[0]); //appending the profile pic hi tom
		for (var key in this.state){
			fd.append(key, this.state[key]) //sending in form data hi tom
		}
		fetch('/user', {
  				method: 'POST',
  				body: fd
		})
		.then(resp => resp.json())
		.then(json =>{
			console.log(json)
			 const {token, username} = json
			 this.props.login({token, username})


		})

	}

	onPictureChange(e){
		console.log(e.ref);
		// this function happens on every hcange opf input
		// you need to find the ref to the file in the event
		//  use the reference to the picture file to upload the file to the database
		//  and set the state of this page, like this -> this.setState({})
	}
	_handleImageChange(e) {
    e.preventDefault()
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

	keyPress(event){
		if(event.key === 'Enter'){
			this.submitLogin()
		}
	}

	render(){
		const { imagePreviewUrl } = this.state;
		const $imagePreview = null;
			if (imagePreviewUrl) {
			$imagePreview = (<img className="previewImage"src={imagePreviewUrl} />);
		} else {
			$imagePreview = (<div className="previewText"></div>);
		}
		if (this.props.token) return <Redirect to='/HelperChooser'/>
		return(
			<div>
				<form ref="uploadForm" onSubmit={(e)=> e.preventDefault()} encType="multipart/form-data">
				<div>
					<div>
            {$imagePreview}
          </div>
								<div>
									Username: <input placeholder="Type in your username here" onChange={this.userName.bind(this)}/>
								</div>
								<div>
									Password: <input type="password" placeholder="Enter password" onChange={this.passWord.bind(this)}/>
								</div>
								<div>
									Address: <input type="address"  placeholder="Enter Your Address" onChange={this.userAddress.bind(this)}/>
								</div>

					<label>Upload a Profile Picture </label>
					<input onChange={this.onPictureChange.bind(this)} ref="file" type="file"  name="file"/><br/>
					<input className="file" ref="file" type="file" onChange={(e)=>{console.log('!'); this._handleImageChange(e)}} name="file"/><br/>
					<div>
						<button onClick={this.submitLogin.bind(this)}> Submit</button>
					</div>
				</div>
			</form>
			</div>
		)
	}
}

SignUpWizard2.contextTypes = {
  router: React.PropTypes.object
}
