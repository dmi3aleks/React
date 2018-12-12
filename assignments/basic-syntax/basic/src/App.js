import React, { Component } from 'react';
import './App.css';

class UserInput extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      return <input className="UserInput" onChange={this.props.updateInput} value={this.props.username}></input>
  }

}

class UserOutput extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      const style = {
        color: 'green'
      };
      return (
        <div>
          <p style={style}>Username:</p>
          <p style={style}>{this.props.username}</p>
        </div>
      )
  }

}

class App extends Component {

  state = {
    username: "Admin"
  }

  updateUsername(event) {
    this.setState({username: event.target.value})
  }

  render() {
    return (
      <div className="App"> <UserInput  username={this.state.username} updateInput={this.updateUsername.bind(this)} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
      </div>
    );
  }
}

export default App;
