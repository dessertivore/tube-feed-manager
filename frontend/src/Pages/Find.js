import React, { useState } from 'react';
import './../index.css'

function MyForm() {
    const [data, setData] = useState({
      NHS_no: '',
    });
  
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
    const [lowergoalcentile, setLowergoalcentile] = useState('');
    const [uppergoalcentile, setUppergoalcentile] = useState('');
  
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/' +data.NHS_no) 
        
        if (response.ok) {
          const responseData = await response.json();
          setFirstname(responseData['firstname']);
          setLastname(responseData['lastname']);
          setDob(responseData['dob']);
          setLowergoalcentile(responseData['lowergoalcentile']);
          setUppergoalcentile(responseData['uppergoalcentile'])
        } else {
          console.error('Failed to fetch data from the server.');
          const responseData = await response.json();
          setFirstname(responseData['detail']);
          setLastname('');
          setDob('');
          setLowergoalcentile('');
          setUppergoalcentile('');
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
    
      
        {data ? (
          <div>
            {firstname !== 0 && lastname!== 0 && dob!== 0 && lowergoalcentile!== 0 && uppergoalcentile!== 0 ? (
              <div>
                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>
                <p>Date of Birth: {dob}</p>
                <p>Lower Weight Goal Centile: {lowergoalcentile}</p>
                <p>Upper Weight Goal Centile: {uppergoalcentile}</p>
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        ) : null}
      </div>
    );
  }

const Find= () => {
    return(
      <div className="App">
            Please input an NHS number to load a patient.
          
          <MyForm />
          <br />
        <br />
        

      </div>
    );
    }
  
export default Find;