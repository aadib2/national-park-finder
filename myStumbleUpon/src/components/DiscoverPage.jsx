import React from 'react'
import {useState} from 'react'

const DiscoverPage = ({onSubmit, park}) => {

    const getRandomActivity = () => {
        const activIndex = Math.floor(Math.random() * park.activities.length);
        const randomActivity = park.activities[activIndex].name;
        return randomActivity;
    }

    const getRandomTopic = () => {
        const topicIndex = Math.floor(Math.random() * park.topics.length);
        const randomTopic = park.topics[topicIndex].name;
        return randomTopic;
    }

    
    return (
        <div className="discover-body">
            <h2> Explore national parks to plan your next road trip! &#128656; ⛰️	</h2>
            <button className="discover-button" onClick={onSubmit}> 💡Discover a park!</button>

            {park && (
            <div className="park-info">
                <h2>{park.fullName}</h2>
                {/* strong indicates the enclosed text is in bold for emphasis*/}
                <p>{park.description}</p>
                <p> <strong>The attributes listed in order are: State(s), a relevant topic, and a park activity</strong></p>
                <div className="park-info-attributes">
                    <button className="attrButton">{park.states}</button>
                    <button className="attrButton">{getRandomTopic()}</button>
            
                    <button className="attrButton"> {getRandomActivity()}</button>
                </div>
                <img className="park-img" src={park.images[1].url}/>

            </div>
            )}

        </div>
    )
}

export default DiscoverPage