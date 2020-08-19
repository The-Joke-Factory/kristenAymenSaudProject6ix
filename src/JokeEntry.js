import React, { Component } from 'react';
import firebase from './firebase';
import Vote from './Vote';
// import { app } from 'firebase';

class JokeEntry extends Component {

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
      if (joke.id !== jokeId) {
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
      if (joke.id !== jokeId) {
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

        // console.log(newJoke);
        newJokesArray.push(newJoke)
      }
      newJokesArray.reverse();
      this.setState({

        jokes: newJokesArray.slice(0, 12)
      });
    })
  }

  // function to grab user input in joke input field, and name input field
  handleChange = (event) => {
    if (event.target.id === "newJoke") {
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
  submitForm = (event) => {
    event.preventDefault();
    // console.log(this.state.jokeInput);
    if (!this.state.jokeInput.match(/^[a-z]+/gi) || !this.state.nameInput.match(/^[a-z]+/gi)){
      alert("Please fill in all text fields");
      return;
    }

    const currentDate = new Date().toDateString();
    // console.log(currentDate);
    

    const dbRef = firebase.database().ref();
    dbRef.push({ author: this.state.nameInput, created_on: currentDate, joke: this.state.jokeInput, upvotes: 0, downvotes: 0 })

    

    
  }

  
  render() {
    console.log(this.state.jokes);
    return (
      <div>
         <form onSubmit={this.submitForm} action="submit">
            <label htmlFor="newJoke">Got a joke? Let's hear it</label>

            <textarea placeholder="Input your joke here" onChange={this.handleChange}  rows="5" cols="50" minLength="6" maxLength="200" id="newJoke" required/> 
            <label htmlFor="newJoke">Who's posting? (incase it sucks)</label>
            <input placeholder="Input your name here" onChange={this.handleChange} maxLength="20" type="text" id="author" required />       
            <button className="addJokeBtn">Add Joke</button>  
          </form>
          <Vote parent="jokeEntry" jokes={this.state.jokes} upVoteJoke={this.upVoteJoke} downVoteJoke={this.downVoteJoke}/>
      </div>
    )
  }
}

export default JokeEntry;