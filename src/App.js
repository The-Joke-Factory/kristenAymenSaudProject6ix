import React, { Component } from 'react';
import firebase from './firebase';
import JokeHeader from './JokeHeader';
import JokeEntry from './JokeEntry';
import Vote from './Vote';
import RandomJoke from './RandomJoke';
import JokeFooter from './JokeFooter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      jokes: [],
      jokeInput: "",
      nameInput: ""
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

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {
      // console.log( snapshot.val() );

      const data = snapshot.val();

      const newJokesArray = [];

      for (let propertyName in data) {
        const record = data[propertyName];
        const newJoke = {
          id: propertyName,
          author: record.author,
          joke: record.joke,
          created_on: record.created_on,
          upvotes: record.upvotes,
          downvotes: record.downvotes
        }
        newJokesArray.push(data[propertyName])
      }

      this.setState({
        jokes: newJokesArray
      });
    })
  }

  handleChange = (event) => {
    if (event.target.id == "newJoke") {
      this.setState({
        jokeInput: event.target.value
      }) 
    } else {
      this.setState({
        nameInput: event.target.value
      })
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push({ author: this.state.nameInput, joke: this.state.jokeInput, upvotes: 0, downvotes: 0 })
  }

render() {
    return (
      <div className="App">
      <JokeHeader />
      <JokeEntry />
      <form action="submit">
        <label htmlFor="newJoke">Add a joke please</label>
        <input onChange={this.handleChange} type="text" id="newJoke"/> 
        <input onChange={this.handleChange} type="text" id="author" />       
        <button onClick={this.handleClick}>Add Joke</button>  
      </form>

      <Vote jokes={this.state.jokes} upVoteJoke={this.upVoteJoke} downVoteJoke={this.downVoteJoke}/>
      <RandomJoke />
      <JokeFooter />
      </div>
    );
  }
}

export default App;