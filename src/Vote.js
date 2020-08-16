import React, { Component } from 'react';

class Vote extends Component {

  handleUpVote = (event) => {
    this.props.upVoteJoke(event.target.id);
  }

  handleDownVote = (event) => {
    this.props.downVoteJoke(event.target.id);
  }

  render() {
    return (
      <div>
        <h2>Vote for which joke will stay, and which will go</h2>
        <ul>
          {
            this.props.jokes.map( (joke) => {
              return ( 
                <div>
                  <li key={joke.id}>{joke.author} {joke.joke} {joke.created_on} {joke.upvotes} <button onClick={this.handleUpVote} id={joke.id}>upvote</button>
                    {joke.downvotes}<button onClick={this.handleDownVote} id={joke.id}>downvote</button>
                  </li>
                </div>
                )
              }
            )
          }
        </ul>  
      </div>
    )
  }
}

export default Vote;