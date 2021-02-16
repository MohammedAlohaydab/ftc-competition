import "./App.css";
import React, { useState } from "react";
import firebase from "./firebase";
import HomePageView from "./views/homepage/HomePageView";

import AnswerPageView from './views/answerPgae/answerPageView';
function App() {
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <HomePageView />
      </header>
    </div>
  );
}

export default App;
