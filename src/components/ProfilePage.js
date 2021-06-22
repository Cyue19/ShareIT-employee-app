import React, { Component } from 'react';
import "./Account.css";

import PersonalInfo from "./profile-info/PersonalInfo";
import ProfessionalInfo from "./profile-info/ProfessionalInfo";
import Absences from "./profile-info/Absences";
import Account from "./profile-info/Account";
import Profile from "../models/Profile";
import ProfileBar from './profile-info/ProfileBar';

import Firebase from "../firebase/Firebase";


export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.urlId = this.props.match.params.userId;
        this.db = Firebase.instance().db;

        this.state = {
            tab: 1,
            profile: null,
            loading: true,
            urlId: ''
        }
    }

    componentDidMount() {
        this.fetchProfileFromFirebase();
        const urlId = this.props.match.params.userId;
        this.setState({
            urlId: urlId
        })
    }

    /**Fetch profile object w/ id from firebase */
    async fetchProfileFromFirebase() {
        try {
            const snapshot = await this.db.collection('profiles').where('userId', '==', this.urlId).get();
            const doc = snapshot.docs[0];
            const profile = new Profile(doc.data().firstName, doc.data().lastName, doc.data().userId);
            this.setState({
                profile: profile,
                loading: false
            });
        } catch(err) {
            alert(err);
        }
    }

    async updateProfile() {

    }

    /**Display/return the correct profile card info tab */
    getTab() {
        const { tab, profile } = this.state;

        switch (tab) {
            case 1:
                return(<PersonalInfo profile={profile}/>);
            case 2:
                return(<ProfessionalInfo profile={profile}/>);
            case 3:
                return(<Absences profile={profile}/>);
            case 4:
                return(<Account profile={profile}/>)
            default: 
                break;
        }
    }

    changeTab(tab) {
        for (let i = 1; i <= 4; i++) {
            if (i === tab) {
                document.getElementById(i).className = "nav-link active";
            } else {
                document.getElementById(i).className = "nav-link";
            }
        }
        this.setState({
            tab
        })
    }

    render() {
        const { user } = this.props;
        const { profile } = this.state; 

        return (
            <div className="pb-3">
                {/* <img src={pic} alt="profile" style={{width: '100px'}} className="mb-3"/>
                <div className="mb-3" style={{width: "90%"}}>
                    <div className="row">
                        <div className="col">
                            <h1>{}</h1>
                            <h2>Position</h2>
                        </div>
                    </div>

                    {
                        user.uid === this.urlId ?
                            <button type="button" className="btn btn-primary">Edit</button>
                            :
                            <div></div>
                    }
                </div> */}
                {
                    this.state.loading ?
                        <div></div>
                    :
                    <ProfileBar profile={ profile } user={user}/>    
                }
                
                <div style={{width: "90%", margin: "auto"}}>
                    <ul className="nav nav-tabs">
                        <li onClick={() => this.changeTab(1)} className="nav-item">
                            <p id="1" className="nav-link active">Personal Info</p>
                        </li>
                        <li onClick={() => this.changeTab(2)} className="nav-item">
                            <p id="2" className="nav-link">Professional Info</p>
                        </li>
                        <li onClick={() => this.changeTab(3)} className="nav-item">
                            <p id="3" className="nav-link">Days Off</p>
                        </li>
                        <li onClick={() => this.changeTab(4)} className="nav-item">
                            <p id="4" className="nav-link">Account</p>
                        </li>
                    </ul>

                    {
                        this.state.loading ?
                            <div></div>
                        :

                        this.getTab()

                        
                    }
                </div>
            </div>
        )
    }
}