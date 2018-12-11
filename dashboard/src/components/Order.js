import React, { Component } from 'react';
import axios from 'axios';
import ServerManager from './ServerManager'

const serverHostName = new ServerManager ().getServerHostname();

class Order extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <tr>
          <td>{this.props.orderid}</td>
          <td>{this.props.timestamp}</td>
          <td>{this.props.instrument}</td>
          <td>{this.props.side}</td>
          <td>{this.props.quantity}</td>
          <td>{this.props.price}</td>
          <td>{this.props.quantity_filled}</td>
          <td>{this.props.fill_price}</td>
          <td id="order_status">{this.props.status}</td>
          <td id="order_notes">{this.props.notes}</td>
          <td id="order_cancel" onClick={() => this.cancelOrder(this.props.orderid)}><a href="#">Cancel</a></td>
        </tr>
      );
    }

    cancelOrder(orderID) {
      axios.post(serverHostName + '/order/delete', {
        "orderID": this.props.orderid
	    }).then(res => this.props.updateView());
    }
}

export default Order;
