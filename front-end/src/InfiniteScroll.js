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
    tweetHolder: []
  };

  componentDidMount() {
    this.loadData()
  }

  fetchMoreData = () => {
    this.loadData()
  };

  loadData = () => {
    axios.get('http://localhost:3000/realDonaldTrump')
    .then(response => this.tweets(response));
  }

  tweets = (input) => {
    console.log('log')
    var arr = this.state.tweetHolder
    for (var i = 0; i < input.data.length; i++) {
      const tweet = input.data[i]
      arr.push(<p key={input.data.length + [i]}>{tweet.full_text}</p>)
    }
    this.setState({tweetHolder: arr})
    console.log(this.state.tweetHolder)
  }

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
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