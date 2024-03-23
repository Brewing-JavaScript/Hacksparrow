import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./user/Authentication";
import Home from "./Home/Home";
import NewsPage from "./Home/NewsDetails";
import ArticleDetail from "./Home/NewsDetails";

import Speech from "./Speech/Speech";

export const UrlContext = createContext();

function App() {
  const [currentUrl, setCurrentUrl] = useState("");
  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl }}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Nav />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/detail" element={<ArticleDetail />} />
          <Route path="/speech" element={<Speech />} />
        </Routes>
      </Router>
    </UrlContext.Provider>
  );
}

export default App;
