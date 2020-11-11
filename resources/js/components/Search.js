import React, { Component } from "react"
import axios from "axios"
import { Map, List } from "immutable"
import isEmpty from "../validation/isEmpty"

class Search extends Component {
  constructor() {
    super()
    this.state = {
      userInput: "",
    }
  }
  getNutritionInfo() {
    const data = { userInput: encodeURI(this.state.userInput) }
    axios
      .post("http://nutritionion.test/api/nutrition", data)
      .then((res) => {
        const data = Map(res.data)
        console.log(data)
        // If the data's total nutrients is empty, the ingredient is not valid.
        if (isEmpty(data.get("totalNutrients"))) {
          // Add the error to state
          this.setState({
            errors: this.state.errors.set(
              "invalidIngredient",
              "The ingredient requested is not valid"
            ),
          })
        } else {
          // Update the state's history by pushing the data onto the history stack.
          this.props.handleChange({ history: this.props.history.push(data) })
        }
      })
      // Catch any errors and log them to console.
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <div className="container justify-content-center align-content-center">
        <div className="row text-center justify-content-center">
          <h1>Get Nutritional Information</h1>
        </div>
        <div className="row justify-content-center">
          <form className="form-inline">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => this.setState({ userInput: e.target.value })}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                this.getNutritionInfo()
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Search
