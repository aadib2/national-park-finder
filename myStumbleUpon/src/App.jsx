import { useState } from 'react'
import './App.css'
import './components/DiscoverPage.jsx'
import DiscoverPage from './components/DiscoverPage.jsx'
import BanList from './components/BanList.jsx'
import {parkCodes} from './assets/parkInfo.js'
import {parkStateMap} from './assets/parkInfo.js'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  // will retrieve random national parks through NPS API
 // gives us a bunch of data abt park --> attributes displayed from json: state, park designation/type, activities offered
  const [park, setPark] = useState(null)

  const [bannedAttributes, setBannedAttributes] = useState([]);
  
  const addToBannedList = (attribute) => {
    if(!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  }

  const removeFromBannedList = (attribute) => {
    setBannedAttributes(bannedAttributes.filter((item) => item !== attribute));
  }

 const submitButton = async () => {
    const query = makeQuery();
    await callAPI(query);

 }

 const getStateFromCode = (code) => {
  const statesForParks = parkStateMap;

  return statesForParks[code] || null; // Return the state or null if the code is not found
}


 const makeQuery = () => {
  // define a list of park codes for random selection (for more thorough version, create separate file with all park codes)
  const codes = parkCodes;

  // filter out park codes based on banned attributes (in this case only states)
  // use js filter method which uses callback function --> must return true for element to stay in array
  const filteredCodes = codes.filter((code) => {
      const state = getStateFromCode(code);
      if(bannedAttributes.includes(state)) {
        // if the state is one of the banned states then remove this park from the list
        return false;
      }
      return true;

  })
  
  // get a random park code
  if(filteredCodes.length == 0) {
    alert("There are no parks available based on those filters!");
    return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredCodes.length);
  const randomParkCode = filteredCodes[randomIndex];

  // comprised of resource endpoint + query parameters
  const query = `https://developer.nps.gov/api/v1/parks?parkCode=${randomParkCode}&api_key=${ACCESS_KEY}`;

  return query;
 }

// **integrate API here
const callAPI = async(query) => {
  const response = await fetch(query);
  console.log("Response:", response)
  if(!response.ok) {
    alert(`HTTP error! status: ${response.status}`);
  }
  else {
    const data = await response.json()
    // parse the park data from the json
    const parkData = data.data[0];
    console.log("Parsed Park Data:", parkData);

    setPark(parkData);
  }
}

return (
  <>
    <div className = "header">
      <h1> National Park Finder! &#127757; &#9978;</h1>
      <h3> This webpage is inspired by StumbleUpon and allows uswers to discover information about various National Parks throughout the United States!</h3>
    </div>
    <div className="app-container">
      <DiscoverPage onSubmit={submitButton} park={park} addToBanList={addToBannedList}/>
      <BanList bannedAttr={bannedAttributes} removeFromBanList={removeFromBannedList}/>
    </div>
      
  </>
  )
}

export default App
