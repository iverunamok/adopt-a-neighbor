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
			imagePreviewUrl: ""
		};
		console.log("Constructor did things")
    this.userName = this.userName.bind(this)
    this.passWord = this.passWord.bind(this)
    this.userAddress = this.userAddress.bind(this)
	}

	userName(event) {
		//console.log("Set the username to ", this.state.userName)
		this.setState({username: event.target.value});
	}

	passWord(event) {
    //console.log("Password ", this.state.password)
		this.setState({password: event.target.value});
	}

	userAddress(event) {
    //console.log("address ", this.state.address )
		this.setState({address: event.target.value});
	}

  submitLogin(){
    console.log('submitting login')
		const fd = new FormData();
		fd.append('profilePicture', ReactDom.findDOMNode(this.refs.file).files[0]); //appending the profile pic hi tom
		for (var key in this.state){
      if (key !== 'imagePreviewUrl'){
			fd.append(key, this.state[key]) //sending in form data hi tom
		  }
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
  
  
  
   _handleImageChange(e) {
    e.preventDefault()

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
		var $imagePreview = null;
			if (imagePreviewUrl) {
			$imagePreview = (<img style={(height: 100, width:100}} className="previewImage" src={imagePreviewUrl} />);
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
          <input onChange={this._handleImageChange.bind(this)} ref="file" type="file"  name="file"/><br/>

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

// goes on line 135: <input className="file" ref="file" type="file" onChange={(e)=>{console.log('!'); this._handleImageChange(e)}} name="file"/><br/>
