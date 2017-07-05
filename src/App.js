import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import Splash from './ParentComponents/Splash'
import Login from './ParentComponents/Login'
import Messages from './ParentComponents/Messages'
import Home from './ParentComponents/Home'
import Neighbors from './ParentComponents/Neighbors'
import SignUpWizard from './ParentComponents/SignUpWizard'
import SignUpWizard2 from './ParentComponents/SignUpWizard2'
import SignUpWizardHelper from './ParentComponents/SignUpWizardHelper'
import SignUpWizardReceiver from './ParentComponents/SignUpWizardReceiver'

export default class App extends Component {
  state = {
    token : ''
  }


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
    // browserHistory.push('/Login')// sends you back to the login page; 
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
          </div>
          <Route exact path="/" component={(props) => <Splash {...props} token={this.state.token}/>}/>
          <Route path="/Login" component={() => <Login login={this.login.bind(this)}/>}/>
          <Route path="/Home" component={() => <Home token={this.state.token}/>}/>
          <Route path="/Messages" component={() => <Messages token={this.state.token}/>}/>
          <Route path="/Neighbors" component={() => <Neighbors token={this.state.token}/>}/>
          <Route path="/SignUpWizard" component={SignUpWizard}/>
          <Route path="/SignUpWizard2" component={SignUpWizard2}/>
          <Route path="/SignUpWizardHelper" component={SignUpWizardHelper}/>
          <Route path="/SignUpWizardReceiver" component={SignUpWizardReceiver}/> 
        </div> 
      </Router>
      // Per Nathan: this is the placeholder for where our Logout will reside.
      </div>
    )
  }


}

App.contextTypes = {
  router: React.PropTypes.object
}

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/friends`}>
//           Old people are our friends
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/sadness`}>
//           Some of them are sad tho :(
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/happy`}>
//           but u can help
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )