import React, { Component } from 'react';
import './Main.css';
import img1 from '../img/shareit_logomarca_2021.png';
import background1 from '../img/bg_gradient.png';


export default class Main extends Component {
    render() {
        //styling of text at top
        const styleBackground = {
            color: "white",
            fontFamily: "Gilroy-Light",
            fontSize: "x-large",
            
        }

        compotentDidMount(){
            const myData = this.state.contacts
            .sort((a, b) => a.name.localeCompare(b.name))
            map((item, i) => <List key={i} data={item} />);
        };


        return (
            <div style={{ backgroundImage: 'url(${background1})'}}>
                <h1 className ="h3 mb-3 text-center" style={styleBackground}>Employees</h1>
                <ul> 
                    {
                        this.state.contacts.map((items, i) => <List key={i} data={item} />)
                    }
                </ul>




                <p className="mt-5 mb-3 text-muted">Copyright © 2011-2021, Share IT and its related companies. All rights reserved.</p>
            </div>
        )
    }
}
