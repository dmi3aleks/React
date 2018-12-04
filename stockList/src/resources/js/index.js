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
      <p>{props.quantity}@{props.price}</p>
    </div>
  );
};

function Order(props) {
  return (
	<tr>
	  <td>{props.instrument}</td>
	  <td>{props.quantity}</td>
	  <td>{props.price}</td>
	  <td>{props.notes}</td>
    </tr>
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
          <h1>Order entry</h1>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Instrument" tag="instcode"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Quantity" tag="quantity"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Price" tag="price"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Notes" tag="notes"/>
          <button className="button" id="btn" onClick={this.handleClick}>Send order</button>
        </div>
        <h1>Orders</h1>
        <ul>
        <table id="orders">
          <tr>
            <th>Instrument</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Notes</th>
          </tr>
          {this.state.orders.map(order =>
            <Order instrument={order.InstrCode} quantity={order.Quantity} price={order.Price} notes={order.Notes} />
          )}
        </table>
        </ul>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("app"));
