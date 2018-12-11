import React, { Component } from 'react';

class Trade extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <tr>
          <td>{this.props.tradeid}</td>
          <td>{this.props.timestamp}</td>
          <td>{this.props.orderid}</td>
          <td>{this.props.quantity}</td>
          <td>{this.props.price}</td>
        </tr>
      );
    }
}

export default Trade;
