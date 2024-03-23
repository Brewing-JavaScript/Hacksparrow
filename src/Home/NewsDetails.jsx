import React, { useState, useEffect, useContext } from 'react';
import api from '../Api/Api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UrlContext, UiContext } from '../App';

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { currentUrl, setCurrentUrl } = useContext(UrlContext);
  const { ui } = useContext(UiContext);
  const [translatedArticle, setTranslatedArticle] = useState(null);
  const [analytics, setAnalytics] = useState(null);


  useEffect(() => {
    // Used to cancel
    // speechSynthesis.cancel();
    // setSpeaking(false);
    const fetchData = async () => {
      try {
        if (currentUrl) {
          const responseDetailNews = await api.post('/detail-news', { currentUrl });
          setArticle(responseDetailNews.data.article);

          const responsePredict = await axios.post('http://localhost:5000/predict', { title: responseDetailNews.data.article.title });
          setAnalytics(responsePredict.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentUrl]);

  useEffect(() => {
    document.getElementById('root').style.backgroundColor = ui.backgroundColor;
    document.getElementById('root').style.color = ui.textColor;
  });

  useEffect(() => {
    if (article) {
      translateArticle();
    }
  }, [article]);

  const translateArticle = () => {
    const translatedContent = article.content.replace('MS Dhoni', 'Mahendra Singh Dhoni');
    setTranslatedArticle(translatedContent);
  };
  const [trans , setTrans] = useState('')

  const translate = () => {
    try {
      api.post('/translate', { text: article.title }).then((res) => {
        setTrans(res.data.translatedText)
      })
    } catch (error) {
      console.log(error);

    }
  }


    //Text to speech
    const [text, setText] = useState('');
    const [lang, setLang] = useState('en-US'); // Default language is English (United States)

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(article.content);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    };

    const hindiSpeaking = () => {
        const utterance = new SpeechSynthesisUtterance(trans);
        utterance.lang = 'hi-IN';
        speechSynthesis.speak(utterance);
    }

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="news-page bg-white shadow-md rounded p-8 mb-4">

          {article ? (
            <div>
              <h2 className="text-2xl font-semibold mb-2">{trans ? trans : article.title}</h2>
              {analytics && (
                <div className="flex justify-between mb-4" style={{width: "100%"}}>
                  <div className="flex flex-col items-center">
                    <div className={`text-xl font-semibold ${analytics.probabilities.fake > analytics.probabilities.true ? 'text-red-600' : 'text-green-600'} animate-pulse`}>
                      Fake Probability:
                    </div>
                    <div className={`text-2xl font-bold ${analytics.probabilities.fake > analytics.probabilities.true ? 'text-red-600' : 'text-green-600'}`}>
                      {analytics.probabilities.fake.toFixed(2)}%
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`text-xl font-semibold ${analytics.probabilities.true > analytics.probabilities.fake ? 'text-green-600' : 'text-red-600'} animate-pulse`}>
                      True Probability:
                    </div>
                    <div className={`text-2xl font-bold ${analytics.probabilities.true > analytics.probabilities.fake ? 'text-green-600' : 'text-red-600'}`}>
                      {analytics.probabilities.true.toFixed(2)}%
                    </div>
                  </div>
                </div>
              )}

            <div className="flex" style={{width: "50%", justifyContent: "space-between"}}>
                <div className='border py-4 px-20 bg-red-300' onClick={translate}>translate</div>
                {trans && (<button onClick={hindiSpeaking} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Speak</button>)}
                
            </div>

              <p className="text-gray-600 mb-2">{article.byline}</p>
              <p className="text-gray-600 mb-2">Published Time: {new Date(article.publishedTime).toLocaleString()}</p>
              <img src={article.image} alt="Article" className="w-full rounded mb-4" />
              <div className="article-content" dangerouslySetInnerHTML={{ __html: translatedArticle || article.content }}></div>
              <p className="text-gray-600">Length: {article.length} words</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}

        <div>
            {/* <textarea value={text} onChange={(e) => setText(article.content)} />
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="fr-FR">French</option>
                <option value="hi-IN">Hindi</option>
                <option value="mr-IN">Marathi</option>
                <option value="zh-CN">Chinese</option>

                Add more language options as needed
            </select> */}
            <button onClick={()=>{
                setText(article.content.substring(0, 10)) 
                handleSpeak()}}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> Speak</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
