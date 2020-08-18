import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <JokeHeader />
      <JokeEntry addJoke={this.addJoke} />
      <Vote jokes={this.state.jokes} upVoteJoke={this.upVoteJoke} downVoteJoke={this.downVoteJoke} />
      <JokeFooter />
    )
  }
}

export default Main;