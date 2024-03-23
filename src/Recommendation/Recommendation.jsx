

import React, { useState, useEffect } from "react";

function Recommendation() {
  const keywords = [
    "Technology",
    "Sports",
    "Budget",
    "Science",
    "Entertainment",
    "Fashion",
    "Food",
    "Travel",
    "Health",
    "Fitness",
    "Art",
    "Music",
    "Books",
    "Movies",
    "Gaming",
    "Business",
    "Politics",
    "Education",
    "Environment",
    "Pets",
    "Home",
    "DIY",
    "Crafts",
    "Cars",
    "Photography",
    "Beauty",
    "Lifestyle",
    "Spirituality",
    "History",
    "Parenting",
  ];

  // Initialize selectedKeywords state with values from localStorage or default to all false
  const [selectedKeywords, setSelectedKeywords] = useState(() => {
    const storedKeywords = JSON.parse(localStorage.getItem("selectedKeywords"));
    return storedKeywords || Array(keywords.length).fill(false);
  });

  // Update localStorage whenever selectedKeywords changes
  useEffect(() => {
    localStorage.setItem("selectedKeywords", JSON.stringify(selectedKeywords));
  }, [selectedKeywords]);

  const toggleKeyword = (index) => {
    const updatedKeywords = [...selectedKeywords];
    updatedKeywords[index] = !updatedKeywords[index];
    setSelectedKeywords(updatedKeywords);
  };

  return (
    <div className="bg-slate-200 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Select your Preferences
        </h1>

        <div className="flex flex-wrap gap-4 justify-center">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              onClick={() => toggleKeyword(index)}
              className={`flex items-center justify-center bg-blue-200 rounded-[1.6rem] p-4 text-lg  cursor-pointer hover:scale-110 ${
                selectedKeywords[index] ? "border-green-500 border-4" : ""
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
      </div>
    </div>
  );
}

export default Recommendation;
