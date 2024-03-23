import React, { useState, useEffect, useContext } from "react";
import '../App.css';
import NewsItem from "./NewsItem";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import api from '../Api/Api'
import { getUi } from '../Api/GetUi'
import Nav from "./Nav";
import { UiContext, catContext } from "../App";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Spinner";

const Home = ({ country = 'in', category = 'general', pagesize = 6 }) => {
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);


  const { cat } = useContext(catContext)
  const { ui } = useContext(UiContext); // Destructure ui from UiContext

  const navigate = useNavigate()

  useEffect(() => {

    const userInsession = sessionStorage.getItem('access_token')
    const token = JSON.parse(userInsession)
    if (!token) {
      navigate('/auth')
    }



    fetchNews();

    // getUi();
    document.getElementById('root').style.backgroundColor = ui.backgroundColor
  }, [country, category, pagesize, api, ui, cat]);




  const fetchNews = () => {
    try {

      setLoading(true)
      api.post('/news', { cat }).then((res) => {
        setLoading(false)
        setArticles(res.data.articles)
      })

    } catch (error) {
      setLoading(false)

      toast.error(error.message)

    }
  }

  return (
    <>       {loading && <Loader message={"loading news..."} />}
      <Nav />
      <div style={{ backgroundColor: ui.backgroundColor, color: ui.textColor }} className="container my-3 d-flex align-items-center justify-content-center flex-column varad">
        <h1 className="text-center" style={{ fontSize: "4rem", fontWeight: 700 }}>Top headlines</h1>



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
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page < 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / pagesize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    </>
  );
};

export default Home;
