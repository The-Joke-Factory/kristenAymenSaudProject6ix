import React, { Component } from 'react';
import firebase from './firebase';
import JokeHeader from './JokeHeader';
import JokeEntry from './JokeEntry';
import Vote from './Vote';
import RandomJoke from './RandomJoke';
import JokeFooter from './JokeFooter';
// import Main from './Main';
import './App.css';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

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

  addJoke = (nameInput, jokeInput) => {
    const dbRef = firebase.database().ref();
    dbRef.push({ author: nameInput, joke: jokeInput, upvotes: 0, downvotes: 0 });
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



render() {
    return (
      <div className="App">
        <div className="wrapper">
          <JokeHeader />
          <Router>
            <Route exact path="/">
              <JokeEntry addJoke={this.addJoke}/>
            </Route>
          
            <Route path="/vote">
              <Vote jokes={this.state.jokes} upVoteJoke={this.upVoteJoke} downVoteJoke={this.downVoteJoke}/>
            </Route> 

            <Route path="/random" component={RandomJoke} />
            {/* <Route path="/main" component={Main} /> */}
          </Router>
          
          <JokeFooter />
        </div>
      </div>
    );
  }
}

export default App;