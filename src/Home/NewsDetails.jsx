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
                {trans && (<button onClick={hindiSpeaking} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      className="svg-inline--fa fa-volume-up fa-w-14"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M52 176h92.1c18.6 0 29.8-20.7 20.9-36.7-19.5-35.5-54.4-59.6-94.5-59.6H0v192h78.5c40.1 0 75 24.1 94.5 59.6 9 16 32.3 9.2 32.3-10.7V186.7c0-19.9-23.3-26.7-32.3-10.7-9.1 16-9.1 36.7-9.1 36.7H52c-6.6 0-12-5.4-12-12v-72c0-6.6 5.4-12 12-12zm366.8-21.4c-4.3-4.3-10.1-6.6-16-6.6H302.2c-5.9 0-11.7 2.3-16 6.6-4.2 4.2-6.6 10-6.6 16v131.5c0 19.9-23.3 26.7-32.3 10.7-9.1-16-9.1-36.7-9.1-36.7H192v93.7c0 20.9-23.3 26.7-32.3 10.7-9.1-16-9.1-36.7-9.1-36.7v-214c0-20.9 23.3-26.7 32.3-10.7 9.1 16 9.1 36.7 9.1 36.7h113.3c5.9 0 11.7 2.3 16 6.6 4.3 4.3 6.6 10.1 6.6 16v131.5c0 9.4 7.5 17.1 16.9 17.1 2.7 0 5.3-.6 7.8-1.7l103.7-47.5c6.5-3 10.7-9.7 10.7-16.8v-94.8c.1-6.9-4.2-13.3-10.8-16.6zM354.2 272l-69.3 31.8c-4.3 2-7.3 6.2-7.3 11.1v92.1l-82.6 37.9c-7.9 3.6-17.6-1.2-17.6-10.4V171.4c0-9.2 9.7-14 17.6-10.4l82.6 37.9v92.1c0 4.9 3 9.1 7.3 11.1l69.3 31.8c3.5 1.6 7.5.6 10.1-2.4 3.2-3.5 3.2-8.9 0-12.4zM416 256c0-30.9-25.1-56-56-56s-56 25.1-56 56 25.1 56 56 56 56-25.1 56-56zm32 0c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80z"
      ></path>
    </svg>

</button>)}
                
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
