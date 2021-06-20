import { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Firestore from "./firebase/Firebase";

import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";

import PropsRoute from './components/PropsRoute';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import EmailSent from './components/EmailSent';


class App extends Component {

  constructor(props) {
    super(props);
    this.auth = Firestore.getInstance().auth;

    this.state={
      user: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.subscribeToUser();
  }

  subscribeToUser() {
    this.auth.onAuthStateChanged((user) => {
      this.setState({
        user,
        loading: false
      })
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        {
        loading ?
          <div>Loading</div>
          :
          <BrowserRouter>
            <Route path="/register" exact component={Register}/>
            <PropsRoute path="/profile/:id" user={this.state.user} exact component={ProfilePage}/>
            <PropsRoute path='/login' exact component={Login}/>
            <PropsRoute path='/forgot' exact component={ForgotPassword}/>
            <PropsRoute path='/confirm' exact component={EmailSent}/>
          </BrowserRouter>
        }
      </div>
    );
  }
}

export default App;
