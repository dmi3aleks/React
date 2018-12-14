import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Order from './components/Order'
import Trade from './components/Trade'
import TextInput from './components/TextInput'
import InstrumentSelector from './components/InstrumentSelector'
import ServerManager from './components/ServerManager'
import PriceChart from './components/PriceChart'

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
    tradePrices: [],
    ord_props: {}
  }

  onNewOrderUpdate(key, value) {
    var ord_p = this.state.ord_props
    ord_p[key] = value
    this.setState({ ord_props: ord_p })
    this.getTradesByInstrument(this.state.ord_props.instcode)
  }

  componentDidMount() {
    this.refreshData();
  }


  refreshData() {
    this.getOrders()
    this.getTrades()
    this.getTradesByInstrument(this.state.ord_props.instcode)
  }

  getOrders() {
    axios.get(serverHostName + `/order`)
      .then(res => {
        console.log(res.data);
        console.log(res.data.length);
        const order_list = res.data;
        if (typeof(order_list) != 'string') {
          this.setState({ orders: order_list.reverse() });
        }
      });
  }

  getTrades() {
    axios.get(serverHostName + `/trade`)
      .then(res => {
        console.log(res.data);
        console.log(res.data.length);
        const trade_list = res.data;
        console.log(trade_list);
        console.log(trade_list.length);
        console.log(typeof(trade_list));
        if (typeof(trade_list) != 'string') {
          this.setState({ trades: trade_list.reverse() });
        }
      });
  }

  getTradesByInstrument(instrCode) {
    axios.get(serverHostName + `/trade/byInstr?instCode=` + instrCode)
      .then(res => {
        console.log(res.data);
        console.log(res.data.length);
        const trade_list = res.data;
        this.setState({ tradePrices: trade_list });
      });
  }

  handleClick() {
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

    var selectedTrades = []
    if (this.state.tradePrices.length > 0) {
      selectedTrades = this.state.tradePrices.map(trade => { return {"timestamp": trade.Timestamp, "price": trade.Price}});
    }

    return (
      <div>
        <div className="MainBlock">
        <div className="FloatLeft">
        <div className="OrderEntry">
          <h1 className="Title" id="title">Order entry</h1>
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
          <button className="Button" id="btn_send_order" onClick={this.handleClick}>Send order</button>
        </div>
	    </div>
        <div className="FloatLeft">
          <h1 className= "Title" id="title">Trade prices</h1>
          <PriceChart instrumentCode={this.state.ord_props.instcode} data={selectedTrades}/>
        </div>
        </div>
        <ul>
        <div className="MainBlock">
            <div className="FloatLeft">
            <h1 className= "Title" id="title">Orders</h1>
            <table className="DataTable" id="orders">
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
            <div className="FloatLeft">
            <h1 className="Title" id="title">Trades</h1>
            <table className="DataTable" id="trades">
              <tr>
                <th>Trade ID</th>
                <th>Timestamp</th>
                <th>Resting order ID</th>
                <th>Incoming order ID</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
              {this.state.trades.map(trade =>
                <Trade tradeid={trade.TradeID} timestamp={trade.Timestamp} restingorderid={trade.RestingOrderID} incomingorderid={trade.IncomingOrderID} quantity={trade.Quantity} price={trade.Price} />
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
