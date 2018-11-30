# Notes on the Stock List app

This app is inspired by the following course:

<https://www.udemy.com/react-the-complete-guide-incl-redux>

## Key properties of React.js

Is used for SPA (Single-Page Applications) in which there is only one HTML page, and the content is re-rendered on the client.

Typically there is a single root React component ("app") that encapsulates all the other components.
It is therefore typical to have only one call to ReactDOM.render().

## Notes on New Generation JavaScript

### Spread syntax (...)

Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

```
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
```

### Rest syntax (...)

Rest syntax looks exactly like spread syntax, but is used for destructuring arrays and objects. In a way, rest syntax is the opposite of spread syntax: spread 'expands' an array into its elements, while rest collects multiple elements and 'condenses' them into a single element.

```
function sumAll(...args) { // args is the name for the array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
```

### Destructuring

Allows extraction of elements from arrays or attriutes from objects.

### Array functions

```
const nums = [1,2,3]
const numsSquare = nums.map((n) => { return Math.pow(n, 2) })
console.log(numsSquare)
```

Some other functions are:
  * find;
  * reduce;
  * slice.

## Build Workflow

Projects are managed using a build workflow. It enables code optimization and usage of a next-gen JavaScript.

This includes:
  * Dependency Manager: E.g. npm, to pull in all the required libraries;
  * Bundler: E.g. Webpack, to bundle all the files into one (to support older browsers);
  * Compiler for a Next-Gen JavaScript: E.g. Babel;
  * Development Server: a test web server to test application on our own machine.

### Installing create-react-app

To install the create-react-app tool:
```
curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
sudo yum remove -y nodejs npm
sudo dnf install nodejs
sudo npm install -g create-react-app
```

Check versions:
```
npm --version
node --version
```

### Making an app

```
create-react-app dashboard
npm start
```
