import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Stock from './Stock/Stock'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Trading Dashboard</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <Stock name="Sony" price="7800"/>
        </header>
      </div>
    );
  }
}

export default App;
