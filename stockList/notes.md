# Notes on the Stock List app

This app is inspired by the following course:

<https://www.udemy.com/react-the-complete-guide-incl-redux>

## Key properties of React.js

Is used for SPA (Single-Page Applications) in which there is only one HTML page, and the content is re-rendered on the client.

Typically there is a single root React component ("app") that encapsulates all the other components.
It is therefore typical to have only one call to ReactDOM.render().

Components are the core building block of React apps. Actually, React really is just a library for creating components in its core.

A typical React app therefore could be depicted as a component tree - having one root component ("App") and then an potentially infinite amount of nested child components.

Each component needs to return/ render some JSX code - it defines which HTML code React should render to the real DOM in the end.

JSX is NOT HTML but it looks a lot like it. Differences can be seen when looking closely though (for example className in JSX vs class in "normal HTML"). JSX is just syntactic sugar for JavaScript, allowing you to write HTMLish code instead of nested React.createElement(...) calls.

When creating components, you have the choice between two different ways:

  * Functional components (also referred to as "presentational", "dumb" or "stateless" components - more about this later in the course) => const cmp = () => { return <div>some JSX</div> } (using ES6 arrow functions as shown here is recommended but optional)
  * Class-based components (also referred to as "containers", "smart" or "stateful" components) => class Cmp extends Component { render () { return <div>some JSX</div> } } 

The best practice is to use functional components if possible.

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
