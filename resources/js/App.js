import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Map, List } from "immutable"
import Search from "./components/Search"
import Table from "./components/Table"

class App extends Component {
  constructor() {
    super()
    this.state = {
      history: List(),
      errors: Map(),
    }
  }

  handleChange(changedObject) {
    this.setState(changedObject)
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div id="search-col" className="col-md-4">
            <Search
              handleChange={this.handleChange.bind(this)}
              history={this.state.history}
            />
          </div>
          {!this.state.history.isEmpty() && (
            <div id="table-col" className="col-md-4">
              <Table history={this.state.history} />
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default App

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"))
}
