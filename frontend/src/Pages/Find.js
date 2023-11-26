import React, { useState } from 'react';
import './../index.css'
import LineChart from '../acquisitions';

function MyForm() {
    const [data, setData] = useState({
      NHS_no: '',
    });

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
    const [lowergoalcentile, setLowergoalcentile] = useState('');
    const [uppergoalcentile, setUppergoalcentile] = useState('');
    const [weightcentile, setWeightcentile] = useState('');
    const [allcentiles, setAllcentiles] = useState('');
    const [reviewed, setReviewed] = useState('');
    const [feed_name, setFeedname] = useState('');
    const [feed_volume, setFeedvolume] = useState('');
    const [age, setAge] = useState('');
    const [reviewedSinceChange, setReviewedSinceChange] = useState('');
    const [reviewedgraph, setReviewedGraph] = useState('');
    const [allcentilesgraph, setAllcentilesGraph] = useState('');

    const deleteUser = async () => {
      console.log('Button clicked!');
      try{
        await fetch('http://127.0.0.1:8000/user?nhs='+data.NHS_no, { method: 'DELETE' })
        
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/' +data.NHS_no) 
        
        if (response.ok) {
          const responseData = await response.json();
          setFirstname(responseData['firstname']);
          setLastname(responseData['lastname']);
          setDob(responseData['dob']);
          setAge(responseData['age']);
          setLowergoalcentile(responseData['lowergoalcentile']);
          setUppergoalcentile(responseData['uppergoalcentile']);
          setWeightcentile(responseData['weightcentile']);
          setAllcentiles(responseData['allcentiles'].join(", "));
          setAllcentilesGraph(responseData['allcentiles'])
          setReviewed(responseData['reviewed'].join(", "));
          setReviewedSinceChange(responseData['review_since_change']);
          setReviewedGraph(responseData['reviewed'])
          setFeedname(responseData['feed_name']);
          setFeedvolume(responseData['feed_volume'])
          // make delete button visible
          document.getElementById("deletebutton").style.visibility = "visible";
          document.getElementById("chart").style.visibility = "visible";

        } else {
          console.error('Failed to fetch data from the server.');
          const responseData = await response.json();
          setFirstname(responseData['detail']);
          setLastname('');
          setDob('');
          setLowergoalcentile('');
          setUppergoalcentile('');
          setWeightcentile(responseData['']);
          setAllcentiles(responseData['']);
          setReviewed(responseData['']);
          setFeedname(responseData['']);
          setFeedvolume(responseData[''])
          document.getElementById("deletebutton").style.visibility = "hidden";

        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const handleChange = (e) => setData({...data, NHS_no: parseInt(e.target.value)});
  
    const handleSearchSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission
      fetchData(); // Call the fetchData function to send data to the API
    };
  
  
    return (
      <div>
        <br />
        <form onSubmit={handleSearchSubmit}>
          <label>
            NHS number:  
            <input
              type="number"
              value={data.NHS_no}
              onChange={handleChange}
            />
          </label>
          
          <button type="submit">Find patient</button>
        </form>
        <br />
          
      
        {data ? (
          <div id='FindApp'>
            {firstname !== 0 && lastname!== 0 && dob!== 0 && lowergoalcentile!== 0 && uppergoalcentile!== 0 ? (
              <div >
                <br />First Name: {firstname}
   
                <br />Last Name: {lastname}
                <br />Date of Birth: {dob}
                <br />Age: {age}
                <br />Lower Weight Goal Centile: {lowergoalcentile}
                <br />Upper Weight Goal Centile: {uppergoalcentile}
                <br />Current weight centile: {weightcentile}
                <br />Centile history: {allcentiles}
                <br />Review dates: {reviewed}
                <br />Reviewed since nutritional requirements changed?: {reviewedSinceChange}
                <br />Feed: {feed_name}
                <br />Feed volume: {feed_volume}
                
              </div>
            ) : (
              <p>Loading data...</p>
         
            )}
          </div>
        ) : null}
         <button id = 'deletebutton' class = "hidden" onClick = {deleteUser}>Delete user</button>
              <div id = "chart" class ="hidden">
              <br></br>
              <br></br>
                <h2>Centile chart</h2>
                <div><canvas id="acquisitions"></canvas></div>
                <LineChart reviewed={reviewedgraph} allcentiles={allcentilesgraph} upper={uppergoalcentile} lower = {lowergoalcentile} />
              </div>
      </div>
    );
  }

const Find= () => {
    return(
      <div className="App">
            <h3>Please input an NHS number to load a patient.</h3>
          
          <MyForm />
          <br />
        <br />
        

      </div>
    );
    }
  
export default Find;