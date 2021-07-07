import React, { Component } from 'react';
import "./Account.css";

import PersonalInfo from "./profileInfo/PersonalInfo";
import ProfessionalInfo from "./profileInfo/ProfessionalInfo";
import Absences from "./profileInfo/Absences";
import Account from "./profileInfo/Account";
import Profile from "../models/Profile";
import ProfileBar from "./profileInfo/ProfileBar";
import ResetPassword from './profileInfo/ResetPassword';

import LoadSpinner from "./LoadSpinner";

import Firebase from "../firebase/Firebase";

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.urlId = this.props.match.params.userId;
        this.db = Firebase.instance().db;
        this.storage = Firebase.instance().storage;

        this.state = {
            tab: 1,
            profile: null,
            loading: true,
            permissions: null
        }
    }

    /**Fetch profile with id from firebase */
    async componentDidMount() {
        try {
            const snapShot = await this.db.collection("profiles").where("userId", "==", this.urlId).get();
            console.log(snapShot);
            const doc = snapShot.docs[0];
            const profile = new Profile(doc.data().firstName, doc.data().lastName, doc.data().picture, doc.data().userId, doc.data().permissions);
            profile.birthDate = doc.data().birthDate;
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
            profile.degree = doc.data().degree;
            profile.school = doc.data().school;
            profile.courses = doc.data().courses;
            profile.bank = doc.data().bank;
            profile.iban = doc.data().iban;
            profile.swift = doc.data().swift;
            profile.collabId = doc.data().collabId;
            profile.labelsAndTags = doc.data().labelsAndTags;
            profile.workPhone = doc.data().workPhone;
            profile.workEmail = doc.data().workEmail;
            profile.country = doc.data().country;
            profile.region = doc.data().region;
            profile.holidayDate = doc.data().holidayDate;
            profile.job = doc.data().job;
            profile.manager = doc.data().manager;
            profile.baseSalary = doc.data().baseSalary;
            profile.expenses = doc.data().expenses;
            profile.mealAllowance = doc.data().mealAllowance;
            profile.flexibleWorkHrs = doc.data().flexibleWorkHrs;
            profile.comments = doc.data().comments;
            profile.contracts = doc.data().contracts;
            profile.absencesPerYr = doc.data().absencesPerYr;
            profile.absenceRequests = doc.data().absenceRequests;
            profile.accessEmail = doc.data().accessEmail;
            profile.permissions = doc.data().permissions;
            profile.status = doc.data().status;
            profile.language = doc.data().language;
            
            const permissions = await this.fetchUserPermissions();

            //if the profile being viewed is inactive and the user is only an employee redirect the page
            if (profile.status === "Inactive" && permissions === "Employee") {
                this.props.history.push("/main");
            }
            
            this.setState({
                profile,
                docId: doc.id,
                loading: false,
                permissions
            });
        } catch(err) {
            console.log(err);
        }
    }

    /**Get the user's permissions level */
    async fetchUserPermissions() {
        const snapShot = await this.db.collection("profiles").where("userId", "==", this.props.user.uid).get();
        const doc = snapShot.docs[0];
        return doc.data().permissions;
    }

    /**Save changes to profile object to firebase document */
    async updateProfile(profile) {
        try {
            await this.db.collection("profiles").doc(profile.userId).update({
                firstName: profile.firstName,
                lastName: profile.lastName,
                picture: profile.picture,
                birthDate: profile.birthDate,
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
                school: profile.school,
                degree: profile.degree,
                courses: profile.courses,
                bank: profile.bank,
                iban: profile.iban,
                swift: profile.swift,
                collabId: profile.collabId,
                labelsAndTags: profile.labelsAndTags,
                workPhone: profile.workPhone,
                workEmail: profile.workEmail,
                country: profile.country,
                region: profile.region,
                holidayDate: profile.holidayDate,
                job: profile.job,
                manager: profile.manager,
                baseSalary: profile.baseSalary,
                expenses: profile.expenses,
                mealAllowance: profile.mealAllowance,
                flexibleWorkHrs: profile.flexibleWorkHrs,
                comments: profile.comments,
                absencesPerYr: profile.absencesPerYr,
                contracts: profile.contracts,
                accessEmail: profile.accessEmail,
                status: profile.status,
                permissions: profile.permissions,
                language: profile.language,
                absenceRequests: profile.absenceRequests,
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
        const { tab, profile, permissions } = this.state;
        const { user } = this.props;
        const self = (user.uid===this.urlId);

        switch (tab) {
            case 1:
                return(<PersonalInfo update={(profile) => this.updateProfile(profile)} permissions={permissions} self={self} profile={profile}/>);
            case 2:
                return(<ProfessionalInfo update={(profile) => this.updateProfile(profile)} permissions={permissions} self={self} profile={profile}/>);
            case 3:
                return(<Absences update={(profile) => this.updateProfile(profile)} permissions={permissions} self={self} profile={profile}/>);
            case 4:
                return(<Account update={(profile) => this.updateProfile(profile)} permissions={permissions} self={self} profile={profile}/>);
            case 5:
                return(<ResetPassword update={(profile) => this.updateProfile(profile)} permissions={permissions} self={self} profile={profile}/>)
            default: 
                break;
        }

        this.setState({
            loading: false
        })
    }

    /**Display different tab information according to the tab variable */
    changeTab(tab) {
        this.setState({
            tab
        });
    }

    render() {
        const { tab, profile, loading } = this.state;
        const { user } = this.props;

        return (
            <div className="pb-3" style={{position: "relative"}}>

                    <LoadSpinner loading={loading}>
                        <ProfileBar update={(profile) => this.updateProfile(profile)} self={user.uid===this.urlId} profile={profile}/>   

                        <div style={{width: "90%", margin: "auto", position: "relative"}}>
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
                                {
                                    user.uid===this.urlId ?
                                        <li onClick={() => this.changeTab(5)} className="nav-item">
                                            <p className={tab===5 ? "nav-link active" : "nav-link"}>Reset Password</p>
                                        </li>
                                    :
                                        null
                                }
                                
                            </ul>

                            <div style={{position: "relative", width: "100%", top: "50%", paddingBottom: "30px"}}>
                                {this.getTab()}
                            </div>
                        </div>
                    </LoadSpinner>
            </div>
        )
    }
}
