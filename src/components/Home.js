import React, { Component } from 'react'
import img1 from '../img/shareit_logomarca_2021.png';
import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        if (this.props.user) {
            this.props.history.push('/main');
        }
    }

    login() {
        this.props.history.push('/login');
    }

    register() {
        this.props.history.push('/register');
    }

    render() {
        return (
            <div style={{background: "linear-gradient(to left, #3c817a, #19033d)", height: '100%', display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <div role="main" className="inner cover p-3 text-center">
                    <img src={img1} alt="Logo" style={{width: '100px'}} className="mb-3"/>
                    <h2 className="cover-heading" style={{color: 'white'}}>Share IT Employee Managemenet System</h2>
                    <div className="mt-3" onClick={() => this.login()}> 
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
                    </div>
                    <div className="mt-3" onClick={() => this.register()}> 
                            <button className="w-100 btn btn-lg btn-secondary" type="submit">Register</button>
                    </div>
                    
                </div>
        </div>
        )
    }
}
