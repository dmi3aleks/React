class StockPrice extends React.Component {

    constructor() {
        super();
        this.state = {
            price: 6988,
            stockCode: 'GOOGL'
        };
        this.updateStockCode = this.updateStockCode.bind(this);
        this.updatePrice();
    }

    updateStockCode(newStockCode) {
        if (newStockCode === this.state.stockCode) {
            console.log('Same stock code:' + newStockCode);
            return;
        }
        console.log('New stock code:' + newStockCode);
        this.setState({
            stockCode: newStockCode
        });
        this.updatePrice();
    }

    updatePrice() {
        console.log('getPrice running: ' + this.state.stockCode);
        var URL = `https://www.alphavantage.co/query?apikey=UEW52BCFH9Z5FMD7&function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stockCode}`;
        console.log(URL);
        fetch(URL)
            .then(results => { return results.json(); } )
            .then(data => {
                var timeSeries = data["Time Series (Daily)"];
                console.log(timeSeries);
                var prices = [];
                for(var key in timeSeries) {
                    prices.push(key + " : " + timeSeries[key]["1. open"] + " \n");
                }
                console.log('New price: ' + prices[0]);
                this.setState({price:prices[0]});
            })
    }

    render() {
       return (
           <div>
               <h1>Stock price for {this.state.stockCode}: {this.state.price}</h1>
               <button onClick={() => this.updatePrice()}>Update</button>
               <TextInput
                   onStockCodeUpdate={(stockCode) => this.updateStockCode(stockCode)}/>
           </div>
       )
    }
}

class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    render() {

        return (
            <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
        )
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
        this.props.onStockCodeUpdate(evt.target.value);
    }
}

ReactDOM.render(
    <StockPrice instrument="6758.T" />,
    document.getElementById("root")
);
