import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('ass')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Right here</button>
      </div>
    )
  }
}

export default App;
