import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UiContext, UrlContext } from '../App';

const NewsItem = ({ title, description, imgUrl, newsurl, author, date, source }) => {
    const navigate = useNavigate();
    let { currentUrl, setCurrentUrl } = useContext(UrlContext);
    let {ui} = useContext(UiContext)

    const handleMove = async (newsurl) => {
        await setCurrentUrl(newsurl);
        navigate('/detail');
    };

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

    return (
        <div className='my-3'>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto" style={{width: "25rem"}}>
                
                {/* News image */}
                <img
                    src={imgUrl ? imgUrl : "https://img.etimg.com/thumb/msid-101326001,width-1070,height-580,imgsize-2109496,overlay-etmarkets/photo.jpg"}
                    className="w-full h-48 object-cover"
                    alt="News Thumbnail"
                />
                <div className="p-4 newsItem" style={{backgroundColor: ui.backgroundColor === '#000000' ? "#282828" : (ui.backgroundColor === "#ffffff" ? "#F7F7F7" : darkenColor(ui.backgroundColor))
}}>
                    {/* News title */}
                    <h5 style={{fontSize : ui.fontSizes.h2, color : ui.backgroundColor === "#000000"? "white" : (ui.backgroundColor === "ffffff" ? "#000000" : ui.textColor )}} className="text-lg ">{title}...</h5>
                    {/* News description */}
                    <p style={{fontSize : ui.fontSizes.p  , color : ui.backgroundColor === "#000000"? "white" : ui.textColor}} className="mt-2">{description}...</p>
                    {/* Author and date */}
                    <p className="mt-2 text-sm text-gray-500">By {author} on {date}</p>
                    {/* Button to read more */}
                    <div onClick={() => handleMove(newsurl)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300">Read More</div>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
