import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Order from './components/Order'
import Trade from './components/Trade'
import TextInput from './components/TextInput'
import InstrumentSelector from './components/InstrumentSelector'
import ServerManager from './components/ServerManager'

const serverHostName = new ServerManager ().getServerHostname();

document.title = "Trading Dashboard";

class App extends React.Component {

  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    orders: [],
    trades: [],
    ord_props: {}
  }

  onNewOrderUpdate(key, value) {
    var ord_p = this.state.ord_props
    ord_p[key] = value
    console.log("onNewOrderUpdate: " + key + ":" + value);
	this.setState({ ord_props: ord_p })
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    this.getOrders()
    this.getTrades()
  }

  getOrders() {
    axios.get(serverHostName + `/order`)
      .then(res => {
        console.log(res.data);
        console.log(res.data.length);
        const order_list = res.data;
        this.setState({ orders: order_list.reverse() });
      });
  }

  getTrades() {
    axios.get(serverHostName + `/trade`)
      .then(res => {
        console.log(res.data);
        console.log(res.data.length);
        const trade_list = res.data;
        this.setState({ trades: trade_list.reverse() });
      });
  }

  handleClick() {
    console.log('Price: ' + this.state.ord_props.price)
    axios.post(serverHostName + '/order/add', {
      "instCode": this.state.ord_props.instcode,
      "quantity": this.state.ord_props.quantity,
      "price": this.state.ord_props.price,
      "notes": this.state.ord_props.notes,
      "side": this.state.ord_props.side,
	})
	.then(
		(response) => { console.log(response); this.refreshData() },
		(error) => { console.log(error) }
	);
  }

  render() {
    return (
      <div>
        <div>
          <h1 id="title">Order entry</h1>
          <InstrumentSelector
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} tag="instcode"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Side" tag="side"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Quantity" tag="quantity"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Price" tag="price"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Notes" tag="notes"/>
          <button className="button" id="btn_send_order" onClick={this.handleClick}>Send order</button>
        </div>
        <ul>
        <div className="mainBlock">
            <div className="floatLeft">
            <h1 id="title">Orders</h1>
            <table id="orders">
              <tr>
                <th>Order ID</th>
                <th>Timestamp</th>
                <th>Inst</th>
                <th>Side</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Filled Quantity</th>
                <th>Fill Price</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
              {this.state.orders.map(order =>
                <Order orderid={order.OrderID} timestamp={order.Timestamp} instrument={order.InstrCode} side={order.Side} quantity={order.Quantity} price={order.Price} quantity_filled={order.QuantityFilled} fill_price={order.FillPrice} status={order.Status} notes={order.Notes} updateView={this.refreshData.bind(this)} />
              )}
            </table>
            </div>
            <div className="floatRight">
            <h1 id="title">Trades</h1>
            <table id="orders">
              <tr>
                <th>Trade ID</th>
                <th>Timestamp</th>
                <th>Order ID</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
              {this.state.trades.map(trade =>
                <Trade tradeid={trade.TradeID} timestamp={trade.Timestamp} orderid={trade.OrderID} quantity={trade.Quantity} price={trade.Price} />
              )}
            </table>
            </div>
        </div>
        </ul>
      </div>
    );
  }

}

export default App;
