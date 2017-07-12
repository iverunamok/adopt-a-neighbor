import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import Splash from './ParentComponents/Splash'
import Login from './ParentComponents/Login'
import Messages from './ParentComponents/Messages'
import Home from './ParentComponents/Home'
import Neighbors from './ParentComponents/Neighbors'
import HelperChooser from './ParentComponents/HelperChooser'
import SignUpWizard2 from './ParentComponents/SignUpWizard2'
import SignUpWizardHelper from './ParentComponents/SignUpWizardHelper'
import SignUpWizardReceiver from './ParentComponents/SignUpWizardReceiver'
import css from './App.css'



export default class App extends Component {
  state = {
    token : ''
  }

  userInfo = (Comp) => (props) => <Comp {...props} username={this.state.username} token={this.state.token} cookieLoaded={this.state.cookieLoaded}/>
// Place Profile pic properties/etc. in here somehow.

  componentDidMount(){ //research componentDidMount
    if(document.cookie){// if you get a cookie, it is encoded data;
      this.setState(Object.assign(JSON.parse(document.cookie.split('; {')[0]), {cookieLoaded: true})) //.JSON.parse turns the information into an object (notation)
    } else { //the assign (above) is adding 'cookieLoaded' key value pair to our document.cookie
      this.setState({cookieLoaded: true})
    }
  }

  login(userdata){
    document.cookie = '';
    document.cookie = JSON.stringify(userdata) //contains all of the user data in our header
    this.setState(Object.assign(userdata, {cookieLoaded: true}))// needed to include cookieloaded field: becuase page was trying to load before page could recieve the cookie
  }

  logout(){
    document.cookie = ''; //on logout we set that cookie to mean absolutely nothing and that way we have no access :(
    this.setState({token: '', cookieLoaded: false, address: '', username: ''}) // resets all your data to nothing, becuase that's what you are when you leave our site.
    // =browserHistory.push('/Login')// sends you back to the login page;
  }



  render(){
    console.log(this.context)
    return (
      <div>
      <Router>
        <div>
          <div className="App">
            <div className="App-header">
            <h2>Adopt A Neighbor</h2>
            </div>
            <button onClick={ ()=> window.history.back()}>Take me back</button>
            {this.state.token ? <Link to='/' onClick={this.logout.bind(this)}> Logout </Link> : ""}

          </div>
          <Route exact path="/" component={() => <Splash  token={this.state.token}/>}/>
          <Route path="/Login" component={() => <Login login={this.login.bind(this)}/>}/>
          <Route path="/Home" component={() => <Home username={this.state.username} token={this.state.token}/>}/>
          <Route path="/Messages" component={() => <Messages token={this.state.token}/>}/>
          <Route path="/Neighbors" component={() => <Neighbors token={this.state.token} User1={this.state.username}/>}/>
          <Route path="/HelperChooser" component={this.userInfo(HelperChooser)}/>
          <Route path="/SignUpWizard2" component={(props) => <SignUpWizard2 {...props} token={this.state.token} login={this.login.bind(this)}/>}/>
          <Route path="/SignUpWizardHelper" component={this.userInfo(SignUpWizardHelper)}/>
          <Route path="/SignUpWizardReceiver" component={SignUpWizardReceiver}/>
        </div>
      </Router>
      </div>
    )
  }


}

App.contextTypes = {
  router: React.PropTypes.object
}
