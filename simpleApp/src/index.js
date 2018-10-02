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
               <Background />
           </div>
       )
    }
}

class Background extends React.Component {

    constructor() {
        super();
        this.state = {
            prices: [],
        };
    }

    componentDidMount() {
        fetch('https://www.alphavantage.co/query?apikey=UEW52BCFH9Z5FMD7&function=TIME_SERIES_DAILY_ADJUSTED&symbol=GOOGL')
            .then(results => { return results.json(); } )
            .then(data => {
                var timeSeries = data["Time Series (Daily)"];
                console.log(timeSeries);
                var prices = [];
                for(var key in timeSeries) {
                    console.log(key + " : " + timeSeries[key]["1. open"]);
                    prices.push(key + " : " + timeSeries[key]["1. open"] + " \n");
                }
                this.setState({prices:prices});
            })
    }

    render() {
        return (
            <div className="container">
                {this.state.prices}
            </div>
        )
    }
}

ReactDOM.render(
    <StockPrice instrument="6758.T" />,
    document.getElementById("root")
);
