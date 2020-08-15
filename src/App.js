import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <JokeHeader />
      <JokeForm />
      <Vote />
      <RandomJoke />
      <JokeFooter />
    </div>
  );
}

export default App;
