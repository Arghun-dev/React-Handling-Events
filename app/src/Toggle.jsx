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