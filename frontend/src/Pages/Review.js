import React, { useState } from 'react';
import './../index.css'

/**
 * Component for rendering a form to submit a review.
 *
 * @component
 * @returns {JSX.Element} - Returns a form to submit a review.
 */
function ReviewForm() {
    const [data, setData] = useState({
      nhs_no: '',
      review_date: '',
      weight_centile: '',
      feed_name: '',
      feed_volume: '',
    });

    const [outcomeMessage, setOutcomeMessage] = useState(''); //initialise output message

  
    /**
     * Handles the form submission.
     *
     * @param {Object} e - The form submission event.
     */
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
        setOutcomeMessage('Review successfully added!');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setOutcomeMessage('Failed to create review. Please try again.');
      });
    };

        
    return (
      <div>
        <br />
        <form onSubmit={handleInsertSubmit}>
            <input
              type="number"
              placeholder = "NHS Number"
              name = "nhs_no"
              value={data.nhs_no}
              onChange={(e) => setData({ ...data, nhs_no: parseInt(e.target.value)})}
            />
            <br />
           
            <input
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = ''}
              placeholder='Review date'
              name = "review_date"
              value={data.review_date}
              onChange={(e) => {
                setData({ ...data, review_date: (e.target.value)});
              }}        
            />
        
            <br />
         
            <input
              placeholder = "Weight centile"
              type="number"
              name = "weight_centile"
              value={data.centile}
              onChange={(e) => setData({ ...data, weight_centile: parseInt(e.target.value)})}          />
    
            <br />
       
            <input
              placeholder='Feed name'
              type="string"
              name = "feed_name"
              value={data.feed_name}
              onChange={(e) => setData({ ...data, feed_name: (e.target.value)})}
            />
      
            <br />

            <input
              placeholder='Feed volume'
              type="number"
              name = "feed_volume"
              value={data.feed_volume}
              onChange={(e) => setData({ ...data, feed_volume: parseInt(e.target.value)})}
            />
            <br />
          <button type="submit">Add review</button>
        </form>
        {outcomeMessage && <p style={{ fontWeight: "bolder" }}>{outcomeMessage}</p>}

      </div>
    );
  }

/**
 * Component for rendering the Review section.
 *
 * @component
 * @returns {JSX.Element} - Returns the review section with a form to submit reviews.
 */
const Review= () => {
    return(
      <div className="App">
          <h3>Please input details of review.</h3>
          <ReviewForm />
      </div>
    );
    }

export default Review