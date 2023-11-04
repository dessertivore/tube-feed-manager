import React, { useState } from 'react';

function MyForm() {
  const [data, setData] = useState({
    NHS_no: '',
  });

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState('');
  const [goalcentile, setGoalcentile] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/' +data.NHS_no) 
    
      if (response.ok) {
        const responseData = await response.json();
        setFirstname(responseData['firstname']);
        setLastname(responseData['lastname']);
        setDob(responseData['dob']);
        setGoalcentile(responseData['goalcentile']);
      } else {
        console.error('Failed to fetch data from the server.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => setData({...data, NHS_no: parseInt(e.target.value)});

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    fetchData(); // Call the fetchData function to send data to the API
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          NHS number:
          <input
            type="number"
            value={data.NHS_no}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Find patient</button>
      </form>
      {data ? (
        <div>
          {firstname !== 0 && lastname!== 0 && dob!== 0 && goalcentile!== 0 ? (
            <div>
              <p>First Name: {firstname}</p>
              <p>Last Name: {lastname}</p>
              <p>Date of Birth: {dob}</p>
              <p>Weight Goal: {goalcentile}</p>
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to my tube feed managing software. Please input an NHS number to load a patient or input a new patient to the database.
        </p>
        
        <MyForm />
      </header>
      <br />
      <body>
      <p>Made by Sophie Landau</p>
      </body>
    </div>
  );
}

export default App;