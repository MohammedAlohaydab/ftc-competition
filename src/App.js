import "./App.css";
import React, { useState } from "react";
import firebase from "./firebase";
import HomePageView from "./views/homepage/HomePageView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AnswerPageView from "./views/answerPgae/answerPageView";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path="/">
            <HomePageView />
          </Route>
          <Route exact path="/answer">
            <AnswerPageView />
          </Route>
        </header>
      </div>
    </Router>
  );
}

export default App;
