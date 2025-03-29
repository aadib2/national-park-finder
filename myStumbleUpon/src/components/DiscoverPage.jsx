import React from 'react'
import {useState} from 'react'
import { useEffect } from 'react';

const DiscoverPage = ({ onSubmit, park, addToBanList }) => {
    // create state variables for the random attributes we generate each time a park is "discovered"
    const [randomTopic, setRandomTopic] = useState('');
    const [randomActivity, setRandomActivity] = useState('');

    // useEffect allows us to only update attributes when discover is pressed
    useEffect(() => {
        if (park) {
            //get random topic and activity
            const topicIndex = Math.floor(Math.random() * park.topics.length);
            setRandomTopic(park.topics[topicIndex]?.name || '');

            const activityIndex = Math.floor(Math.random() * park.activities.length);
            setRandomActivity(park.activities[activityIndex]?.name || '');
        }
    }, [park]); // Run this effect only when the `park` changes

    return (
        <div className="discover-body">
            <h2> Explore national parks to plan your next road trip! &#128656; ⛰️ </h2>
            <button className="discover-button" onClick={onSubmit}> 💡Discover a park!</button>

            {park && (
                <div className="park-info">
                    <h2>{park.fullName}</h2>
                    <p>{park.description}</p>
                    <p>
                        <strong>The attributes listed in order are: State(s), a relevant topic, and a park activity</strong>
                    </p>
                    {/* For SIMPLICITY, will only be able to add states to ban list */}
                    <div className="park-info-attributes">
                        <button className="attrButton" onClick={() => addToBanList(park.states)} >{park.states}</button>
                        <button className="attrButton" >
                            {randomTopic}
                        </button>
                        <button className="attrButton" >
                            {randomActivity}
                        </button>
                    </div>
                    <img className="park-img" src={park.images[1]?.url} alt="Park" />
                </div>
            )}
        </div>
    );
};

export default DiscoverPage