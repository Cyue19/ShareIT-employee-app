import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import img1 from '../img/shareit_logo_2021.png';
import Firebase from "../firebase/Firebase";
import ShowIf from "./ShowIf";

const auth = Firebase.instance().auth;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: props.user,
            click: false,
        }
    }

    async logout() {
        try {
        await auth.signOut();
        } catch (err) {
        alert(err);
        }
    }

    myAccount(e) {
        e.preventDefault();
        const url = "/profile/" + this.props.user.$.W; 
        this.props.history.push(url);
    } 

    handleClick() {
        this.setState({
            click: !this.state.click
        })
    }
    closeMobileMenu() {
        this.setState({
            click: false 
        })
    }
    
    render() {
        const { user } = this.props;
        const url = '/profile/';

        return (
            <div style={{width: '90%', margin: 'auto'}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand"><img src={img1} alt="Logo" style={{width: '120px', position: 'relative', top: '8px'}} className="mb-3"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/main'>Employees</Link>
                                    </li>
                                :
                                    null
                            }
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to={url + this.props.user.$.W}>My Account</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={()=>this.logout()}>Log Out</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                !user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Log In</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                !user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                :
                                    null
                            }  
                            <ShowIf isTrue={user}>   
                                <li className="nav-item mt-1 notif">
                                    <Link className="nav-link" to="/mynotifications">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                    </svg>
                                    </Link>
                                </li>
                            </ShowIf>  
                        </ul>
                        
                    </div>
                </nav>
            </div>
            
         );
    }


 
  
}

export default Navbar;