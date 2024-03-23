import React, { useState, useEffect, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";
import { UiContext, catContext } from "../App";
import api from "../Api/Api";
import { theme } from "flowbite-react";

const Nav = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { setUi } = useContext(UiContext);
  const { setCat } = useContext(catContext);
  const [listening, setListening] = useState(false);
  const [cats, setCats] = useState([]);
  const [themeSettings, setThemeSettings] = useState(() => {
    const storedThemeSettings = JSON.parse(
      sessionStorage.getItem("themeSettings")
    );
    return (
      storedThemeSettings || {
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        fontSizes: {
          h1: 24,
          h2: 20,
          p: 16,
        },
      }
    );
  });

  const darkenColor = (hexColor) => {
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    const darkerRed = Math.max(0, red - 40);
    const darkerGreen = Math.max(0, green - 40);
    const darkerBlue = Math.max(0, blue - 40);

    return `#${darkerRed.toString(16).padStart(2, "0")}${darkerGreen
      .toString(16)
      .padStart(2, "0")}${darkerBlue.toString(16).padStart(2, "0")}`;
  };

  const navigate = useNavigate();


  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log('Recognized command:', command);

      if (command === 'take my speech') {
        navigate("/speech");
      }

      recognition.start();
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [navigate]);

  const toggleListening = () => {
    setListening((prevListening) => !prevListening);
  };

  useEffect(() => {
    const storedThemeSettings = JSON.parse(
      sessionStorage.getItem("themeSettings")
    );
    if (storedThemeSettings) {
      setThemeSettings(storedThemeSettings);
    }
    getCats();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("themeSettings", JSON.stringify(themeSettings));
    setUi(themeSettings);
  }, [themeSettings, setUi]);

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/auth");
  };

  const getCats = async () => {
    try {
      const userInSession = sessionStorage.getItem("_id");
      const _id = JSON.parse(userInSession);
      const res = await api.post("/get-cats", { _id });
      setCats(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="relative"
      style={{ backgroundColor: themeSettings.backgroundColor }}
    >
      <div
        className="mt-4 flex items-center justify-between w-full h-28 border p-4 rounded-2xl"
        style={{ backgroundColor: darkenColor(themeSettings.backgroundColor) }}
      >
        <div className="container flex items-center justify-between">
          <div className="w-20 h-full rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://ideogram.ai/api/images/direct/5_ghuJHaTzKEhrH7Rq4Q5A.png"
              alt="logo"
            />
          </div>
          <nav className="flex gap-12">
            {cats.length &&
              cats.map((cate, i) => (
                <div
                  style={{ color: themeSettings.textColor }}
                  className="m-2 text-xl font-bold cursor-pointer capitalize transition duration-300 ease-in-out hover:bg-gray-200 hover:shadow-md px-4 py-2 rounded-lg"
                  key={i}
                  onClick={() => setCat(cate)}
                >
                  {cate}
                </div>
              ))}
          </nav>
          <div className="p-4 flex items-center justify-center gap-4">
            <MicIcon
              className={`cursor-pointer ${listening ? 'text-green-500' : 'text-gray-500'}`}
              onClick={toggleListening}
              style={{ fontSize: "48px" }}
            />
            <MenuIcon
              onClick={() => setShowOptions(!showOptions)}
              className="cursor-pointer"
              fontSize="large"
              style={{
                background:
                  themeSettings.backgroundColor === "#000000" ? "white" : "",
              }}
            />
            <button
              style={{ backgroundColor: themeSettings.textColor, color: themeSettings.backgroundColor }}
              onClick={handleSignOut}
              className="px-8 py-4 bg-blue-500 text-white text-xl font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Out
            </button>
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
            {/* Option controls */}
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
