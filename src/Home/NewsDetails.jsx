
import React, { useState, useEffect, useContext } from "react";
import api from "../Api/Api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UrlContext, UiContext } from "../App";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Loader from "../Loader/Spinner";
const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { currentUrl, setCurrentUrl } = useContext(UrlContext);
  const { ui } = useContext(UiContext);
  const [translatedArticle, setTranslatedArticle] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    // Used to cancel
    // speechSynthesis.cancel();
    // setSpeaking(false);
    const fetchData = async () => {
      try {

        if (currentUrl) {
          const responseDetailNews = await api.post("/detail-news", {
            currentUrl,
          });
          setArticle(responseDetailNews.data.article);

          const responsePredict = await axios.post(
            "http://localhost:5000/predict",
            { title: responseDetailNews.data.article.title }
          );

          setAnalytics(responsePredict.data);
        }
      } catch (error) {

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUrl]);

  useEffect(() => {
    document.getElementById("news-page").style.backgroundColor = ui.backgroundColor;
    document.getElementById("bgOfNews").style.backgroundColor = ui.backgroundColor;
    document.getElementById("news-page").style.color = ui.textColor;
  });

  useEffect(() => {
    if (article) {
      translateArticle();
    }
  }, [article]);

  const translateArticle = () => {
    const translatedContent = article.content.replace(
      "MS Dhoni",
      "Mahendra Singh Dhoni"
    );
    setTranslatedArticle(translatedContent);
  };
  const [trans, setTrans] = useState("");

  const translate = () => {
    try {
      api.post("/translate", { text: article.title }).then((res) => {
        setTrans(res.data.translatedText);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Text to speech
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en-US"); // Default language is English (United States)
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(article.content);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  const hindiSpeaking = () => {
    const utterance = new SpeechSynthesisUtterance(trans);
    utterance.lang = "hi-IN";
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      {
        loader ? <Loader /> : <div id="bgOfNews" className="w-full bg-gray-100">
          <div className="max-w-screen-xl mx-auto px-4">
            <div id="news-page" className="news-page bg-white shadow-md rounded p-8 mb-4">
              {article ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {trans ? trans : article.title}
                    
                    {trans && (
                      <VolumeUpIcon
                        onClick={hindiSpeaking}
                        fontSize="large"
                        color="primary"
                        className=" ml-10 w-[90px] h-[90]
                font-bold rounded border border-blue-500"
                      />
                    )}
                  </h2>
                  <div
                    className="flex"
                    style={{ width: "50%", justifyContent: "space-between" }}
                  >
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-8"
                      onClick={translate}
                    >
                      Translate to Hindi
                    </button>
                  </div>
                  {analytics && (
                    <div
                      className="flex justify-between mb-4"
                      style={{ width: "100%" }}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`text-xl font-semibold ${analytics.probabilities.fake >
                            analytics.probabilities.true
                            ? "text-red-600"
                            : "text-green-600"
                            } animate-pulse`}
                        >
                          Fake Probability:
                        </div>
                        <div
                          className={`text-2xl font-bold ${analytics.probabilities.fake >
                            analytics.probabilities.true
                            ? "text-red-600"
                            : "text-green-600"
                            }`}
                        >
                          {analytics.probabilities.fake.toFixed(2)}%
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`text-xl font-semibold ${analytics.probabilities.true >
                            analytics.probabilities.fake
                            ? "text-green-600"
                            : "text-red-600"
                            } animate-pulse`}
                        >
                          True Probability:
                        </div>
                        <div
                          className={`text-2xl font-bold ${analytics.probabilities.true >
                            analytics.probabilities.fake
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          {analytics.probabilities.true.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  )}

                  

                  <p className="text-gray-600 mb-2">{article.byline}</p>
                  <p className="text-gray-600 mb-2">
                    Published Time:{" "}
                    {new Date(article.publishedTime).toLocaleString()}
                  </p>
                  <img
                    src={article.image}
                    alt="Article"
                    className="w-full rounded mb-4"
                  />
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                      __html: translatedArticle || article.content,
                    }}
                  ></div>
                  <p className="text-gray-600">Length: {article.length} words</p>
                </div>
              ) : (
                <Loader/>
              )}

              <div>
                <button
                  onClick={() => {
                    setText(article.content.substring(0, 10));
                    handleSpeak();
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                  style={{backgroundColor: ui.textColor, color: ui.backgroundColor}}
                >
                  Text to Speech
                </button>
                {speaking && (
                  <button
                    onClick={handleStop}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ArticleDetail;
