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

  // a function to increment the number of upvotes
  upVoteJoke = (jokeId) => {
    const newJokes = this.state.jokes.map( (joke) => {
      if (joke.id != jokeId) {
        return joke;
      }
      //update and create new joke array with new value for downvotes
      const newJoke = {
        id: jokeId,
        author: joke.author,
        joke: joke.joke,
        created_on: joke.created_on,
        upvotes: joke.upvotes + 1,
        downvotes: joke.downvotes
      };

      // get the joke at this id
      const jokeRef = firebase.database().ref(jokeId); 

      //update the upvotes property of this joke in firebase
      jokeRef.child('upvotes').set(newJoke.upvotes);

      return newJoke;
    });

    this.setState({jokes: newJokes});
  }

    //function to increment the number of downvotes on jokes 
  downVoteJoke = (jokeId) => {
    const newJokes = this.state.jokes.map((joke) => {
      if (joke.id != jokeId) {
        return joke;
      }
      //update and create new joke array with new value for downvotes
      const newJoke = {
        id: joke.id,
        author: joke.author,
        joke: joke.joke,
        created_on: joke.created_on,
        upvotes: joke.upvotes,
        downvotes: joke.downvotes + 1
      };

      // get the joke at this id
      const jokeRef = firebase.database().ref(jokeId); 

      //update the downvotes property of this joke in firebase
      jokeRef.child('downvotes').set(newJoke.downvotes);
      return newJoke;
    });

    this.setState({ jokes: newJokes });
  }

  // pulling all jokes from firebase to display on page
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const newJokesArray = [];

      //restructuring data from firebase into our joke object in order to set state for jokes coming back from firebase
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
        newJokesArray.push(newJoke)
      }
      this.setState({
        jokes: newJokesArray
      });
    })
  }

  // function to grab user input in joke input field, and name input field
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

  // pushing data from joke form to firebase
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
        <label htmlFor="newJoke">What is your name?</label>
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
