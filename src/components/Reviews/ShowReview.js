import React, { useState, useEffect } from 'react';
import './Reviews.css'; // import CSS file

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);

  // counting each rating
  const ratingsCount = reviews.reduce((count, review) => {
    const rating = review.rating;
    return {
      ...count,
      [rating]: (count[rating] || 0) + 1,
    };
  }, {});
  //counting reviews by each reviewer
  const reviewersCount = reviews.reduce((count, review) => {
    const user = review.name;
    return {
      ...count,
      [user]: (count[user] || 0) + 1,
    };
  }, {});
  //ratings table
  const ratingsTableRows = Object.keys(ratingsCount).map(rating => (
    <tr key={rating}>
      <td>{rating}</td>
      <td>{ratingsCount[rating]}</td>
    </tr>
  ));

  useEffect(() => {
    fetch('http://localhost:8080/reviews')
      .then((res) => res.json())
      .then((data) =>
        setReviews(data)
      )
      .catch((err) => console.error(err));
  }, []);
  

  return (
    <div className="form-section">
      <h3>Reviews : </h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.name}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.message}</p>
          </li>
        ))}
      </ul>
      <h3>Ratings Count :</h3>
      <table>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {ratingsTableRows}
        </tbody>
      </table>
    </div>
  );
}

export default ShowReview;
