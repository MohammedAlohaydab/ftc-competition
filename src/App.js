import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import firebase from "./firebase"
import HomePageView from './views/homepage/HomePageView';

function App() {
  const [endDate,setEndDate] = useState(null)
  // example; 
  // const ref = firebase.firestore().collection("test") 
  // ref.doc('test2').set({'ok':2})

  return (
      <div className="App">
        <HomePageView/>
      </div>
  );
}

export default App;
