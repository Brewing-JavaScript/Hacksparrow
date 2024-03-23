import React, { useState, useEffect, useContext } from "react";
import NewsItem from "./NewsItem";
import api from "../Api/Api";
import Nav from "./Nav";
import { UiContext, catContext } from "../App";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Spinner";

const Home = ({ country = "in", category = "general", pagesize = 6 }) => {
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);

  const { cat } = useContext(catContext);
  const { ui } = useContext(UiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userInsession = sessionStorage.getItem("access_token");
    const token = JSON.parse(userInsession);
    if (!token) {
      navigate("/auth");
    }

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, category, pagesize, api, ui, cat, page]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await api.post("/news", { cat, page, pagesize });
      setLoading(false);
      setTotalResults(res.data.totalResults);
      setArticles(res.data.articles);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching news:", error);
    }
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / pagesize)) {
      setPage(page + 1);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      {loading && <Loader message={"Loading news..."} />}
      <Nav />
      <div
        style={{ backgroundColor: ui.backgroundColor, color: ui.textColor }}
        className="d-flex align-items-center justify-content-center flex-column varad"
      >
        <div
          onClick={() => navigate("/feedback")}
          className="h-16 w-52 border absolute -left-20 top-[16rem] bg-red-600 -rotate-90 flex items-center justify-center text-2xl font-bold text-white rounded-xl cursor-pointer hover:scale-110 duration-150"
        >
          FEEDBACK
        </div>
        <div
          onClick={() => navigate("/recommendation")}
          className="h-16 w-52 border absolute -left-20 top-[35rem] bg-red-600 -rotate-90 flex items-center justify-center text-2xl font-bold text-white rounded-xl cursor-pointer hover:scale-110 duration-150"
        >
          categories
        </div>
        <h1 className="text-center" style={{ fontSize: "4rem", fontWeight: 700 }}>
          Top Headlines
        </h1>

        <div className="row">
          {!loading &&
            articles.map((ele) => (
              <div className="col-md-4" key={ele.url}>
                <NewsItem
                  title={ele.title ? ele.title.slice(0, 50) : ""}
                  description={ele.description ? ele.description.slice(0, 90) : "description"}
                  imgUrl={ele.urlToImage}
                  newsurl={ele.url}
                  author={ele.author}
                  date={ele.publishedAt.slice(0, 10)}
                  source={ele.source.name}
                />
              </div>
            ))}
        </div>
        <div className="container flex items-center justify-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= Math.ceil(totalResults / pagesize)}
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
