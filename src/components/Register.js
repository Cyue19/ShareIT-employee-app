import React, { Component } from 'react'

import Firebase from "../firebase/Firebase";
import Profile from "../models/Profile";
import ShowIf from "./ShowIf";
import LoadButton from "./LoadButton";

import "./Register.css";

import img1 from '../img/shareit_logomarca_2021.png';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.auth = Firebase.instance().auth;
        this.db = Firebase.instance().db;
        this.storage = Firebase.instance().storage;
        
        this.state = {
            firstName: "",
            lastName: "",
            accessEmail: "",
            password: "",
            confirmPassword: "",
            error: "",
            btnLoading: false
        }
    }

    onFirstNameChanged(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onLastNameChanged(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onEmailChanged(e) {
        this.setState({
            accessEmail: e.target.value
        });
    }

    onPasswordChanged(e) {
        this.setState({
            password: e.target.value
        });
    }

    onConfirmPasswordChanged(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    async createUserAndProfile() {
        const {firstName, lastName, password, confirmPassword, accessEmail } = this.state;

        this.setState({
            btnLoading: true
        });

        if (!firstName || !lastName || !confirmPassword || !accessEmail) {
            this.setState({
                error: "Please complete all fields",
                btnLoading: false
            });
            return;
        } else if (password !== confirmPassword) {
            this.setState({
                error: "Passwords do not match",
                btnLoading: false
            });
            return;
        }

        console.log(this.state.accessEmail);
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(this.state.accessEmail, this.state.password);
            const picUrl = await this.storage.ref().child("images/default_profile_pic.jpg").getDownloadURL();
            const profile = new Profile(this.state.firstName, this.state.lastName, picUrl, userCredential.user.uid, "Employee", this.state.accessEmail);
            await this.db.collection("profiles").doc(profile.userId).set({
                userId: profile.userId,
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
                degree: profile.degree,
                school: profile.school,
                courses: profile.courses,
                bank: profile.bank, 
                iban: profile.iban, 
                swift: profile.swift, 
                collabId: profile.collabId,
                labelsAndTags: profile.labelsAndTags,
                workPhone: profile.workPhone,
                workEmail: profile.workEmail,
                holidays: profile.holidays,
                job: profile.job,
                manager: profile.manager,
                baseSalary: profile.baseSalary,
                expenses: profile.expenses,
                mealAllowance: profile.mealAllowance,
                flexibleWorkHrs: profile.flexibleWorkHrs,
                comments: profile.comments,
                contracts: profile.contracts,
                absencesPerYr: profile.absencesPerYr,
                accessEmail: profile.accessEmail,
                permissions: profile.permissions,
                status: profile.status,
                language: profile.language,
                absenceRequests: profile.absenceRequests,
                notifications: profile.notifications
            });

            this.setState({
                error: "",
                btnLoading: false
            });

            this.props.history.push("/profile/" + profile.userId);
        } catch(err) {
            this.setState({
                error: err.message,
                btnLoading: false
            });
        }
    }

    render() {
        const {error, btnLoading} = this.state;
        return (
            <div className="form-signin" style={{background: "linear-gradient(to left, #3c817a, #19033d)", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <div className="container mt-5 mb-5" style={{width: '484px', background: 'white', borderRadius: '20px'}}>
                 
                    <div className="text-center mt-5">
                        <img src={img1} alt="Logo" style={{width: '100px'}} className="mb-3"/>
                        <h1 className="unbold">Create your account</h1>
                        <p>Fill in all fields to register.</p>
                    </div>

                    <div className="form-card mb-5">
                        <form className="row">
                            <h2 className="unbold mb-3">Account Information</h2>
                            <div className="col-6 mb-3">
                                <label className="form-label">First Name</label>
                                <input onChange={(e) => this.onFirstNameChanged(e)} type="text" className="form-control"/>
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Last Name</label>
                                <input onChange={(e) => this.onLastNameChanged(e)} type="text" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input onChange={(e) => this.onEmailChanged(e)} type="email" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Password</label>
                                <input onChange={(e) => this.onPasswordChanged(e)} type="password" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Confirm Password</label>
                                <input onChange={(e) => this.onConfirmPasswordChanged(e)} type="password" className="form-control"/>
                            </div>
                            <ShowIf isTrue={error}>
                                <div class="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            </ShowIf>
                            <div className="text-center">
                                <LoadButton btnLoading={btnLoading} type="button" onClick={() => this.createUserAndProfile()} className="btn btn-primary sharp">Submit</LoadButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
