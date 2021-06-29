import React,{useState} from 'react'
import './Card.css'

function Card({name,job,manager}) {


    return (
        <div className= 'Card'>
            <div className= 'upper-container' align='center'>
                <div className= 'image-container'>
                    <img src="./image/img1.jpg" alt='Employee1image' height="100px" width="100px" />
                </div>
            </div>
            <div className="lower-container" align='center'>
                <h3> { name }</h3>
                <h4> { job }</h4>
                <h5> { manager }</h5>
                <button> View Profile</button>

            </div>

            

            
        </div>

        
    )
}

export default Card
