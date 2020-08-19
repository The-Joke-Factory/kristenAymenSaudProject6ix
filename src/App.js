import React, { Component } from 'react';
import JokeHeader from './JokeHeader';
import JokeEntry from './JokeEntry';
import RandomJoke from './RandomJoke';
import JokeFooter from './JokeFooter';
import VoteOldJoke from './VoteOldJoke'
import {
  BrowserRouter as Router,
  Route, Link } from 'react-router-dom';

import './App.css';


class App extends Component {
  
render() {
    return (
      <Router>
      <div className="App">
        <div className="wrapper">
          <JokeHeader />

          <Link to="/generateJoke">Random Joke</Link>
          <Link to="/">Add Joke</Link>
          <Link to="/voteForJoke">Vote for a Joke</Link>
          <Route exact path="/kristenAymenSaudProject6ix" component={JokeEntry} />
        
          <Route exact path="/voteForJoke" component={VoteOldJoke} />
          <Route path="/generateJoke" exact component={RandomJoke} />
          <JokeFooter />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;