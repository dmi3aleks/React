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

function Trade(props) {
  return (
    <div className="trade">
      <h1>{props.instr}</h1>
      <p>Price: {props.price}</p>
      <p>Consideration: {props.consid}</p>
    </div>
  );
};

var app = (
  <div>
    <Trade instr="Sony" price="7800" consid={consideration(7800,10)}/>
    <Trade instr="Sharp" price="5800"/>
    <Trade instr="NipponRadio" price="8800"/>
  </div>
);

ReactDOM.render(app, document.querySelector('#app'));
