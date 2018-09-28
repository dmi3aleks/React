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
