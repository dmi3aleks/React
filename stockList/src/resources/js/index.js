// Arrow Function for Consideration calculation
const consideration = (price, volume) => {
  let cons = price * volume;
  return cons;
}

class Instrument {
  constructor(name, currentPrice) {
    this.name = name
    this.currentPrice = currentPrice
  }
  getPrice = () => { return this.currentPrice }
}

function Trade(props) {
  return (
    <div className="trade">
      <h1>{props.instr}</h1>
      <p>Price: {props.price}</p>
      <p>Consideration: {props.consid}</p>
    </div>
  );
};

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
              <label for="in">{this.props.input_name}: </label>
              <input id="in" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}/>
            </div>
        )
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    submitInputValue(evt) {
        this.props.onInputUpdate(this.props.input_name, evt.target.value);
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
        this.setState({ orders: order_list });
      });
  }

  handleClick() {
    axios.post('http://localhost:8080/order/add', {
      "instCode": this.state.ord_props.InstrumentCode,
	  "quantity": this.state.ord_props.quantity,
	  "price": this.state.ord_props.price,
      "notes": "ord",
	})
	.then(
		(response) => { console.log(response); this.getOrders() },
		(error) => { console.log(error) }
	);
  }

  render() {
    return (
      <div>
        <h1>Order entry</h1>
	    <TextInput
		   onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="InstrumentCode"/>
	    <TextInput
		   onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="quantity"/>
	    <TextInput
		   onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="price"/>
        <button onClick={this.handleClick}>Send order</button>
        <h1>Orders</h1>
        <ul>
          {this.state.orders.reverse().map(order =>
            <li key={order.OrderID}>#{order.OrderID}: {order.Quantity}@{order.Price} of {order.InstrID}</li>
          )}
        </ul>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));
