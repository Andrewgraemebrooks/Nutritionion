import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Map, List } from "immutable"
import Search from "./components/Search"
import Table from "./components/Table"

class App extends Component {
  /**
   * Initialises the state for the App class
   * @constructor
   */
  constructor() {
    super()
    this.state = {
      history: List(),
      errors: Map(),
    }
  }

  /**
   * Updates the state when a change occurs
   * @param {Object} changedObject - The object that is added to state.
   * @returns {void}
   */
  handleChange(changedObject) {
    this.setState(changedObject)
  }

  render() {
    return (
      <div className="row">
        <React.Fragment>
          <Search
            handleChange={this.handleChange.bind(this)}
            history={this.state.history}
          />
          <Table history={this.state.history} />
        </React.Fragment>
      </div>
    )
  }
}

export default App

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"))
}
