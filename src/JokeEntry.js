import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class JokeEntry extends Component {

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
    this.props.addJoke(this.state.nameInput, this.state.jokeInput);
  }

  render() {
    return (
      <form action="submit">
        <label htmlFor="newJoke">Got a joke? Let's hear it</label>
        <input onChange={this.handleChange} type="text" id="newJoke" />
        <label htmlFor="newJoke">Who's posting? (incase it sucks)</label>
        <input onChange={this.handleChange} type="text" id="author" />
        <Link to={"/vote"}><button className="addJokeBtn" onClick={this.handleClick}>Add Joke</button></Link>
      </form>
    )
  }
}

export default JokeEntry;



