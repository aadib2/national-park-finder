import { useState } from 'react'
import './App.css'
import './components/DiscoverPage.jsx'
import DiscoverPage from './components/DiscoverPage.jsx'
import BanList from './components/BanList.jsx'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [park, setPark] = useState(null)
 // will retrieve random national parks through NPS API
 // gives us a bunch of data abt park --> attributes displayed from json: state, park designation/type, activities offered

 const submitButton = async () => {
    const query = makeQuery();
    await callAPI(query);
 }

 const makeQuery = () => {
  // define a list of park codes for random selection
  const parkCodes = ["acad", "yell", "grca", "zion", "glac", "ever", "dena", "olym", "romo", "shen"];

  // get a random park code
  const randomIndex = Math.floor(Math.random() * parkCodes.length);
  const randomParkCode = parkCodes[randomIndex];

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
    console.log(data)

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
      <DiscoverPage onSubmit={submitButton} park={park}/>
      <BanList/>
    </div>
      
  </>
  )
}

export default App
