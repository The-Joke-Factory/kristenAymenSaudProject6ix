import React from 'react';
import JokeHeader from './JokeHeader';
import JokeEntry from './JokeEntry';
import Vote from './Vote';
import RandomJoke from './RandomJoke';
import JokeFooter from './JokeFooter';
import './App.css';

function App() {
  return (
    <div className="App">
      <JokeHeader />
      <JokeEntry />
      <Vote />
      <RandomJoke />
      <JokeFooter />
    </div>
  );
}

export default App;
