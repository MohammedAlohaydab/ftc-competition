import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import HomePageView from "./views/homePage/homePageView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CountUp from 'react-countup';

import AnswerPageView from "./views/answerPgae/answerPageView";

require('firebase/auth')

function App() {
  const [count, setCount] = useState(0);
  const [endDate, setEndDate] = useState(null);

    const handleCounter = async () => {
        const countDoc = firebase.firestore().collection("docs").doc("userCount");
        const addOne = firebase.firestore.FieldValue.increment(1);
        await countDoc.update({ userCount: addOne });
    };

    const handleNewUser = () => {
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // alert("anon user");
        } else {
            firebase.auth().signInAnonymously();
            handleCounter();
            // alert("new user");
        }
    });
    }

  useEffect(() => {
    handleNewUser();

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

  return (
    <Router>
      <div className="App">
          <header className="App-header">

              <img src={"/static/images/ftcLogoWhiteNoText.png"}></img>
              <h5> <CountUp end={count} /> عدد الواصلين </h5>

          <Route exact path="/home">
            <HomePageView />
          </Route>
          <Route exact path="/">
            <AnswerPageView />
          </Route>
        </header>
      </div>
    </Router>
  );
}

export default App;
