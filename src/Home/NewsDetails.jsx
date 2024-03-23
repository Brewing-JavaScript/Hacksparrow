import React, { useState, useEffect, useContext } from 'react';
import api from '../Api/Api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UrlContext } from '../App';

const ArticleDetail = () => {
  const [translatedArticle, setTranslatedArticle] = useState(null);
  const [article, setArticle] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  let { currentUrl, setCurrentUrl } = useContext(UrlContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUrl) {
          // Call /detail-news endpoint
          const responseDetailNews = await api.post('/detail-news', { currentUrl });
          setArticle(responseDetailNews.data.article);

          // Call /predict endpoint with currentUrl as title
          const responsePredict = await axios.post('http://localhost:5000/predict', { title: responseDetailNews.data.article.title });
          setAnalytics(responsePredict.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentUrl]);


  useEffect(() => {
    if (article) {
      translateArticle();
    }
  }, [article]);

  const translateArticle = () => {
    // Add your translation logic here
    // Example:
    const translatedContent = article.content.replace('MS Dhoni', 'Mahendra Singh Dhoni');
    setTranslatedArticle(translatedContent);
  };

  return (
    <div className="article-container">
      <div className="news-page">
        <h1>Article Details</h1>
        <h1>{analytics && analytics.probabilities.fake}</h1>
        <h1>{analytics && analytics.probabilities.true}</h1>
        {article ? (
          <div>
            <h2>{article.title}</h2>
            <p>{article.byline}</p>
            <p>Published Time: {new Date(article.publishedTime).toLocaleString()}</p>
            <img src={article.image} alt="Article" />
            <div dangerouslySetInnerHTML={{ __html: translatedArticle || article.content }}></div>
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
