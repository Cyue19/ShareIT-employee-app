import React, { Component } from 'react'
import pic from '../../img/default-profile.jpg'; 

export default class ProfileNavBar extends Component {
    render() {
        const profile = this.props.profile; 
        console.log(this.props.profile);
        console.log(this.props.user);
        return (
            <div className="" style={{width: '90%', height: '170px', margin: 'auto', background: "linear-gradient(to bottom left, #3c817a, #19033d)"}}>
                <img src={pic} alt="profile" style={{float: 'left', width: '150px', marginRight:'25px', borderRadius:'100px', position: 'relative', left: '11px', top: '11px'}} className="mb-3"/>
                <h2 style={{display: 'block', color: 'white', position: 'relative', top: '36px'}}>{profile.firstName} {profile.lastName}</h2>
                {
                    this.props.user.uid === this.props.profile.userId ?
                        <button style={{position: 'relative', top: '36px'}} type="button" className="btn btn-primary">Edit</button>
                    :
                        null
                }
            </div>
        )
    }
}
