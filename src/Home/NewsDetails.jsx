import React, { useState, useEffect, useContext } from 'react';
import api from '../Api/Api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UrlContext } from '../App';

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const [translatedArticle, setTranslatedArticle] = useState(null);
  const { currentUrl, setCurrentUrl } = useContext(UrlContext);

  useEffect(() => {
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
  }, [currentUrl]);

  useEffect(() => {
    if (article) {
      translateArticle();
    }
  }, [article]);

  const translateArticle = async () => {
    try {
      const translationResponse = await axios.post('https://translation.googleapis.com/language/translate/v2', null, {
        params: {
          q: article.content,
          target: 'en',
          key: 'YOUR_GOOGLE_TRANSLATE_API_KEY' // Replace with your actual API key
        }
      });
      setTranslatedArticle(translationResponse.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error translating article:', error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-container">
      {/* Google Translate Section */}
      <div className="google-translate-container">
        <GoogleTranslate /> {/* Render the GoogleTranslate component */}
      </div>

      <div className="news-page">
        <h1>Article Details</h1>
        <div>
          <h2>{article.title}</h2>
          <p>{article.byline}</p>
          <p>Published Time: {new Date(article.publishedTime).toLocaleString()}</p>
          <img src={article.image} alt="Article" />
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
          <p>Length: {article.length} words</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
