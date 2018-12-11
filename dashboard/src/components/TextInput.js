import React, { Component } from 'react';

class TextInput extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            inputValue: ''
        }
    }

    render() {

        return (
            <div>
              <label id="lab" for="in">{this.props.input_name}: </label>
              <br />
              <input id={this.props.tag} className="input_order" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}/>
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
