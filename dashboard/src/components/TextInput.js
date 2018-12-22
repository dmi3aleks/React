import React, { Component } from 'react';
import './TextInput.css'

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    render() {

        return (
            <div className="HorizontalDiv">
              <label className="Label" id="lab" htmlFor="in">{this.props.input_name}: </label>
              <br />
              <input id={this.props.tag} className="InputOrder" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}/>
            </div>
        )
    }

    updateInputValue(evt) {
      this.setState({
          inputValue: evt.target.value
      });
    }

    submitInputValue(evt) {
      this.props.onInputUpdate(this.props.tag, evt.target.value);
    }
}

export default TextInput;
