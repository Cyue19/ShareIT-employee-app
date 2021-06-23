import { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
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

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = Firebase.instance().auth;
    this.db = Firebase.instance().db;

    this.state={
      user: null,
      loading: true,
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
    });
  }

  render() {
    const { user, loading } = this.state; 
    return (
      <div>
        {
          loading ? 
            <div>Loading</div>
          :
          <BrowserRouter>
            <Navbar user={user}/>
            <GuardedRouteNonUser path='/login' exact component={Login} user={user}/>
            <GuardedRouteNonUser path="/register" exact component={Register} user={user}/>
            <GuardedRouteNonUser path="/" exact component={Home} user={user}/>
            <GuardedRouteNonUser path='/forgot' exact component={ForgotPassword} user={user}/>
            <GuardedRouteUser path='/main' exact component={Main} user={user}/> 
            <GuardedRouteUser path="/profile/:userId" exact component={ProfilePage} user={user}/>
          </BrowserRouter>
        }
      </div>
      
    );
  }
}

export default App;
