import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import img1 from '../img/shareit_logomarca_2021.png';
import Firebase from "../firebase/Firebase";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.auth = Firebase.instance().auth;
        this.state = {
            email: '',
            password: ''
        };
    };

    onEmailChanged(e) {
        this.setState({
            email: e.target.value
        });
    };

    onPasswordChanged(e) {
        this.setState({
            password: e.target.value
        });
    }; 

    async login(e) {
        e.preventDefault();
        try {
            const { email, password } = this.state; 
            const user = await this.auth.signInWithEmailAndPassword(email, password); 
            const url = "/main";
            this.props.history.push(url);
        } catch (err) {
            alert(err);
        }
    }

    render() {
        return (
            <div className="form-signin text-center" style={{background: "linear-gradient(to left, #3c817a, #19033d)", display: 'flex', justifyContent:'center'}}>
                <form className="mt-5 mb-5" onSubmit={(e)=>this.login(e)} style={{width: '484px', background: 'white', borderRadius: '20px' }}>
                    <div className="p-5">
                        <img src={img1} alt="Logo" style={{width: '100px'}} className="mb-3"/>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <div className="form-floating">
                            <input 
                                type="email" 
                                onChange={(e) => this.onEmailChanged(e)}
                                className="form-control" 
                                value={this.state.email}
                                placeholder="Email"/>
                            <label>Email address</label>
                        </div>
                        <div className="form-floating">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password"
                                onChange={(e) => this.onPasswordChanged(e)} 
                                value={this.state.password}/>
                            <label>Password</label>
                        </div>
                        <div className="mt-1">
                            <Link style={{textDecoration: 'none', display: 'flex', flexDirection:'row-reverse' }} to="/forgot">Forgot Password?</Link>
                        </div>
                        <div className="mt-3"> 
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        </div>
                        <div className="mt-5">
                            <span className="me-2">Don't have an account?</span>
                            <Link style={{textDecoration: 'none'}} to="/register">Register</Link>
                        </div>
                    </div>
                </form>                    
            </div>
        )
    }
}
