import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlContext } from '../App';

const NewsItem = ({ title, description, imgUrl, newsurl, author, date, source }) => {
    const navigate = useNavigate();
    let { currentUrl, setCurrentUrl } = useContext(UrlContext)


    const handleMove = async (newsurl) => {
        await setCurrentUrl(newsurl)
        navigate('/detail')

    }

    return (
        <div className='my-3'>
            <div className="card" style={{ width: "18rem", minHeight: "25rem" }}>
                {/* Badge for displaying news source */}
                <span style={{ zIndex: "1", left: "84%" }} className="position-absolute translate-middle badge rounded-pill bg-danger">
                    {source}<span className="visually-hidden">unread messages</span>
                </span>
                {/* News image */}
                <img
                    src={imgUrl ? imgUrl : "https:img.etimg.com/thumb/msid-101326001,width-1070,height-580,imgsize-2109496,overlay-etmarkets/photo.jpg"}
                    className="card-img-top"
                    alt="News Thumbnail"
                />
                <div className="card-body">
                    {/* News title */}
                    <h5 className="card-title">{title}...</h5>
                    {/* News description */}
                    <p className="card-text">{description}...</p>
                    {/* Author and date */}
                    <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
                    {/* Button to read more */}
                    <div onClick={() => handleMove(newsurl)} className="btn btn-sm btn-primary">Read More</div>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
