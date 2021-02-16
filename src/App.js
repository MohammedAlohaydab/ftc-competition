import './App.css';
import React, {useState} from 'react'
// import firebase from 'firebase'

import AnswerPageView from './views/answerPgae/answerPageView';
function App() {
  const [endDate,setEndDate] = useState(null)

  return (
    <div className="App">
      <header className="App-header">

    <AnswerPageView/>

      </header>
    </div>
  );
}

export default App;
