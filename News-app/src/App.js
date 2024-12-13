import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar 
          color='#f11946' 
          height={3} 
          progress={progress} 
        />
        <Routes>
          {/* Dynamic Route Generation */}
          {categories.map((category) => (
            <Route
              key={category}
              exact
              path={category === "general" ? "/" : `/${category}`}
              element={
                <News 
                  setProgress={setProgress} 
                  apiKey={apiKey} 
                  key={category} 
                  pageSize={pageSize} 
                  country="us" 
                  category={category} 
                />
              }
            />
          ))}
          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;




/*render() {
  return (
    <div>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
          </Routes>
      </Router>
    </div>
  )
}*/


