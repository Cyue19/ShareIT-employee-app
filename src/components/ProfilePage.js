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
        this.storage = Firebase.getInstance().storage;

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
            const profile = new Profile(doc.data().firstName, doc.data().lastName, doc.data().picture, doc.data().id);
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
        const { tab, profile, loading } = this.state;

        return (
            <div className="pb-3">
                { loading ?
                    <div></div>
                    :
                    <div>
                        <div className="stripe"></div>
                
                        <div className="mb-3" style={{width: "90%"}}>
                            <div className="row">
                                <div className="col-2 text-center">
                                    <img className="profile-picture" src={profile.picture} alt="choose"></img>
                                </div>
                                <div className="col-2">
                                    <h1 className="unbold">{profile.firstName} {profile.lastName}</h1>
                                    <h2 className="unbold">Position</h2>
                                </div>
                            </div>

                            {
                                user.uid === this.urlId ?
                                    <button type="button" className="btn btn-primary">Edit</button>
                                    :
                                    <div></div>
                            }
                        </div>

                        <div style={{width: "80%", margin: "auto"}}>
                            <ul className="nav nav-tabs">
                                <li onClick={() => this.changeTab(1)} className="nav-item">
                                    <p className={tab===1 ? "nav-link active" : "nav-link"}>Personal Info</p>
                                </li>
                                <li onClick={() => this.changeTab(2)} className="nav-item">
                                    <p className={tab===2 ? "nav-link active" : "nav-link"}>Professional Info</p>
                                </li>
                                <li onClick={() => this.changeTab(3)} className="nav-item">
                                    <p className={tab===3 ? "nav-link active" : "nav-link"}>Days Off</p>
                                </li>
                                <li onClick={() => this.changeTab(4)} className="nav-item">
                                    <p className={tab===4 ? "nav-link active" : "nav-link"}>Account</p>
                                </li>
                            </ul>

                            {this.getTab()}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
