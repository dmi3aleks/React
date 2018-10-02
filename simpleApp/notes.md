# A simple app using React.js

Based on the tutorial: "Learn React.js in 5 minutes. A quick introduction to the popular JavaScript library":
https://medium.freecodecamp.org/learn-react-js-in-5-minutes-526472d292f4

## Key takeaways

### JSX

React uses JSX, and it is a syntax extension to JavaScript.

### Key entity of react is a component

You can define a component be extending from a React.Component

### Data

There are two types of data in React: props and state. The difference between the two is a bit tricky to understand in the beginning, so don’t worry if you find it a bit confusing. It’ll become easier once you start working with them.

The key difference is that state is private and can be changed from within the component itself. Props are external, and not controlled by the component itself. It’s passed down from components higher up the hierarchy, who also control the data.

A component can change its internal state directly. It can not change its props directly.

### Functional Components

In React, functional components are a simpler way to write components that only contain a render method and don’t have their own state. Instead of defining a class which extends React.Component, we can write a function that takes props as input and returns what should be rendered. Functional components are less tedious to write than classes, and many components can be expressed this way.

### Debugging

Go to dev mode in Chrome: Ctrl + Shift + I

#### React Devtools extension

The React Devtools extension for Chrome and Firefox lets you inspect a React component tree with your browser’s developer tools.

### CSS

Can be linked to HTML using the link tag:
```
<link rel="stylesheet" href="index.css">
```

## Fetching data from API

Using "fetch" command:

```
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

```

https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
