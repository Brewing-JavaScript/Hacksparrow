import React, { useState, useEffect } from "react";
import api from '../Api/Api';
import { useNavigate } from "react-router-dom";

function Recommendation({ userId }) {
  const keywords = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];
  const [cats, setCats] = useState([])

  useEffect(() => {
    getCats()
  }, [])

  const getCats = () => {
    const userInSession = sessionStorage.getItem('_id');
    const _id = JSON.parse(userInSession);
    try {
      api.post('/get-cats', { _id }).then((res) => {
        setCats(res.data)
        setSelectedKeywords(res.data)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const [selectedKeywords, setSelectedKeywords] = useState(Array(keywords.length).fill(false));

  const toggleKeyword = (index) => {
    const updatedKeywords = [...selectedKeywords];
    updatedKeywords[index] = !updatedKeywords[index];
    setSelectedKeywords(updatedKeywords);
  };

  const updateCategories = async () => {
    const selectedCategories = keywords.filter((_, idx) => selectedKeywords[idx]);
    const userInSession = sessionStorage.getItem('_id');
    const _id = JSON.parse(userInSession);

    try {
      await api.post('/update-cats', { cats: selectedCategories, _id });
      console.log("Categories updated successfully");
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  const navigate = useNavigate()

  const handleSaveCategories = () => {
    updateCategories();
    navigate('/')
  };

  return (
    <div className=" min-h-screen py-8 " style={{background: "rgb(12, 12, 12)"}}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          {cats ? "Your Preferences" : "Select Your Preferences"}
        </h1>

        <div className="flex flex-wrap gap-4 justify-center">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              onClick={() => toggleKeyword(index)}
              className={`flex items-center justify-center bg-blue-200 rounded-[1.6rem] p-4 text-lg cursor-pointer ${selectedKeywords[index] ? "border-green-500 border-4" : ""
                }`}
            >
              {keyword}
              {selectedKeywords[index] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button onClick={handleSaveCategories} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            {cats ? "Return to Home" : "Save Preferences"}
          </button>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="bg-[#E2E8F0] py-8 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Choose Your Preferences?</h2>
          <p className="text-lg text-center text-gray-700">
            Selecting your preferences helps us tailor content specifically for you. Get personalized recommendations and stay updated with the latest news and topics that matter to you the most.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
