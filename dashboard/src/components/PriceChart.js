import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class PriceChart extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
    <div>
      <LineChart width={800} height={500} data={this.props.data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="timestamp"/>
        <YAxis domain={['dataMin', 'dataMax']}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line dataKey="price" stroke="#8884d8" activeDot={{r: 1}}/>
      </LineChart>
    </div>
    )
  }

}

export default PriceChart;
