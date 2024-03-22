import React, { useState, useEffect } from "react";
import '../App.css';
import NewsItem from "./NewsItem";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import api from '../Api/Api'
import Nav from "./Nav";

const Home = ({ country = 'in', category = '', pagesize = 6 }) => {
  // const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);



  let articles = {
    "status": "ok",
    "totalResults": 70,
    "articles": [
      {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "Vivek Krishnan",
        "title": "As Dhoni passes the baton again, CSK say they are better prepared - Hindustan Times",
        "description": "In 2022, MSD decided to relinquish captaincy and let Ravindra Jadeja take charge. After only two wins in eight games, Jadeja stepped down | Cricket",
        "url": "https://www.hindustantimes.com/cricket/as-ms-dhoni-passes-the-baton-again-csk-say-they-are-better-prepared-101711038557824.html",
        "urlToImage": "https://www.hindustantimes.com/ht-img/img/2024/03/21/1600x900/PTI03-21-2024-000235A-0_1711038614130_1711039353258.jpg",
        "publishedAt": "2024-03-21T16:46:47Z",
        "content": "MS Dhoni must have thought through his decision to hand over the Chennai Super Kings (CSK) captaincy to Ruturaj Gaikwad for many days, if not weeks or months. In trademark Dhoni style though, it was … [+4034 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Crictracker.com"
        },
        "author": "CricTracker Staff",
        "title": "Brett Lee predicts IPL 2024 winner and it's neither MI or CSK - CricTracker",
        "description": "The much-awaited Indian Premier League 2024 (IPL 2024) will get underway on Friday, March 22 at MA Chidambaram Stadium, Chennai as defending champions Chennai Super Kings and Royal Challengers Bengalu",
        "url": "https://www.crictracker.com/cricket-news/brett-lee-predicts-ipl-2024-winners-and-its-neither-mi-or-csk/",
        "urlToImage": "https://media.crictracker.com/media/attachments/Brett-Lee-pic.jpg",
        "publishedAt": "2024-03-21T16:19:00Z",
        "content": "The much-awaited Indian Premier League 2024 (IPL 2024) will get underway on Friday, March 22 at MA Chidambaram Stadium, Chennai as defending champions Chennai Super Kings and Royal Challengers Bengal… [+2091 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Sportskeeda"
        },
        "author": "Sportskeeda",
        "title": "\"Who would not like to be a part of the World Cup squad?\" - Ravi Bishnoi on his hopes of getting back into the Indian T20I side - Sportskeeda",
        "description": null,
        "url": "https://www.sportskeeda.com/cricket/news-thankfully-i-never-felt-insecure-ravi-bishnoi-claims-still-know-dropped-india-s-t20i-side",
        "urlToImage": null,
        "publishedAt": "2024-03-21T15:46:51Z",
        "content": null
      },
      {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "Arfa Javaid",
        "title": "Viral Brain Teaser: Can you determine the value of 8+11? No, the answer is not 19 - Hindustan Times",
        "description": "This viral brain teaser shared on X (formerly Twitter) has left people saying that it is very ‘confusing’. | Trending",
        "url": "https://www.hindustantimes.com/trending/viral-brain-teaser-can-you-determine-the-value-of-8-11-no-the-answer-is-not-19-101711028584331.html",
        "urlToImage": "https://www.hindustantimes.com/ht-img/img/2024/03/21/1600x900/viral-brain-teaser-maths-question_1711029035663_1711029048146.jpg",
        "publishedAt": "2024-03-21T15:01:08Z",
        "content": "Are you scrolling through your social media feeds and looking for a challenging brain teaser? If so, then you landed at the right place as we have a mind-bending maths brain teaser for you. The tease… [+2171 chars]"
      },
      {
        "source": {
          "id": "espn-cric-info",
          "name": "ESPN Cric Info"
        },
        "author": "Deivarayan Muthu",
        "title": "Pathirana to miss initial stages of IPL 2024 due to hamstring injury - ESPNcricinfo",
        "description": "He will join CSK after clearance from Sri Lanka Cricket, while Shivam Dube has linked up with the side after rehab at NCA",
        "url": "https://www.espncricinfo.com/story/ipl-2024-csk-matheesha-pathirana-to-miss-the-start-due-to-hamstring-injury-1425557",
        "urlToImage": "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/359500/359534.6.jpg",
        "publishedAt": "2024-03-21T14:48:45Z",
        "content": "NewsHe will join CSK after clearance from Sri Lanka Cricket, while Shivam Dube has linked up with the side after rehab at NCA\r\nWith 18 wickets, Matheesha Pathirana was the most successful death-overs… [+3889 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Betfair.com"
        },
        "author": null,
        "title": "Chennai Super Kings v Royal Challengers Bangalore IPL Tips: To the Max - Betting.betfair",
        "description": null,
        "url": "https://betting.betfair.com/cricket/indian-premier-league---ipl/chennai-super-kings-v-royal-challengers-bangalore-ipl-tips-to-the-max-210324-194.html",
        "urlToImage": null,
        "publishedAt": "2024-03-21T13:56:25Z",
        "content": "Description: Group Number: Group Name: Ip Address: Username: Computer Name:"
      }
    ]
  }


  useEffect(() => {

    // fetchNews()

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
    <>
      <Nav />
      <div className="container my-3 d-flex align-items-center justify-content-center flex-column varad">
        <h1 className="text-center">Top headlines</h1>

        {loading && <Spinner />}

        <div className="row">
          {!loading &&
            articles.articles.map((ele) => (
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
    </>
  );
};

export default Home;




