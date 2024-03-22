import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    // Destructuring props to extract individual properties
    let { title, description, imgUrl, newsurl, author, date, source } = this.props;

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
            <a href={newsurl} className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
