import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      tweets: 'butt'
    }
    this.handleClick = this.handleClick.bind(this)
    this.tweets = this.tweets.bind(this)
  }

  handleClick() {
    axios.get('http://localhost:3000/realDonaldTrump')
      .then(response => this.tweets(response));
  }

  tweets(input) {
    const tweetHolder = ['tush']
    console.log(input.data)
    for (var i = 0; i < input.data.length; i++) {
      const tweet = input.data[i]
      tweetHolder.push(<p>{tweet.full_text}</p>)
    }
    this.setState({tweets: tweetHolder})
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Right here</button>
        <p>{this.state.tweets}</p>
      </div>
    )
  }
}

export default App;
