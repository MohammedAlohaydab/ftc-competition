import "./App.css";
import React, {useEffect, useState} from "react";
import firebase from "./firebase";
import HomePageView from "./views/homePage/homePageView";

import AnswerPageView from './views/answerPgae/answerPageView';
function App() {
  const [endDate, setEndDate] = useState(null);

    const handleCounter = async () => {
        const countDoc = firebase.firestore().collection("docs").doc("count");
        const addOne = firebase.firestore.FieldValue.increment(1);
        await countDoc.update({ userCount: addOne });
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            console.log(firebaseUser)
            if (firebaseUser) {
                alert("anon user");
            } else {
                firebase.auth().signInAnonymously();
                handleCounter();
                alert("new user");
            }
        });
    },[]);

  return (
    <div className="App">
      <header className="App-header">
        <HomePageView />
      </header>
    </div>
  );
}

export default App;
