function Trade(props) {
  return (
    <div className="trade">
      <h1>{props.instr}</h1>
      <p>Price: {props.price}</p>
    </div>
  );
};

var app = (
  <div>
    <Trade instr="Sony" price="7800"/>
    <Trade instr="Sharp" price="5800"/>
    <Trade instr="NipponRadio" price="3800"/>
  </div>
);

ReactDOM.render(app, document.querySelector('#app'));
