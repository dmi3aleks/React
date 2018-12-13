import React, { Component } from 'react';
import axios from 'axios';
import Instrument from './Instrument'
import ServerManager from './ServerManager'
import './InstrumentSelector.css'

const serverHostName = new ServerManager ().getServerHostname();

class InstrumentSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            instruments: []
        }
    }

    componentDidMount() {
      this.getInstruments()
    }

    getInstruments() {
      axios.get(serverHostName + `/instruments`)
        .then(res => {
          console.log(res.data);
          console.log(res.data.length);
          const inst_list = res.data;
          this.setState({ instruments: inst_list });
          // initialize the instrument with the first instrument available
          this.props.onInputUpdate(this.props.tag, this.state.instruments[0].InstrCode);
        });
    }

    render() {

        return (
            <div>
              <label className="Label" id="lab" for="sel">Instrument: </label>
              <br />
              <select className="Select" id="sel" value={this.state.inputValue} onChange={evt => this.submitInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}>
                {this.state.instruments.map(instr =>
                  <Instrument instr_code={instr.InstrCode} />
                )}

              </select>
            </div>
        )
    }

    submitInputValue(evt) {
      this.setState({
          inputValue: evt.target.value
      });
      this.props.onInputUpdate(this.props.tag, evt.target.value);
    }
}

export default InstrumentSelector;
