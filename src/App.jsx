import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Authentication from "./user/Authentication";
import Home from "./Home/Home";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
