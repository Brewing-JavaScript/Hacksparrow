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
    const storedThemeSettings = JSON.parse(sessionStorage.getItem('themeSettings'));

    const [selectedCategory, setSelectedCategory] = useState('general');

    // Function to handle category selection


    const [themeSettings, setThemeSettings] = useState(
        storedThemeSettings || {
            backgroundColor: '#3F83F8',
            textColor: '#000000',
            fontSizes: {
                h1: 24,
                h2: 20,
                p: 16,
            },
        }
    );

    function darkenColor(hexColor) {
        // Convert hexadecimal color to RGB

        const red = parseInt(hexColor.slice(1, 3), 16);
        const green = parseInt(hexColor.slice(3, 5), 16);
        const blue = parseInt(hexColor.slice(5, 7), 16);

        // Reduce each RGB component by 10 (you can adjust this value as needed)
        const darkerRed = Math.max(0, red - 40);
        const darkerGreen = Math.max(0, green - 40);
        const darkerBlue = Math.max(0, blue - 40);

        // Convert darker RGB values back to hexadecimal
        const darkerHexColor = `#${darkerRed.toString(16).padStart(2, '0')}${darkerGreen.toString(16).padStart(2, '0')}${darkerBlue.toString(16).padStart(2, '0')}`;

        return darkerHexColor;
    }

    const [cats, setCats] = useState([])

    // Function to handle background color change
    const handleBackgroundColorChange = (color) => {
        setThemeSettings((prevSettings) => ({
            ...prevSettings,
            backgroundColor: color,
        }));
    };

    // Function to handle text color change
    const handleTextColorChange = (color) => {
        setThemeSettings((prevSettings) => ({
            ...prevSettings,
            textColor: color,
        }));
    };

    // Function to handle font size change for different categories
    const handleFontSizeChange = (category, newSize) => {
        setThemeSettings((prevSettings) => ({
            ...prevSettings,
            fontSizes: {
                ...prevSettings.fontSizes,
                [category]: newSize,
            },
        }));
    };

    // Update session storage whenever theme settings change
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
        <div className='relative' style={{ backgroundColor: themeSettings.backgroundColor }}>
            <div className='flex items-center justify-between w-full h-20 border p-4' style={{ backgroundColor: darkenColor(themeSettings.backgroundColor) }}>
                <div className='container flex items-center justify-between'>
                    <div className='w-12 h-full'>
                        <img
                            className='w-full h-full object-cover'
                            src="https://varad177.github.io/portfolio/assets/hero.jpg"
                            alt="logo"
                        />
                    </div>

                    <nav style={{ width: "50%" }}>
                        <ul className="block lg:flex" style={{ justifyContent: "space-evenly", color: themeSettings.textColor }}>

                            {cats.length && cats.map((cate, i) => {
                                return <li onClick={() => setCat(`${cate}`)}>{cate}</li>
                            })}

                        </ul>
                    </nav>
                    <div className='p-4 flex items-center justify-center gap-4'>
                        <button onClick={hanleSignOut} className='px-16 py-3 border bg-[#2BC2D2] text-xs font-bold'>Sign Out</button>
                        <MenuIcon onClick={() => setShowOptions(!showOptions)} className="cursor-pointer" style={{ background: themeSettings.backgroundColor === '#000000' ? 'white' : '' }} />
                    </div>
                </div>
            </div>

            {/* Overlay for background blur */}
            {showOptions && (
                <div onClick={() => setShowOptions(!showOptions)} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-40"></div>
            )}

            {/* Popup settings panel */}
            {showOptions && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-lg shadow-lg border w-96"
                    style={{ backgroundColor: themeSettings.backgroundColor }}>
                    <div className="mb-6">
                        <label htmlFor="backgroundColor" className="block mb-2 font-semibold">Background Color:</label>
                        <input
                            id="backgroundColor"
                            type="color"
                            value={themeSettings.backgroundColor}
                            onChange={(e) => handleBackgroundColorChange(e.target.value)}
                            className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
                        />
                        {/* Basic color combinations */}
                        <div className="flex justify-between mt-2">
                            {['#ffffff', '#bababa', '#000000', '#ff0000', '#00ff00'].map((color) => (
                                <div
                                    key={color}
                                    className="rounded-full h-6 w-6 cursor-pointer"
                                    style={{ backgroundColor: color, border: themeSettings.backgroundColor === "#ffffff" ? "1px solid black" : themeSettings.backgroundColor === color ? "1px solid #ffffff" : "" }}
                                    onClick={() => handleBackgroundColorChange(color)}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="textColor" className="block mb-2 font-semibold">Text Color:</label>
                        <input
                            id="textColor"
                            type="color"
                            value={themeSettings.textColor}
                            onChange={(e) => handleTextColorChange(e.target.value)}
                            className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
                        />
                        {/* Basic color combinations */}
                        <div className="flex justify-between mt-2">
                            {['#ffffff', '#bababa', '#000000', '#ff0000', '#00ff00'].map((color) => (
                                <div
                                    key={color}
                                    className="rounded-full h-6 w-6 cursor-pointer"
                                    style={{ backgroundColor: color, border: themeSettings.backgroundColor === '#000000' ? "1px solid white" : "1px solid black" }}
                                    onClick={() => handleTextColorChange(color)}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="h1FontSize" className="block mb-2 font-semibold">H1 Font Size:</label>
                        <input
                            id="h1FontSize"
                            type="number"
                            min="10"
                            max="50"
                            value={themeSettings.fontSizes.h1}
                            onChange={(e) => handleFontSizeChange('h1', parseInt(e.target.value))}
                            className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="h2FontSize" className="block mb-2 font-semibold">H2 Font Size:</label>
                        <input
                            id="h2FontSize"
                            type="number"
                            min="10"
                            max="50"
                            value={themeSettings.fontSizes.h2}
                            onChange={(e) => handleFontSizeChange('h2', parseInt(e.target.value))}
                            className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="pFontSize" className="block mb-2 font-semibold">Paragraph Font Size:</label>
                        <input
                            id="pFontSize"
                            type="number"
                            min="10"
                            max="50"
                            value={themeSettings.fontSizes.p}
                            onChange={(e) => handleFontSizeChange('p', parseInt(e.target.value))}
                            className="mb-2 border border-gray-300 rounded-md w-full py-1 px-2"
                        />
                    </div>

                    {/* Centered UI box to reflect changes */}
                    <div className="text-center">
                        <h1 style={{ fontSize: `${themeSettings.fontSizes.h1}px`, color: themeSettings.textColor }} className="mb-4">Heading 1</h1>
                        <h2 style={{ fontSize: `${themeSettings.fontSizes.h2}px`, color: themeSettings.textColor }} className="mb-4">Heading 2</h2>
                        <p style={{ fontSize: `${themeSettings.fontSizes.p}px`, color: themeSettings.textColor }}>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
