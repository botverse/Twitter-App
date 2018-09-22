import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8

};

class InfiniteS extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
    tweetHolder: [],
    last_id: null
  };

  componentDidMount() {
    this.loadInitialData()
  }

  fetchMoreData = () => {
    axios.get(`http://localhost:3000/realDonaldTrump?max_id=${this.state.last_id}`)
    .then(response => this.tweets(response));
  };

  loadInitialData = () => {
    axios.get('http://localhost:3000/realDonaldTrump')
    .then(response => this.tweets(response));
  }

  tweets = (input) => {
    console.log(input)
    var arr = this.state.tweetHolder
    for (var i = 0; i < input.data.length; i++) {
      const tweet = input.data[i]
      arr.push(<p key={input.data.length + [i]}>{tweet.created_at}: {tweet.full_text}</p>)
    }
    this.setState({last_id: input.data[19].id_str})
    arr.pop()
    this.setState({tweetHolder: arr})
  }

  render() {
    return (
      <div>
        <h1>D Trumps Twitter</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.tweetHolder.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.tweetHolder.map((i, index) => (
            <div style={style} key={index}>
            {i}
            </div>
          ))}

        </InfiniteScroll>
      </div>
    );
  }
}
export default InfiniteS
