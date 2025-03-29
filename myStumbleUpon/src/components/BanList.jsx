import React from 'react'
import { useState } from 'react'

const BanList = ({bannedAttr, removeFromBanList}) => {
    return (
        // Ban List section
        <div className="ban-list">
            <h3>Ban List</h3>
            <p>Select an attribute in your listing to ban it</p>
            <ul>
                {/* map every banned attr to a button almost like the one that was clicked*/}
                {bannedAttr.map((attribute, index) => (
                        <li key={index}>
                            <button className="remove-button"
                                onClick={() => removeFromBanList(attribute)}>
                                {attribute}
                            </button>   
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default BanList
