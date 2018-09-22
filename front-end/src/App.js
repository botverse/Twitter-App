import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'

class App extends Component {
  constructor () {
    super()
    this.props = {
      tweetHolder: '[]'
    }
    this.state = {
      tweets: 'butt',
      last_tweet: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.tweets = this.tweets.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  handleClick() {
    axios.get('http://localhost:3000/realDonaldTrump')
      .then(response => this.tweets(response));
  }

  loadMore() {
    axios.get('http://localhost:3000/realDonaldTrump')
      .then(response => this.tweets(response));

  }

  tweets(input) {
    console.log(input.data)
    console.log(this.props.tweetHolder)
    var arr = this.props.tweetHolder
    for (var i = 0; i < input.data.length; i++) {
      const tweet = input.data[i]
      arr.push(<p>{tweet.full_text}</p>)
    }
    this.props.tweetHolder = arr
    this.setState({tweets: this.props.tweetHolder})
    this.setState({last_tweet: input.data[19]})
    console.log('change')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Right here</button>
        <p>{this.state.tweets}</p>
          <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore()}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}
          useWindow={false}
          />
      </div>
    )
  }
}

export default App;
