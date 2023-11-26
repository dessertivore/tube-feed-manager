import React, { useState } from 'react';
import './../index.css'

function ReviewForm() {
    const [data, setData] = useState({
      nhs_no: '',
      review_date: '',
      weight_centile: '',
      feed_name: '',
      feed_volume: '',
    });
  
  
    const handleInsertSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission ie page refreshing
      fetch('http://127.0.0.1:8000/review',{
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
            Review date:  
            <input
              type="date"
              name = "review_date"
              value={data.review_date}
              onChange={(e) => setData({ ...data, review_date: (e.target.value)})}          />
          </label>
          <br />
          <label>
            Weight centile:  
            <input
              type="number"
              name = "weight_centile"
              value={data.centile}
              onChange={(e) => setData({ ...data, weight_centile: parseInt(e.target.value)})}          />
          </label>
          <br />
          <label>
            Feed name:  
            <input
              type="string"
              name = "feed_name"
              value={data.feed_name}
              onChange={(e) => setData({ ...data, feed_name: (e.target.value)})}
            />
          </label>
          <br />
          <label>
            Feed volume:  
            <input
              type="number"
              name = "feed_volume"
              value={data.feed_volume}
              onChange={(e) => setData({ ...data, feed_volume: parseInt(e.target.value)})}
            />
          </label>
    
          <button type="submit">Add review</button>
        </form>
      </div>
    );
  }


const Review= () => {
    return(
      <div className="App">
          <h3>Please input details of review.</h3>
          <ReviewForm />
        <br />
        
      </div>
    );
    }

export default Review