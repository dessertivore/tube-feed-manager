import React, { useState } from 'react';
import './../index.css'

function InsertForm() {
    const [data, setData] = useState({
      firstname: '',
      lastname: '',
      dob: '',
      lower_wt_goal: '',
      upper_wt_goal: '',
      nhs_no: '',
      feed: '',
      volume: '',
    });
    
      

    const handleInsertSubmit = (e) => {
      e.preventDefault();
    
      fetch('http://127.0.0.1:8000/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(dataFromServer => {
        // Handle the data received from the server
        console.log('Response from server:', dataFromServer);
        // You can update your state or perform other actions based on the server response
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    };
        
    return (
      <div>
        <br />
        <form onSubmit={handleInsertSubmit}>
         
            <input
              placeholder='NHS Number'
              type="number"
              name = "nhs_no"
              value={data.nhs_no}
              onChange={(e) => setData({ ...data, nhs_no: parseInt(e.target.value)})}
            />
          <br />
         
            <input
              placeholder='First name'
              type="string"
              name = "firstname"
              value={data.firstname}
              onChange={(e) => setData({ ...data, firstname: (e.target.value)})}          />
          <br />
      
            <input
              placeholder='Last name'
              type="string"
              name = "lastname"
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: (e.target.value)})}          />
          <br />
       
            <input
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = ''}
              placeholder='Birth date'
              name = "dob"
              value={data.dob}
              onChange={(e) => {
                setData({ ...data, dob: (e.target.value)});
              }}
            />
          <br />
       
            <input
              placeholder='Lower goal weight centile'
              type="number"
              name = "lower_wt_goal"
              value={data.lower_wt_goal}
              onChange={(e) => setData({ ...data, lower_wt_goal: parseInt(e.target.value)})}
            />
     
          <br />
        
            <input
              placeholder='Upper goal weight centile'
              type="number"
              name = "upper_wt_goal"
              value={data.upper_wt_goal}
              onChange={(e) => setData({ ...data, upper_wt_goal: parseInt(e.target.value)})}          />
          <br />

            <input
              placeholder='Feed name'
              type="str"
              name = "feed"
              value={data.feed}
              onChange={(e) => setData({ ...data, feed: (e.target.value)})}          />
  
          <br />
       
            <input
              placeholder='Feed volume'
              type="number"
              name = "volume"
              value={data.volume}
              onChange={(e) => setData({ ...data, volume: parseInt(e.target.value)})}          />
          <br />
          <button type="submit">Insert patient</button>
        </form>
      </div>
    );
  }


  const Insert= () => {
    return(
      <div className="App">
         <h3> Please input patient details to insert into database.</h3>
          <InsertForm />
        <br />
      </div>
    );
    }

export default Insert