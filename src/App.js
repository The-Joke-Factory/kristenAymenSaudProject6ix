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
          <div className="links">
            <Link to="/">
              <button className="btn">Add a Joke</button>
            </Link> 
            <Link to="/voteForJoke">
              <button className="btn">Vote on Jokes</button>
            </Link>
            <Link to="/generateJoke">
              <button className="btn">Get Random Joke</button>
            </Link>
          </div>
          <Route exact path="/" component={JokeEntry} /> 
          <Route exact path="/voteForJoke" component={VoteOldJoke} />
          <Route path="/generateJoke" exact component={RandomJoke} />
        </div>
      </div>
        <JokeFooter />
      </Router>
    );
  }
}

export default App;