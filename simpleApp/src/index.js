class StockPrice extends React.Component {

    constructor() {
        super();
        this.state = {
            price: 6988
        };
        this.updatePrice = this.updatePrice.bind(this);
    }

    updatePrice() {
        this.setState({
            price: this.state.price + 1
        });
    }

    render() {
       return (
           <div>
               <h1>Stock price for {this.props.instrument}: {this.state.price}</h1>
               <button onClick={this.updatePrice}>Update</button>
           </div>
       )
    }
}

ReactDOM.render(
    <StockPrice instrument="6758.T" />,
    document.getElementById("root")
);
