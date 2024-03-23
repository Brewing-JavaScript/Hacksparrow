import React, { useState, useEffect, useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { UiContext, catContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../Api/Api';

const Nav = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { setUi } = useContext(UiContext);
  const { setCat } = useContext(catContext);
  const storedThemeSettings = JSON.parse(
    sessionStorage.getItem("themeSettings")
  );

  const [selectedCategory, setSelectedCategory] = useState("general");
  const [themeSettings, setThemeSettings] = useState(
    storedThemeSettings || {
      backgroundColor: "#3F83F8",
      textColor: "#000000",
      fontSizes: {
        h1: 24,
        h2: 20,
        p: 16,
      },
    }
  );

  function darkenColor(hexColor) {
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    const darkerRed = Math.max(0, red - 40);
    const darkerGreen = Math.max(0, green - 40);
    const darkerBlue = Math.max(0, blue - 40);

    const darkerHexColor = `#${darkerRed
      .toString(16)
      .padStart(2, "0")}${darkerGreen.toString(16).padStart(2, "0")}${darkerBlue
      .toString(16)
      .padStart(2, "0")}`;

    return darkerHexColor;
  }

  const handleBackgroundColorChange = (color) => {
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      backgroundColor: color,
    }));
  };

  const handleTextColorChange = (color) => {
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      textColor: color,
    }));
  };

  const handleFontSizeChange = (category, newSize) => {
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      fontSizes: {
        ...prevSettings.fontSizes,
        [category]: newSize,
      },
    }));
  };

    useEffect(() => {
        getCats(); // Always fetch cats when component mounts or themeSettings/setUi change
        sessionStorage.setItem('themeSettings', JSON.stringify(themeSettings));
        setUi(themeSettings);
    }, [themeSettings, setUi]); // Include setUi as a dependency if it affects cats fetching
    

    const navigate = useNavigate()

    const hanleSignOut = () => {
        sessionStorage.clear()
        navigate('/auth')

    }

    const getCats = () => {
        const userInSession = sessionStorage.getItem('_id');
        const _id = JSON.parse(userInSession);
        try {
            api.post('/get-cats', { _id }).then((res) => {
                setCats(res.data)
            })
        } catch (error) {

            console.log(error.message);

        }
    }

  return (
    <div
      className="relative"
      style={{ backgroundColor: themeSettings.backgroundColor }}
    >
      <div
        className="flex items-center justify-between w-full h-20 border p-4"
        style={{ backgroundColor: darkenColor(themeSettings.backgroundColor) }}
      >
        <div className="container flex items-center justify-between">
          <div className="w-12 h-full">
            <img
              className="w-full h-full object-cover"
              src="https://ideogram.ai/api/images/direct/5_ghuJHaTzKEhrH7Rq4Q5A.png"
              alt="logo"
            />
          </div>

          <nav className="flex-grow">
            <ul className="flex justify-evenly text-lg font-semibold">
              <li
                onClick={() => setCat("general")}
                className="hover:bg-blue-300 hover:text-gray-800 transition duration-300 ease-in-out rounded-md px-2 py-1 cursor-pointer"
              >
                General
              </li>
              <li
                onClick={() => setCat("sports")}
                className="hover:bg-blue-300 hover:text-gray-800 transition duration-300 ease-in-out rounded-md px-2 py-1 cursor-pointer"
              >
                Sports
              </li>
              <li
                onClick={() => setCat("entertainment")}
                className="hover:bg-blue-300 hover:text-gray-800 transition duration-300 ease-in-out rounded-md px-2 py-1 cursor-pointer"
              >
                Entertainment
              </li>
              <li
                onClick={() => setCat("business")}
                className="hover:bg-blue-300 hover:text-gray-800 transition duration-300 ease-in-out rounded-md px-2 py-1 cursor-pointer"
              >
                Business
              </li>
              <li
                onClick={() => setCat("science")}
                className="hover:bg-blue-300 hover:text-gray-800 transition duration-300 ease-in-out rounded-md px-2 py-1 cursor-pointer"
              >
                Science
              </li>
              <li
                onClick={() => setCat("health")}
                className="hover:bg-blue-300 hover:text-gray-800 transition duration-300 ease-in-out rounded-md px-2 py-1 cursor-pointer"
              >
                Health
              </li>
              <li
                onClick={() => setCat("technology")}
                className="hover:bg-blue-300 hover:text-gray-800 transition duration-300 ease-in-out rounded-md px-2 py-1 cursor-pointer"
              >
                Technology
              </li>
            </ul>
          </nav>

          <div className="p-4 flex items-center justify-center">
            <MenuIcon
              onClick={() => setShowOptions(!showOptions)}
              className="cursor-pointer"
              style={{
                background:
                  themeSettings.backgroundColor === "#000000" ? "white" : "",
              }}
            />
          </div>
        </div>
      </div>

      {showOptions && (
        <>
          <div
            onClick={() => setShowOptions(!showOptions)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-40"
          ></div>
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-lg shadow-lg border w-96"
            style={{ backgroundColor: themeSettings.backgroundColor }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={() => setShowOptions(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="mb-6">
              <label
                htmlFor="backgroundColor"
                className="block mb-2 font-semibold"
              >
                Background Color:
              </label>
              <input
                id="backgroundColor"
                type="color"
                value={themeSettings.backgroundColor}
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="textColor" className="block mb-2 font-semibold">
                Text Color:
              </label>
              <input
                id="textColor"
                type="color"
                value={themeSettings.textColor}
                onChange={(e) => handleTextColorChange(e.target.value)}
                className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="h1FontSize" className="block mb-2 font-semibold">
                H1 Font Size:
              </label>
              <input
                id="h1FontSize"
                type="number"
                min="10"
                max="50"
                value={themeSettings.fontSizes.h1}
                onChange={(e) =>
                  handleFontSizeChange("h1", parseInt(e.target.value))
                }
                className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="h2FontSize" className="block mb-2 font-semibold">
                H2 Font Size:
              </label>
              <input
                id="h2FontSize"
                type="number"
                min="10"
                max="50"
                value={themeSettings.fontSizes.h2}
                onChange={(e) =>
                  handleFontSizeChange("h2", parseInt(e.target.value))
                }
                className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="pFontSize" className="block mb-2 font-semibold">
                Paragraph Font Size:
              </label>
              <input
                id="pFontSize"
                type="number"
                min="10"
                max="50"
                value={themeSettings.fontSizes.p}
                onChange={(e) =>
                  handleFontSizeChange("p", parseInt(e.target.value))
                }
                className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
