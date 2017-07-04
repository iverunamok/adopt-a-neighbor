import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
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
  render(){
    return (
      <div>
      <Router>    
        <div>
          <div className="App">
            <div className="App-header">
            <h2>Adopt A Neighbor</h2>
            </div>
            <button onClick={ ()=> window.history.back()
}>Take me back</button>
          </div>


          <Route exact path="/" component={Splash}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Home" component={Home}/>
          <Route path="/Messages" component={Messages}/>
          <Route path="/Neighbors" component={Neighbors}/>
          <Route path="/SignUpWizard" component={SignUpWizard}/>
          <Route path="/SignUpWizard2" component={SignUpWizard2}/>
          <Route path="/SignUpWizardHelper" component={SignUpWizardHelper}/>
          <Route path="/SignUpWizardReceiver" component={SignUpWizardReceiver}/> 
        </div> 
      </Router>
    
      </div>
    )
  }
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