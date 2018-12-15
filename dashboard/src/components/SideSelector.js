import React, { Component } from 'react';
import axios from 'axios';
import './Selector.css'

class SideSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          sides: [
            { "name":"Buy",  "code":"B"},
            { "name":"Sell", "code":"S"}
          ]
        }
    }

    componentDidMount() {
        this.props.onInputUpdate(this.props.tag, this.state.sides[0]['code']);
    }

    render() {

        return (
            <div>
              <label className="Label" id="lab" for="sel">Side: </label>
              <br />
              <select className="Select" id="sel" value={this.state.inputValue} onChange={evt => this.submitInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}>
                {this.state.sides.map(side =>
                  <option value={side.name}>{side.name}</option>
                )}
              </select>
            </div>
        )
    }

    submitInputValue(evt) {
      this.setState({
          inputValue: evt.target.value
      });

      const sideIdx = this.state.sides.findIndex(side => side['name'] === evt.target.value)
      const sideCode = this.state.sides[sideIdx]['code']
      this.props.onInputUpdate(this.props.tag, sideCode);
    }
}

export default SideSelector;
