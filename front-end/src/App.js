import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

class App extends Component {
  constructor () {
    super()
    this.state = {
      tweets: 'butt',
      last_tweet: '',
      tweetHolder: [],
      hasMore: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.tweets = this.tweets.bind(this)
    // this.loadMore = this.loadMore.bind(this)
    this.hasMoreItems = this.hasMoreItems.bind(this)
  }

  handleClick() {
    axios.get('http://localhost:3000/realDonaldTrump')
      .then(response => this.tweets(response));
  }

  loadMore() {
    axios.get('http://localhost:3000/realDonaldTrump')
      .then(response => this.tweets(response));

  }

  hasMoreItems() {
    console.log('yes')
    console.log(this.state.tweetHolder.length)
    if(this.state.tweetHolder.length > 49) {this.setState({hasMore: false})}
  }

  tweets(input) {
    // console.log(input.data)
    console.log(this.state.tweetHolder)
    var arr = this.state.tweetHolder
    for (var i = 0; i < input.data.length; i++) {
      const tweet = input.data[i]
      arr.push(<p>{tweet.full_text}</p>)
    }
    this.setState({tweetHolder: arr})
    this.setState({tweets: this.state.tweetHolder})
    this.setState({last_tweet: input.data[19]})
    console.log('change')
  }

  render() {
    return (
          <InfiniteScroll
            dataLength={this.state.tweetHolder.length}
            next={this.loadMore}
            hasMore={true}
            loader={<div className="loader" key={0}>Loading ...</div>}>
            {this.state.tweetHolder}
          </InfiniteScroll>
    )
  }
}

export default App;
