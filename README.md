# React-Handling-Events

## Handling Events in Class Components

```js
import { Component } from 'react'

class Toggle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isToggle: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState((state) => ({
      isToggle: !state.isToggle
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <span>
          toggle is: {this.state.isToggle ? 'ON' : 'OFF'}
        </span>
      </div>
    )
  }
}

export default Toggle;
```

You have to be careful about the meaning of `this` in JSX callbacks, in Javascript class methods are not `bound` by default. If you forget to bind `this.handleClick` and pass it to `onClick`, this will be `undefined` when the function is actually called.

This is not React specific behaviour, it is a part of how **functions work in Javascript** Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}` You should bind that method.

If binding annoys you, there are two ways you can get around this. If you are using experimental `public class fiels syntax`, you can use class fields to correctly bind callbacks.

This syntax is enabled by default in `Create React App`

```js
import { Component } from 'react'

class LoginButton extends Component {
  // This syntax ensures this is bound within handleClick
  // warning: this is experimental syntax
  
  handleClick = () => {
    console.log('this is:', this)
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>
        Click Me
      </button>
    )
  }
}
```

If you aren't using class fields syntax, you can use an arrow function in the callback.

```js
import { Component } from 'react'

class LoginButton extends Component {
  handleClick() {
    console.log('this is:', this)
  }
  
  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Click Me
      </button>
    )
  }
}
```

The problem with this syntax, is that a different callback is created each time the `LoginButton` renders. In most cases, this is fine. However if this callback, is passed as a prop to lower components. those component might do an extra `re-rendering`, 

**We generally, recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.**
