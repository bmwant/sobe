import React, { Component } from 'react';
import logo from './logo.svg';
import QuestionBox from './Question';
import InfoBox from './Info';
import './App.css';
import '../node_modules/bulma/css/bulma.css';

class App extends Component {
  render() {
    return (
      <div className="App columns">
        <div className="column is-two-thirds">
          <QuestionBox question="Some question"/>
        </div>
        <div className="column">
          <InfoBox info="Some info"/>
        </div>
      </div>
    );
  }
}

export default App;
