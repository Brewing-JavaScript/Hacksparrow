import React, { useState, useEffect, useContext } from "react";
import api from "../Api/Api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UrlContext, UiContext } from "../App";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Loader from "../Loader/Spinner";
import fetch from "isomorphic-fetch";
import toast from "react-hot-toast";

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { currentUrl, setCurrentUrl } = useContext(UrlContext);
  const { ui } = useContext(UiContext);
  const [translatedArticle, setTranslatedArticle] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loader, setLoader] = useState(false);
  const [summary, setSummary] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [theme , setTheme] = useState({})

  useEffect(() => {

  
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
    document.getElementById("news-page").style.backgroundColor =
      ui.backgroundColor;
    document.getElementById("bgOfNews").style.backgroundColor =
      ui.backgroundColor;
    document.getElementById("news-page").style.color = ui.textColor;
    Array.from(document.querySelectorAll('img')).filter(img => img.alt === "Article")
    .forEach(img => img.style.display = 'none');

  }, []);

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

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
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
    setSpeaking(true);
  };

  const summarizeArticle = async () => {
    try {
      // let currentUrl = 'https://www.moneycontrol.com/news/politics/tm-krishna-award-row-annamalai-zohos-sridhar-vembu-back-ranjani-gayatri-12511121.html'

      const apiKey = "d5e53e8c63760fc7cac37a74b6151770"; // Replace with your actual key

      const formData = new FormData();
      formData.append("key", apiKey);
      formData.append("url", currentUrl);
      formData.append("sentences", 5); // Adjust the number of sentences as needed

      const response = await fetch(
        "http://api.meaningcloud.com/summarization-1.0",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setSummary(data.summary);
      return data.summary;
    } catch (error) {
      console.error("Error summarizing article:", error);
      // Handle errors gracefully, e.g., display an error message to the user
      return null; // Or return an empty string or error indicator
    }
  };

  const sendmail = (sum) => {
    try {

      const loader = toast.loading('sending email...')
      const userInSession = sessionStorage.getItem("_id");
      const _id = JSON.parse(userInSession);
      api
        .post("/send-sum-mail", { sum, _id })
        .then((res) => {
          toast.dismiss(loader)
          return toast.success("mail send");
        })
        .catch((err) => {
          toast.dismiss(loader)
          return toast.error(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div id="bgOfNews" className="w-full bg-gray-100">
          <div className="max-w-screen-xl mx-auto px-4">
            <div
              id="news-page"
              className="news-page bg-white shadow-md rounded p-8 mb-4"
            >
              {article ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {trans ? trans : article.title}
                    {trans && ( 
                      <VolumeUpIcon
                        onClick={()=>{
                            console.log(trans);
                            hindiSpeaking()}
                        }
                        fontSize="large"
                        color="primary"
                        className=" ml-10 w-[90px] h-[90]
                font-bold rounded border border-blue-500"
                      />
                    )}
                  </h2>
                  <div
                    className="flex"
                    style={{
                      width: "50%",
                      justifyContent: "space-between",
                    }}
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
                      className="mb-4"
                      style={{ width: "100%" }}
                    >
                        <h3 className={`${analytics.probabilities.fake > analytics.probabilities.true ? "text-red-600": "text-green-600"}`}
                        style={{fontSize: "2rem"}}>Fact Checker: News is
                        {analytics.probabilities.fake > analytics.probabilities.true ? (<span> Fake!</span>) : <span> Authentic!</span>} </h3>
                         
                    <div className="flex">
                        
                        <div className="flex items-center mr-8">
                            <div
                            className={`text-xl font-semibold ${
                                analytics.probabilities.true >
                                analytics.probabilities.fake
                                ? "text-green-600"
                                : "text-red-600"
                            } animate-pulse`}
                            >
                            True Probability:
                            </div>
                            <div
                            className={`text-2xl font-bold ${
                                analytics.probabilities.true >
                                analytics.probabilities.fake
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                            > 
                            {analytics.probabilities.true.toFixed(2)}%
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div
                            className={`text-xl font-semibold ${
                                analytics.probabilities.fake >
                                analytics.probabilities.true
                                ? "text-red-600"
                                : "text-green-600"
                            } animate-pulse`}
                            >
                            Fake Probability:
                            </div>
                            <div
                            className={`text-2xl font-bold ${
                                analytics.probabilities.fake >
                                analytics.probabilities.true
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                            >
                            {analytics.probabilities.fake.toFixed(2)}%
                            </div>
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
                    className=" rounded mb-4"
                    style={{width: "50%"}}
                  />
                  <div
                  style={{fontSize:'20px'}}
                    className="article-content"
                    dangerouslySetInnerHTML={{
                      __html: translatedArticle || article.content,
                    }}
                  ></div>
                  <p className="text-gray-600">
                    Length: {article.length} words
                  </p>
                </div>
              ) : (
                <Loader />
              )}

              <div className="space-x-4">
                <button
                  onClick={() => {
                    handleSpeak(article.content);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                  style={{
                    backgroundColor: ui.textColor,
                    color: ui.backgroundColor,
                  }}
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
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
                  onClick={summarizeArticle}
                >
                  Summarize
                </button>
                {summary && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Summary:</h3>
                    <p class="text-lg">{summary}</p>
                    <button
                      className="py-4 px-12 border bg-black text-white text-xl m-4"
                      onClick={() => sendmail(summary)}
                    >
                      Send Mail 📧
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleDetail;
