import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CountUp from "react-countup";

import AnswerPageView from "./views/answerPgae/answerPageView";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import HomePageView from "./views/homePage/homePageView";

function App({}) {
  const [count, setCount] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hourSeconds = 3600;

  const updateFinalDate = async () => {
    const date = firebase.firestore().collection("docs").doc("date");
    let tomorrowTimestamp= (new Date().getTime()/1000) + (hourSeconds*24);
    await date.set({ date: tomorrowTimestamp});
    setEndDate(tomorrowTimestamp);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
      setIsLoading(false);
    });

    const unsubscribeUserCountListener = firebase
      .firestore()
      .collection("docs")
      .doc("userCount")
      .onSnapshot((result) => {
        setCount(result.data()["userCount"]);
      });
    const unsubscribeEndDateListener = firebase
      .firestore()
      .collection("docs")
      .doc("date")
      .onSnapshot((result) => {
        setEndDate(result.data()["date"]);
      });



    return () => {
      unsubscribeUserCountListener();
      unsubscribeEndDateListener();
    };
  }, []);

  const handleLoading = (shouldLoad) => {
    setIsLoading(shouldLoad);
  };

  const isPageLoading = () => count === null || isSignedIn == null || isLoading;

  const PageContent = () => {
    if (count == null || isSignedIn == null) {
      return <h1> جاري التحميل... </h1>;
    }
    if (isSignedIn) {
      return <AnswerPageView setLoading={handleLoading}/>;
    } else {
      return <HomePageView setLoading={handleLoading} />;
    }
  };
  return (
    <div className="App">
      {isPageLoading() && <LinearProgress />}

      <header className="App-header">
        {!isPageLoading() && <h1> عدد الواصلين {count}</h1>}
        <PageContent />
      </header>
    </div>
  );
}

export default App;
