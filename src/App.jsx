import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Authentication from "./user/Authentication";
import Home from "./Home/Home";
import NewsPage from "./Home/NewsDetails";
import ArticleDetail from "./Home/NewsDetails";

export  const UrlContext = createContext();


function App() {
  const [currentUrl, setCurrentUrl] = useState('');
  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl }}>
    <Router>

      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<ArticleDetail />} />
      </Routes>
    </Router>
    </UrlContext.Provider>
  );
}

export default App;
