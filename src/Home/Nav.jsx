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

  const handleBackgroundColorChange = (color) => {
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      backgroundColor: color,
    }));
  };

  const handleTextColorChange = (color) => {
    setThemeSettings((prevSettings) => ({ ...prevSettings, textColor: color }));
  };

  const handleFontSizeChange = (category, newSize) => {
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      fontSizes: { ...prevSettings.fontSizes, [category]: newSize },
    }));
  };


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

  const handleLogOut = () =>{
    sessionStorage.clear()
    navigate('/auth')
  }

  return (
    <div
      className="relative"
      style={{ backgroundColor: themeSettings.backgroundColor }}
    >
      <div
        className="flex items-center justify-between w-full h-28 p-4 rounded-2xl"
        style={{ backgroundColor: themeSettings.backgroundColor }}
      >
        <div className="flex items-center justify-between" style={{ width: "80%", margin: "0 auto" }}>

          <div className="w-20 h-full flex -translate-x-20" style={{ alignItems: "center" }}>
            <img
              style={{ width: "4rem", marginRight: "1rem" }}
              className="w-full h-full rounded-full "
              src="https://ideogram.ai/api/images/direct/5_ghuJHaTzKEhrH7Rq4Q5A.png"
              alt="logo"
            />
            <h3 style={{ fontSize: "2rem", fontWeight: 600 }}>NewsWeb</h3>
          </div>
          <nav className="flex gap-12 items-center">
            {cats.length &&
              cats.map((cate, i) => (
                <div
                  style={{ color: themeSettings.textColor, fontStyle: "normal" }}
                  className="m-2 text-xl cursor-pointer capitalize transition duration-300 ease-in-out hover:bg-gray-200 hover:shadow-md px-2 py-2 rounded-lg"
                  key={i}
                  onClick={() => setCat(cate)}
                >
                  {cate}
                </div>
              ))}
          </nav>
          <div className="flex items-center justify-center gap-4">
            <MicIcon
              className={`cursor-pointer ${listening ? 'text-green-500' : 'text-gray-500'}`}
              onClick={toggleListening}
              style={{ fontSize: "40px" }}
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
            <div className="py-4 px-12 border bg-blue-300 text-black text-xl font-bold rounded-md cursor-pointer" onClick={handleLogOut}>
              sign Out

            </div>
          </div>

        </div>
      </div>
      <hr style={{ width: "80%", margin: "0 auto", border: "1px solid " + themeSettings.textColor }} />
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

                style={{ color: themeSettings.textColor }}>
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
              <label htmlFor="textColor" className="block mb-2 font-semibold"
                style={{ color: themeSettings.textColor }}>
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
              <label htmlFor="h1FontSize" className="block mb-2 font-semibold"
                style={{ color: themeSettings.textColor }}>
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
              <label htmlFor="h2FontSize" className="block mb-2 font-semibold"
                style={{ color: themeSettings.textColor }}>
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
              <label htmlFor="pFontSize" className="block mb-2 font-semibold"
                style={{ color: themeSettings.textColor }}>
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
