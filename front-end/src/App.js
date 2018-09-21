import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      tweets: 'butt'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    axios.get('http://localhost:3000/realDonaldTrump')
      .then(response => this.setState({tweets: response.data[0].full_text}),
      console.log(this.state.tweets));
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
