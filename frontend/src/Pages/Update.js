import React, { useState } from 'react';
import './../index.css'

function UpdateForm() {
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

    const [nhs_no, setNHS] = useState({});
    
      

    const handleUpdateSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission ie page refreshing
      fetch('http://127.0.0.1:8000/user/'+nhs_no,{
      method: 'PUT', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  })}
        
    return (
      <div>
        <br />
        <form onSubmit={handleUpdateSubmit}>
          <label>
            NHS number:  
            <input
              type="number"
              name = "nhs_no"
              value={nhs_no.nhs_no}
              onChange={(e) => setNHS({ ...data, nhs_no: parseInt(e.target.value)})}
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
          <label>
            Feed name:  
            <input
              type="str"
              name = "feed"
              value={data.feed}
              onChange={(e) => setData({ ...data, feed: (e.target.value)})}          />
          </label>
          <br />
          <label>
            Feed volume:  
            <input
              type="number"
              name = "volume"
              value={data.volume}
              onChange={(e) => setData({ ...data, volume: parseInt(e.target.value)})}          />
          </label>
          <br />
          <button type="submit">Update patient</button>
        </form>
      </div>
    );
  }


  const Update= () => {
    return(
      <div className="App">
          Please input patient details to update the database.
          <UpdateForm />
        <br />
        
      </div>
    );
    }

export default Update