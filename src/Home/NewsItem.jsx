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

    return (
        <div className='my-3'>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto sm:w-96 lg:w-72">
                
                {/* News image */}
                <img
                    src={imgUrl ? imgUrl : "https://img.etimg.com/thumb/msid-101326001,width-1070,height-580,imgsize-2109496,overlay-etmarkets/photo.jpg"}
                    className="w-full h-48 object-cover"
                    alt="News Thumbnail"
                />
                <div className="p-4">
                    {/* News title */}
                    <h5 style={{fontSize : ui.fontSizes.h2}} className="text-lg ">{title}...</h5>
                    {/* News description */}
                    <p style={{fontSize : ui.fontSizes.p  , color : ui.textColor}} className="mt-2">{description}...</p>
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
