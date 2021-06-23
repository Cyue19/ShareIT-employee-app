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
            loading: true,
            docId: null,
        }
    }

    /**Fetch profile with id from firebase */
    async componentDidMount() {
        try {
            const snapShot = await this.db.collection("profiles").where("userId", "==", this.urlId).get();
            const doc = snapShot.docs[0];
            const profile = new Profile(doc.data().firstName, doc.data().lastName, doc.data().picture, doc.data().id);
            profile.maritalStatus = doc.data().maritalStatus;
            profile.nationality = doc.data().nationality;
            profile.personalEmail = doc.data().personalEmail;
            profile.personalPhone = doc.data().personalPhone;
            profile.address = doc.data().address;
            profile.contact = doc.data().contact;
            profile.idNum = doc.data().idNum;
            profile.taxId = doc.data().taxId;
            profile.ssn = doc.data().ssn;
            profile.licenseNum = doc.data().licenseNum;
            profile.carPlateNum = doc.data().carPlateNum;
            profile.dependents = doc.data().dependents;
            profile.handicap = doc.data().handicap;
            profile.payee = doc.data().payee;
            profile.bank = doc.data().bank;
            profile.iban = doc.data().iban;
            profile.swift = doc.data().swift;
            
            this.setState({
                profile,
                docId: doc.id,
                loading: false
            })
        } catch(err) {
            console.log(err);
        }
    }

    async updateProfile(profile) {
        try {
            await this.db.collection("profiles").doc(this.state.docId).update({
                firstName: profile.firstName,
                lastName: profile.lastName,
                picture: profile.picture,
                maritalStatus: profile.maritalStatus,
                nationality: profile.nationality,
                personalEmail: profile.personalEmail,
                personalPhone: profile.personalPhone,
                address: profile.address,
                contact: profile.contact,
                idNum: profile.idNum,
                taxId: profile.taxId,
                ssn: profile.ssn,
                licenseNum: profile.licenseNum,
                carPlateNum: profile.carPlateNum,
                dependents: profile.dependents,
                handicap: profile.handicap,
                payee: profile.payee,
                bank: profile.bank,
                iban: profile.iban,
                swift: profile.swift
            });
            this.setState({
                profile
            });
        } catch(err) {
            console.log(err);
        }
    }

    /**Display/return the correct profile card info tab */
    getTab() {
        const { tab, profile } = this.state;
        const { user } = this.props;
        const self = user.uid===this.urlId;

        switch (tab) {
            case 1:
                return(<PersonalInfo update={(profile) => this.updateProfile(profile)} self={self} profile={profile}/>);
            case 2:
                return(<ProfessionalInfo update={(profile) => this.updateProfile(profile)} self={self} profile={profile}/>);
            case 3:
                return(<Absences update={(profile) => this.updateProfile(profile)} self={self} profile={profile}/>);
            case 4:
                return(<Account update={(profile) => this.updateProfile(profile)} self={self} profile={profile}/>);
            default: 
                break;
        }
    }

    changeTab(tab) {
        this.setState({
            tab
        });
    }

    render() {
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
                                    <h2 className="unbold">{profile.job}</h2>
                                </div>
                            </div>

                            {/* {
                                user.uid === this.urlId ?
                                    <button type="button" className="btn btn-primary">Edit</button>
                                    :
                                    <div></div>
                            } */}
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
                                    <p className={tab===3 ? "nav-link active" : "nav-link"}>Absences</p>
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
