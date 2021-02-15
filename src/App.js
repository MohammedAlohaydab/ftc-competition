import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import firebase from "./firebase"
import HomePageView from './views/homepage/HomePageView';

function App() {
  const [endDate,setEndDate] = useState(null)

  return (
      <div className="App">
        <HomePageView/>
      </div>
  );
}

export default App;
