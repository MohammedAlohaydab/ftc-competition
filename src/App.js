import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";

import CountUp from "react-countup";

import AnswerPageView from "./views/answerPgae/answerPageView";
import { Box, CircularProgress, LinearProgress } from "@material-ui/core";
import HomePageView from "./views/homePage/homePageView";
import WinnerPageView from "./views/winnerPage/winnerPageView";
import EndingCompPageView from "./views/endingCompPage/endingCompPageView";

const defaultProps = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 5,
  border: 2,
  style: { width: "10em", height: "9rem" },
};

function App({}) {
  const [count, setCount] = useState(null);
  const [endDate, setEndDate] = useState(-1);
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWinner, setWinner] = useState(false);
  const [isComFinished, setComFinished] = useState(false);


  const hourSeconds = 3600;

  const finishCompetition = async () => {
    const comp = firebase.firestore().collection("docs").doc("competition");
    await comp.set({ isFinished: true });
  }

  const endCompIfIsFinished = () => {
    if (endDate === -1) return ;
    let startDate = new Date();
    let finalDate   =  new Date(endDate*1000);
    let secondsLeft = (finalDate.getTime() - startDate.getTime()) / 1000;

    if(secondsLeft <5){
      finishCompetition();
    }
  }

  const setFinalDate = async (timestamp) => {
    const date = firebase.firestore().collection("docs").doc("date");
    await date.set({ date: timestamp });
    setEndDate(timestamp);
  };
  const updateUserCounter = async () => {
    const countDoc = firebase.firestore().collection("docs").doc("userCount");
    const addOne = firebase.firestore.FieldValue.increment(1);
    await countDoc.update({ userCount: addOne });
  };
  useEffect(() => {
    endCompIfIsFinished();

    firebase.auth().onAuthStateChanged(
      (firebaseUser) => {
        if (firebaseUser) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
        setIsLoading(false);
      },
      (err) => {
        alert(err);
      }
    );
    const unsubscribeUserCountListener = firebase
      .firestore()
      .collection("docs")
      .doc("userCount")
      .onSnapshot((result) => {
        setCount(result.data()["userCount"]);

        if (result.data()["isFirst"] && result.data()["userCount"] == 1) {
          let tomorrowTimestamp = new Date().getTime() / 1000 + hourSeconds * 24;
          setFinalDate(tomorrowTimestamp);

          firebase
            .firestore()
            .collection("docs")
            .doc("userCount")
            .set({ isFirst: false }, { merge: true });
        }
      });
    const unsubscribeEndDateListener = firebase
      .firestore()
      .collection("docs")
      .doc("date")
      .onSnapshot((result) => {
        setEndDate(result.data()["date"]);
        endCompIfIsFinished();
      });

    const unsubscribeisFinishedListener = firebase
        .firestore()
        .collection("docs")
        .doc("competition")
        .onSnapshot((result) => {
          setComFinished(result.data()["isFinished"]);
        });

    return () => {
      unsubscribeUserCountListener();
      unsubscribeEndDateListener();
      unsubscribeisFinishedListener();
    };
  }, []);

  const handleLoading = (shouldLoad) => {
    setIsLoading(shouldLoad);
  };

  const isPageLoading = () => count === null || isSignedIn == null || isLoading ||endDate===-1;

  const PageContent = () => {
    if (count == null || isSignedIn == null) {
      return <h1> جاري التحميل... </h1>;
    }

    if (isComFinished){
      return <EndingCompPageView/>
    }
    else if (isSignedIn & !isWinner) {
      return <AnswerPageView
          setWinner={setWinner}
          date={endDate}// lazy guy xd!
          updateEndDate={setFinalDate}
          setLoading={handleLoading}
          endCompIfIsFinished={endCompIfIsFinished}/>;
    }
    else if(isWinner){
      return <WinnerPageView/>;
    }
    else {
      return (
        <HomePageView
          updateCounter={updateUserCounter}
          setLoading={handleLoading}
        />
      );
    }
  };

  return (
    <div className="App">
      {isPageLoading() && <LinearProgress />}

      <header className="App-header">
        <img src={"/static/images/ftcLogoWhiteNoText.png"}></img>

        {(!isPageLoading() && !isWinner && !isComFinished) && (
          <Box borderRadius="7%" {...defaultProps}>
            <h4 style={{ color: "black" }}>
              عدد الواصلين: <CountUp end={count} />{" "}
            </h4>
          </Box>
        )}
        <PageContent />
      </header>
    </div>
  );
}

export default App;
