import React, { useState, useEffect } from 'react';
import api from '../Api/Api';
import { useNavigate } from "react-router-dom";
import { Rating, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import Loader from '../Loader/Spinner';

const Community = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0]); // Initialize ratings for 5 stars
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentFeedback();
  }, []);
  const [value, setValue] = React.useState(4);

  const fetchRecentFeedback = async () => {
    try {
      const recentFeedback = await api.getRecentFeedback();
      setFeedbackList(recentFeedback);
    } catch (error) {
      console.error('Error fetching recent feedback:', error);
      // Handle error appropriately
    }
  };

  const [loader, setLoader] = useState(false)
  const [info, setInfo] = useState(false)

  useEffect(() => {
    setLoader(true)
    api.get('/all-feedback').then((res) => {
      setInfo(res.data)
      setLoader(false)
    })
      .catch(err => {
        console.log(err.message);
        setLoader(false)
      })
  }, [])

  const handleSubmit = async (e) => {
    setLoader(true)
    const userInsession = sessionStorage.getItem('_id')
    const _id = JSON.parse(userInsession)
    e.preventDefault();
    try {
      // Create an object containing rating and feedback text
      const feedbackData = {
        rating: value,
        feedbackText: feedbackText,
        _id
      };

      api.post('/feedback', { feedbackData }).then((res) => {
        setInfo(res.data)
        setLoader(false)
        toast.success('Done..👍')
        setFeedbackText('');
        // navigate('/thank-you');

      })
        .catch((err) => {

          setLoader(false)
          toast.error(err.message)
        })




    } catch (error) {
      setLoader(false)
      console.error('Error submitting feedback:', error);
      // Handle error appropriately
    }
  };



  function parseCreatedAt(createdAt) {
    // Parse the createdAt string into a Date object
    const createdAtDate = new Date(createdAt);

    // Extract day, month, and year
    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
    const year = createdAtDate.getFullYear();

    // Create an object to hold the parsed components
    const parsedData = {
      day,
      month,
      year,
    };

    return parsedData;
  }

  return (
    <>
      {
        loader ? <Loader message={"submitting feedback..."} /> : <div className="container mx-auto px-4 py-8">
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
            <Typography component="legend">Controlled</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
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
            <div className="space-y-4  ">
              {info.length && info.map((feedback, index) => (
                <div key={index} className="border p-4 rounded-md flex gap-4">
                  <p className="text-gray-700">{`"${feedback.name}"`}</p>
                  <Rating
                    name="simple-controlled"
                    value={feedback.rating}
                  />
                  <p>{`${parseCreatedAt(feedback.createdAt).day}/${parseCreatedAt(feedback.createdAt).month}/${parseCreatedAt(feedback.createdAt).year}`}</p>

                  <p>---</p>
                  <p>{feedback.feedbackText}</p>

                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Community;
