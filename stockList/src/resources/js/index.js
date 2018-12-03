//import {consideration} from './calc.js'

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

let inst = new Instrument('Sony', '7800')
console.log(inst.getPrice())

const inst_details = {
    // use Spread syntax to extract a flat map of properties from inst
    ...inst,
    type: 'equity'
}

console.log(JSON.stringify(inst_details))

const nums = [1,2,3]
const numsSquare = nums.map((n) => { return Math.pow(n, 2) })
console.log(numsSquare)


function Trade(props) {
  return (
    <div className="trade">
      <h1>{props.instr}</h1>
      <p>Price: {props.price}</p>
      <p>Consideration: {props.consid}</p>
    </div>
  );
};

class App extends React.Component {

  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    orders: []
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.getOrders(), 1000);
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

  render() {
    return (
      <div>
        <h1>Orders:</h1>
        <ul>
          {this.state.orders.map(order =>
            <li key={order.OrderID}>#{order.OrderID}: {order.Quantity}@{order.Price} of {order.InstrID}</li>
          )}
        </ul>
      </div>
    );
  }

  handleClick() {
    console.log("Click")
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
