import React, { Component } from 'react';

class Vote extends Component {

  // calling the function (upVoteJoke) to increment the joke at this specific id
  handleUpVote = (event) => {
    this.props.upVoteJoke(event.target.id);
  }

  // calling the function (downVoteJoke) to increment the joke at this specific id
  handleDownVote = (event) => {
    this.props.downVoteJoke(event.target.id);
  }

  //sorting the array of jokes in descending order by total number of votes (upvotes - downvotes)
  sortArray = () => {
    let jokesArray = [...this.props.jokes];
    jokesArray.sort((jokeA, jokeB) => {
      const totalVotesA = jokeA.upvotes - jokeA.downvotes;
      const totalVotesB = jokeB.upvotes - jokeB.downvotes;
      if (totalVotesB < totalVotesA) {
        return -1;
      } else if (totalVotesB > totalVotesA) {
        return 1;
      } else {
        return 0;
      }
    });
    return jokesArray;
    
  }

  render() {
    return (
      <div className="jokeBoard">
        <h2>Vote for which joke will stay, and which will go</h2>
        <ul>
          {
            this.sortArray().map( (joke) => {
              const totalVotes = joke.upvotes - joke.downvotes;
              return ( 
                <div>
                  <li key={joke.id} className={(totalVotes < 0 ) ? 'red' : 'green' }>
                    {joke.author} {joke.joke} {joke.created_on}<button onClick={this.handleUpVote} id={joke.id}>upvote</button>
                  <button onClick={this.handleDownVote} id={joke.id}>downvote</button>Total Votes{totalVotes}
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