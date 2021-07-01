import React, { Component } from 'react';
import ShowIf from "../ShowIf";
import PictureEditModal from "./modals/PictureEditModal";

export default class ProfileNavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {isHover: false}
    }

    hover() {
        this.setState({
            isHover: true
        });
    }

    unhover() {
        this.setState({
            isHover: false
        });
    }

    render() {
        const profile = this.props.profile; 
        const {isHover} = this.state;
        return (
            <div style={{width: '90%', height: '170px', margin: 'auto', background: "linear-gradient(to bottom left, #3c817a, #19033d)", position: "relative"}}>
                <img onMouseEnter={() => this.hover()} onMouseLeave={() => this.unhover()} src={profile.picture} alt="profile" style={{float: 'left', width: '150px', height: "150px", marginRight:'25px', borderRadius:'100px', position: 'relative', left: '11px', top: '11px'}} className="mb-3"/>
                <ShowIf isTrue={this.props.self || profile.permissions==="admin" || profile.permissions==="HR"} >
                <button onMouseEnter={() => this.hover()} className="btn btn-primary" style={{position: "absolute", left: "61px", top: "45%", display: isHover ? "block" : "none"}} data-bs-toggle="modal" data-bs-target="#pictureModal">Edit</button>
                </ShowIf>
                <h2 style={{display: 'block', color: 'white', position: 'relative', top: '36px'}}>{profile.firstName} {profile.lastName}</h2>
                <h2 style={{display: 'block', color: 'white', position: 'relative', top: '36px'}}>{profile.job}</h2>

                <PictureEditModal profile={profile} update={(profile) => this.props.update(profile)} />
            </div>
        )
    }
}
