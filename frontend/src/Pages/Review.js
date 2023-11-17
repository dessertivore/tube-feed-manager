import React, { useState } from 'react';
import './../index.css'

function ReviewForm() {
    const [data, setData] = useState({
      nhs_no: '',
      reviewdate: '',
      centile: '',
      feed_name: '',
      feed_volume: '',
    });
  
  
    const handleInsertSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission ie page refreshing
      fetch('http://127.0.0.1:8000/Review',{
      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.nhs_no, data.reviewdate, data.weightcentile)
  })
  fetch('http://127.0.0.1:8000/Feed',{
    method: 'POST', 
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.nhs_no, data.feed_name, data.feed_volume)
})
}
        
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
              name = "reviewdate"
              value={data.reviewdate}
              onChange={(e) => setData({ ...data, reviewdate: (e.target.value)})}          />
          </label>
          <br />
          <label>
            Weight centile:  
            <input
              type="integer"
              name = "weightcentile"
              value={data.weightcentile}
              onChange={(e) => setData({ ...data, weightcentile: (e.target.value)})}          />
          </label>
          <br />
          <label>
            Feed name:  
            <input
              type="string"
              name = "feedname"
              value={data.feed_name}
              onChange={(e) => setData({ ...data, feed_name: (e.target.value)})}
            />
          </label>
          <br />
          <label>
            Feed volume:  
            <input
              type="number"
              name = "feedvolume"
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
          Please input details of review.
          <ReviewForm />
        <br />
        
      </div>
    );
    }

export default Review