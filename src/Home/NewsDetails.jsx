import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleDetail = () => {
    const [article, setArticle] = useState(null);

    const summarizeContent = async (content) => {
        try {
            const response = await axios.post('http://localhost:5000/summarize', { content });
            console.log('Summary:', response.data.summary);
        } catch (error) {
            console.error('Error summarizing content:', error);
        }
    };

    useEffect(() => {
        // Fetch article details
        // Code for fetching article details goes here
    }, []);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="article-container">
            <div className="news-page">
                <h1>Article Details</h1>
                <div>
                    <h2>{article.title}</h2>
                    <p>{article.byline}</p>
                    <p>Published Time: {new Date(article.publishedTime).toLocaleString()}</p>
                    <img src={article.image} alt="Article" />
                    <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                    <p>Length: {article.length} words</p>
                    <button onClick={() => summarizeContent(article.content)}>Summarize Content</button>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
