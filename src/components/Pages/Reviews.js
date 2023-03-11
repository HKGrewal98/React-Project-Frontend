import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReviewsForm from '../Reviews/ReviewForm';
import ShowReview from '../Reviews/ShowReview';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch('http://localhost:8080/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  };
  // alert 
  const handleReviewSubmit = () => {
    fetchReviews(); 
    alert('Review stored successfully.');
  };

  return (
    <div style={{ color: 'red', marginTop: '100px' }}>
      <div className="container">
        <div className="form-section">
          <ReviewsForm onSubmit={handleReviewSubmit} />
        </div>
        <div className="data-section">
          <ShowReview reviews={reviews} />
        </div>
      </div>
      <Link to="/ottomonMenu">Main Page</Link>
    </div>
  );
}
