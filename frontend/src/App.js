import React, { useState } from 'react';
import './index.css'

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

function InsertForm() {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    lower_wt_goal: '',
    upper_wt_goal: '',
    nhs_no: ''
  });


  const handleInsertSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission ie page refreshing
    fetch('http://127.0.0.1:8000/insertuser',{
    method: 'POST', 
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})}
      
  return (
    <div>
      <br />
      <form onSubmit={handleInsertSubmit}>
        <label>
          NHS number:  
          <input
            type="number"
            name = "nhs_no"
            value={data.nhs_no}
            onChange={(e) => setData({ ...data, nhs_no: parseInt(e.target.value)})}
          />
        </label>
        <br />
        <label>
          First name:  
          <input
            type="string"
            name = "firstname"
            value={data.firstname}
            onChange={(e) => setData({ ...data, firstname: (e.target.value)})}          />
        </label>
        <br />
        <label>
          Last name:  
          <input
            type="string"
            name = "lastname"
            value={data.lastname}
            onChange={(e) => setData({ ...data, lastname: (e.target.value)})}          />
        </label>
        <br />
        <label>
          Date of birth:  
          <input
            type="date"
            name = "dob"
            value={data.dob}
            onChange={(e) => setData({ ...data, dob: (e.target.value)})}
          />
        </label>
        <br />
        <label>
          Lower goal weight centile:  
          <input
            type="number"
            name = "lower_wt_goal"
            value={data.lower_wt_goal}
            onChange={(e) => setData({ ...data, lower_wt_goal: parseInt(e.target.value)})}
          />
        </label>
        <br />
        <label>
          Upper goal weight centile:  
          <input
            type="number"
            name = "upper_wt_goal"
            value={data.upper_wt_goal}
            onChange={(e) => setData({ ...data, upper_wt_goal: parseInt(e.target.value)})}          />
        </label>
        <br />
        <button type="submit">Insert patient</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        Tube feed manager
      </h1>
          Welcome to my tube feed managing software. Please input an NHS number to load a patient or input a new patient to the database.
        
        <MyForm />
        <br />

        <h2>Insert patient using the form below</h2>
        <InsertForm />
      <br />
      
      <footer>
        Made by Sophie Landau 
      </footer>
    </div>
  );
}

export default App;