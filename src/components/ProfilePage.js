import React, { Component } from 'react';
import "./Account.css";

import PersonalInfo from "./profileInfo/PersonalInfo";
import ProfessionalInfo from "./profileInfo/ProfessionalInfo";
import Absences from "./profileInfo/Absences";
import Account from "./profileInfo/Account";
import Profile from "../models/Profile";

import Firebase from "../firebase/Firebase";

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.urlId = this.props.match.params.id;
        this.db = Firebase.getInstance().db;

        this.state = {
            tab: 1,
            profile: null,
            loading: true
        }
    }

    async componentDidMount() {
        const profile = await this.fetchProfileFromFirebase(this.urlId);
        this.setState({
            profile,
            loading: false
        });
    }

    /**Fetch profile object w/ id from firebase */
    async fetchProfileFromFirebase(id) {
        try {
            const snapShot = await this.db.collection("profiles").where("id", "==", id).get();
            const doc = snapShot.docs[0];
            const profile = new Profile(doc.data().firstName, doc.data().lastName, doc.data().id);
            return profile;
        } catch(err) {
            console.log(err);
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
        this.setState({
            tab
        })
    }

    render() {
        const { user } = this.props;
        console.log(this.props.user);

        return (
            <div className="pb-3">
                <div className="stripe"></div>
                
                <div className="mb-3" style={{width: "90%"}}>
                    <div className="row">
                        <div className="col-1 text-center">Picture</div>
                        <div className="col">
                            <h1>Name</h1>
                            <h2>Position</h2>
                        </div>
                    </div>

                    {
                        user.uid === this.urlId ?
                            <button type="button" className="btn btn-primary">Edit</button>
                            :
                            <div></div>
                    }
                </div>

                <div style={{width: "90%", margin: "auto"}}>
                    <ul className="nav nav-tabs">
                        <li onClick={() => this.changeTab(1)} className="nav-item">
                            <p className="nav-link active">Personal Info</p>
                        </li>
                        <li onClick={() => this.changeTab(2)} className="nav-item">
                            <p className="nav-link">Professional Info</p>
                        </li>
                        <li onClick={() => this.changeTab(3)} className="nav-item">
                            <p className="nav-link">Days Off</p>
                        </li>
                        <li onClick={() => this.changeTab(4)} className="nav-item">
                            <p className="nav-link">Account</p>
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
