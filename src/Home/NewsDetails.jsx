import React, { useState, useEffect, useContext } from 'react';
import api from '../Api/Api';
import { useParams } from 'react-router-dom';
import { UrlContext } from '../App';

const ArticleDetail = () => {
    const [article, setArticle] = useState(null);
    let { currentUrl, setCurrentUrl } = useContext(UrlContext)


    useEffect(() => {
        console.log(currentUrl);
        const fetchArticle = async () => {
            try {
                if (currentUrl) {
                    const response = await api.post('/detail-news', { currentUrl });
                    setArticle(response.data.article);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [currentUrl]); // Dependency array with currentUrl

    if (!article) {
        return <div>Loading...</div>;
    }
    return (

        <div className="article-container">
            <div className="news-page">
                <h1>Article Details</h1>
                {article ? (
                    <div>
                        <h2>{article.title}</h2>
                        <p>{article.byline}</p>
                        <p>Published Time: {new Date(article.publishedTime).toLocaleString()}</p>
                        <img src={article.image} alt="Article" />
                        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        <p>Length: {article.length} words</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ArticleDetail;
