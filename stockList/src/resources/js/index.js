function Instrument(props) {
  return (
    <option value={props.instr_code}>{props.instr_code}</option>
  )
}

function Trade(props) {
  return (
    <div className="trade">
      <h1>{props.instr}</h1>
      <p>{props.quantity}@{props.price}</p>
    </div>
  );
};

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
          <td>{this.props.status}</td>
          <td>{this.props.notes}</td>
          <td onClick={() => this.cancelOrder(this.props.orderid)}><a href="#">Cancel</a></td>
        </tr>
      );
    }

    cancelOrder(orderID) {
      axios.post('http://localhost:8080/order/delete', {
        "orderID": this.props.orderid
	    }).then(res => this.props.updateView());
    }
}

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
              <input id="in" style={{display:'inline'}} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}/>
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
      axios.get(`http://localhost:8080/instruments`)
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
              <label id="lab" for="sel">Instrument: </label>
              <br />
              <select id="sel" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}>
                {this.state.instruments.map(instr =>
                  <Instrument instr_code={instr.InstrCode} />
                )}

              </select>
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

class App extends React.Component {

  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    orders: [],
    ord_props: {}
  }

  onNewOrderUpdate(key, value) {
    var ord_p = this.state.ord_props
    ord_p[key] = value
    console.log("onNewOrderUpdate: " + key + ":" + value);
	this.setState({ ord_props: ord_p })
  }

  componentDidMount() {
    this.getOrders()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  getOrders() {
    axios.get(`http://localhost:8080/order`)
      .then(res => {
        console.log(res.data);
        console.log(res.data.length);
        const order_list = res.data;
        this.setState({ orders: order_list.reverse() });
      });
  }

  handleClick() {
    console.log('Price: ' + this.state.ord_props.price)
    axios.post('http://localhost:8080/order/add', {
      "instCode": this.state.ord_props.instcode,
      "quantity": this.state.ord_props.quantity,
      "price": this.state.ord_props.price,
      "notes": this.state.ord_props.notes,
      "side": this.state.ord_props.side,
	})
	.then(
		(response) => { console.log(response); this.getOrders() },
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
          <button className="button" id="btn" onClick={this.handleClick}>Send order</button>
        </div>
        <h1 id="title">Orders</h1>
        <ul>
        <table id="orders">
          <tr>
            <th>Order ID</th>
            <th>Timestamp</th>
            <th>Instrument</th>
            <th>Side</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Filled Quantity</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
          {this.state.orders.map(order =>
            <Order orderid={order.OrderID} timestamp={order.Timestamp} instrument={order.InstrCode} side={order.Side} quantity={order.Quantity} price={order.Price} quantity_filled={order.QuantityFilled} status={order.Status} notes={order.Notes} updateView={() => this.getOrders()} />
          )}
        </table>
        </ul>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));
