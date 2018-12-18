import React, { Component } from 'react';

class Trade extends Component {

    render() {
      return (
        <tbody>
          <tr>
            <td>{this.props.tradeid}</td>
            <td>{this.props.timestamp}</td>
            <td>{this.props.restingorderid}</td>
            <td>{this.props.incomingorderid}</td>
            <td>{this.props.quantity}</td>
            <td>{this.props.price}</td>
          </tr>
        </tbody>
      );
    }
}

export default Trade;
