import React, { useState } from 'react';
import './../index.css'
import LineChart from '../acquisitions';

/**
 * MyForm component that handles user input, fetches data, and displays patient information.
 * @component
 * @returns {JSX.Element} MyForm component.
 */

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

     /**
     * Deletes the user with the specified NHS number.
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves when the deletion is complete.
     */

    const deleteUser = async () => {
      console.log('Button clicked!');
      try{
        await fetch('http://127.0.0.1:8000/user?nhs='+data.NHS_no, { method: 'DELETE' })
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    /**
     * Fetches user data from the server based on the NHS number provided.
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves when the data is fetched.
     */

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
          // make patient info and delete button visible
          document.getElementById('FindApp').style.display = "block";


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
          setFeedvolume(responseData['']);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    /**
     * Handles changes in the NHS number input field.
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */

    const handleChange = (e) => setData({...data, NHS_no: parseInt(e.target.value)});
    
    /**
     * Handles the form submission to fetch data based on the provided NHS number.
     * @function
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSearchSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission
      fetchData(); // Call the fetchData function to send data to the API
    };
  
  
    return (
      <div>
        <br />
        <h3>Please input an NHS number to load a patient.</h3>
        <form onSubmit={handleSearchSubmit}>
            <input
              label = "NHS Number"
              inputStyle="box" 
              labelStyle="stacked"
              placeholder="NHS Number"
              type="number"
              value={data.NHS_no}
              onChange={handleChange}
            />
          <button type="submit">Find patient</button>
        </form>
        <br />
          
        {data ? (
          <div id='FindApp' class ="hidden">
            {firstname !== 0 && lastname!== 0 && dob!== 0 && lowergoalcentile!== 0 && uppergoalcentile!== 0 ? (
              <div>
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
                <button id = 'deletebutton'  onClick = {deleteUser}>Delete user</button>
                <br></br>
                <br></br>
                <h2>Centile chart</h2>
                <div id = "chart">
                  <div><canvas id="acquisitions"></canvas></div>
                  <LineChart reviewed={reviewedgraph} allcentiles={allcentilesgraph} upper={uppergoalcentile} lower = {lowergoalcentile} />
              </div>
              </div>
            ) : (
              <p>No data...</p>
            )}
          </div>
        ) : null}
         
      </div>
    );
  }

/**
 * Find component: serves as the main page for searching and displaying patient information.
 * @component
 * @returns {JSX.Element} Find component.
 */

const Find= () => {
    return(
      <div className="App">
        <MyForm />
        <br />
      </div>
    );
    }
  
export default Find;