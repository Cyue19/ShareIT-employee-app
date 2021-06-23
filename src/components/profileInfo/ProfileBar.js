import React, { Component } from 'react'

export default class ProfileNavBar extends Component {
    render() {
        const profile = this.props.profile; 
        console.log(this.props.profile);
        console.log(this.props.user);
        return (
            <div style={{width: '90%', height: '170px', margin: 'auto', background: "linear-gradient(to bottom left, #3c817a, #19033d)"}}>
                <img src={profile.picture} alt="profile" style={{float: 'left', width: '150px', marginRight:'25px', borderRadius:'100px', position: 'relative', left: '11px', top: '11px'}} className="mb-3"/>
                <h2 style={{display: 'block', color: 'white', position: 'relative', top: '36px'}}>{profile.firstName} {profile.lastName}</h2>
                <h2 style={{display: 'block', color: 'white', position: 'relative', top: '36px'}}>{profile.job}</h2>
                {/* {
                    this.props.self ?
                        <button style={{position: 'relative', top: '36px'}} type="button" className="btn btn-primary">Edit</button>
                    :
                        null
                } */}
            </div>
        )
    }
}
