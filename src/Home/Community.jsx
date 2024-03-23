import React, { useState, useEffect } from 'react';
import api from '../Api/Api';
import { useNavigate } from "react-router-dom";

const Community = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0]); // Initialize ratings for 5 stars
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentFeedback();
  }, []);

  const fetchRecentFeedback = async () => {
    try {
      const recentFeedback = await api.getRecentFeedback();
      setFeedbackList(recentFeedback);
    } catch (error) {
      console.error('Error fetching recent feedback:', error);
      // Handle error appropriately
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitFeedback(feedbackText);
      setFeedbackList(prevFeedbackList => [...prevFeedbackList, feedbackText]);
      
      // Optionally, you can calculate the rating based on feedback here
      // For demonstration, we're assuming a fixed rating of 5 for now
      const newRatings = [...ratings];
      newRatings[4] += 1; // Incrementing 5-star rating
      setRatings(newRatings);
      
      setFeedbackText('');
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Community Feedback</h1>

      {/* Feedback Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Provide Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-700 font-semibold mb-2">Your Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Feedback</button>
        </form>
      </div>

      {/* Ratings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Rating</h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <svg key={index} className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
          ))}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
        {[5, 4, 3, 2, 1].map((starRating, index) => (
          <div key={index} className="flex items-center mt-4">
            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">{starRating} star</a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div className="h-5 bg-yellow-300 rounded" style={{ width: `${(ratings[starRating - 1] / 1745) * 100}%` }}></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{((ratings[starRating - 1] / 1745) * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
        <div className="space-y-4">
          {feedbackList.map((feedback, index) => (
            <div key={index} className="border p-4 rounded-md">
              <p className="text-gray-700">{`"${feedback}"`}</p>
              <p className="text-sm text-gray-500">- Anonymous</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
