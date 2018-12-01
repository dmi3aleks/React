/*import React, {Component} from 'react';

class Stock extends Component {

}*/
import React, {Component} from 'react';

const Stock = (props) => {
    return <p>{props.name}: {props.price}</p>
};

export default Stock;