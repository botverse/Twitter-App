import React from "react";
// import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import styles from './style.css.js'
import './App.css'

class App extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
    tweetHolder: [],
    last_id: null,
    current_handle: 'realDonaldTrump'
  };

  componentDidMount() {
    this.loadTrumpData()
  }

  fetchMoreData = () => {
    axios.get(`http://localhost:3000/${this.state.current_handle}?max_id=${this.state.last_id}`)
    .then(response => this.tweets(response));
  };

  loadTrumpData = () => {
    this.setState({tweetHolder: []})
    axios.get('http://localhost:3000/realDonaldTrump')
    .then(response => this.tweets(response));
  }

  loadMuskData = () => {
    this.setState({tweetHolder: []})
    axios.get('http://localhost:3000/elonmusk')
    .then(response => this.tweets(response))
  }

  tweets = (input) => {
    console.log(input.data[0].user.screen_name)
    var arr = this.state.tweetHolder
    for (var i = 0; i < input.data.length; i++) {
      const tweet = input.data[i]
      arr.push(<p className="button" key={input.data.length + [i]}>{tweet.created_at}: {tweet.full_text}</p>)
    }
    this.setState({current_handle: input.data[0].user.screen_name})
    this.setState({last_id: input.data[19].id_str})
    arr.pop()
    this.setState({tweetHolder: arr})
  }

  render() {
    return (
      <div>
        <header className="App-Header">
        <button className="button" onClick={this.loadTrumpData}> D Trump </button>
        <button className="button" onClick={this.loadMuskData}> E Musk </button>
        </header>
        <hr />
        <InfiniteScroll
          dataLength={this.state.tweetHolder.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div>
          {this.state.tweetHolder.map((i, index) => (
            <div key={index} className="tweets">
            {i}
            </div>

          ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
export default App
