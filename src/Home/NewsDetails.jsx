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
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto my-8">
                <h1 className="text-3xl font-semibold mb-4">Article Details</h1>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                        <p className="text-gray-600 mb-4">{article.byline}</p>
                        <p className="text-gray-600 mb-2">Published Time: {new Date(article.publishedTime).toLocaleString()}</p>
                        <img src={article.image} alt="Article" className="w-full mb-4" />
                        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        <p className="text-gray-600 mt-4">Length: {article.length} words</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
