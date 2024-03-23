import React, { useState, useEffect } from "react";
import '../App.css';
import NewsItem from "./NewsItem";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import api from '../Api/Api'

const Home = ({ country = 'in', category = '', pagesize = 6 }) => {
    const [articles, setArticles] = useState([]);
    console.log(articles);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);

    const cap = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    useEffect(() => {

        fetchNews()

    }, [country, category, pagesize, api]);

    const fetchNews = () => {
        try {
            api.post('/news').then((res) => {
                setArticles(res.data.articles)
            })

        } catch (error) {

            toast.error(error.message)

        }
    }

    const handleNextClick = async () => {
        if (!(page + 1 > Math.ceil(totalResults / pagesize))) {
            setLoading(true);
            let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api}&page=${page + 1}&pageSize=${pagesize}`;
            let data = await fetch(url);
            let parsedData = await data.json();

            setArticles(parsedData.articles);
            setPage(page + 1);
            setLoading(false);
        }
    };

    const handlePreviousClick = async () => {
        setPage(page - 1);
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api}&page=${page - 1}&pageSize=${pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(parsedData.articles);
        setLoading(false);
    };

    return (
        <div className="container my-3 d-flex align-items-center justify-content-center flex-column varad">
            <h1 className="text-center">Top headlines</h1>

            {loading && <Spinner />}

            <div className="row" style={{margin: "0 auto", width: "80%", display: "grid", gridTemplateColumns: "auto auto auto"}}>
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
            <div className="container d-flex justify-content-between">
                <button disabled={page < 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / pagesize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    );
};

export default Home;
