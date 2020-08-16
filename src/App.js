
import React, { Component } from 'react';
import JokeHeader from './JokeHeader';
import JokeEntry from './JokeEntry';
import Vote from './Vote';
import RandomJoke from './RandomJoke';
import JokeFooter from './JokeFooter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const jokes = [
      {
        id: 1,
        author: "John Doe",
        joke: "knock knock...",
        created_on: "2020/08/15",
        upvotes: 1,
        downvotes: 3,
      },
      {
        id: 2,
        author: "Jane Doe",
        joke: "who's there...",
        created_on: "2020/08/16",
        upvotes: 2,
        downvotes: 4,
      },
      {
        id: 3,
        author: "Amanda Smith",
        joke: "chicken...",
        created_on: "2020/08/17",
        upvotes: 4,
        downvotes: 1,
      },
      {
        id: 4,
        author: "Jane Austen",
        joke: "chicken who...",
        created_on: "2020/08/15",
        upvotes: 4,
        downvotes: 6,
      }
    ];

    this.state = { 
      jokes: jokes
    };
  }

  upVoteJoke = (jokeId) => {
    const newJokes = this.state.jokes.map( (joke) => {
      if (joke.id != jokeId) {
        return joke;
      }
      const newJoke = {
        id: joke.id,
        author: joke.author,
        joke: joke.joke,
        created_on: joke.created_on,
        upvotes: joke.upvotes + 1,
        downvotes: joke.downvotes
      };
      return newJoke;
    });

    this.setState({jokes: newJokes});
  }

  downVoteJoke = (jokeId) => {
    const newJokes = this.state.jokes.map((joke) => {
      if (joke.id != jokeId) {
        return joke;
      }
      const newJoke = {
        id: joke.id,
        author: joke.author,
        joke: joke.joke,
        created_on: joke.created_on,
        upvotes: joke.upvotes,
        downvotes: joke.downvotes + 1
      };
      return newJoke;
    });

    this.setState({ jokes: newJokes });
  }

render() {
    return (
      <div className="App">
       <JokeHeader />
      <JokeEntry />
        <Vote jokes={this.state.jokes} upVoteJoke={this.upVoteJoke} downVoteJoke={this.downVoteJoke}/>
       <RandomJoke />
      <JokeFooter />
      </div>
    );
  }
}

export default App;
