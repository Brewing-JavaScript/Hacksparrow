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
import SpeechToText from "./speechToText/SpeechToText";
import TextToSpeechTrial from "./TextToSpeechTrial";
import Recommendation from "./Recommendation/Recommendation";

export const UrlContext = createContext();
export const UiContext = createContext();
export const catContext = createContext();


function App() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [cat, setCat] = useState('');
  const [ui, setUi] = useState({
    backgroundColor: '#3F83F8',
    textColor: '#000000',
    fontSizes: {
        h1: 24,
        h2: 20,
        p: 16,
    },
});
  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl }}>
      <UiContext.Provider value={{ ui, setUi }}>
      <catContext.Provider value={{ cat, setCat }}>
        <Router>

          <Routes>
            {/* <Route path="/" element={<Nav />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/detail" element={<ArticleDetail />} />
            <Route path="/speech" element={<SpeechToText />} />
            <Route path="/tts" element={<TextToSpeechTrial />} />
            <Route path="/recommendation" element={<Recommendation />} />

          </Routes>
        </Router>
      </catContext.Provider>
      </UiContext.Provider>
    </UrlContext.Provider>
  );
}

export default App;