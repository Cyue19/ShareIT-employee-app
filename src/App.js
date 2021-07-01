import { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import Register from "./components/Register";


import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import GuardedRouteUser from './components/GuardedRouteUser';
import GuardedRouteNonUser from './components/GuardedRouteNonUser';
import Firebase from './firebase/Firebase';
import Main from './components/Main';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import Notifications from "./components/Notifications";

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = Firebase.instance().auth;
    this.db = Firebase.instance().db;

    this.state={
      user: null,
      loading: true,
      permissions: "",
      newNotifs: 0
    }
  }

  componentDidMount() {
    this.subscribeToUserState();
  }

  subscribeToUserState() {
    this.auth.onAuthStateChanged((user) => {
      this.setState({
        user,
        loading: false
      });

      if (this.state.user) {
        this.getMyNotifs(this.state.user.uid);
      }
    });
  }

  async getMyNotifs(id) {
    try {
      const doc = await this.db.collection("profiles").doc(id).get();
      this.setState({
        newNotifs: doc.data().newCount
      });
      console.log(this.state.newNotifs);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { user, loading } = this.state; 
    return (
      <div>
        {
          loading ? 
            <div></div>
          :
          <BrowserRouter>
            {console.log("state", this.state.newNotifs)}
            <Navbar new={this.state.newNotifs} user={user}/>
            <GuardedRouteNonUser path='/login' exact component={Login} user={user}/>
            <GuardedRouteNonUser path="/register" exact component={Register} user={user}/>
            <GuardedRouteNonUser path="/" exact component={Home} user={user}/>
            <GuardedRouteNonUser path='/forgot' exact component={ForgotPassword} user={user}/>
            <GuardedRouteUser path='/main' exact component={Main} user={user}/> 
            <GuardedRouteUser path="/profile/:userId" exact component={ProfilePage} user={user}/>
            <GuardedRouteUser path="/mynotifications" exact component={Notifications} user={user}/>
          </BrowserRouter>
        }
      </div>
      
    );
  }
}

export default App;
