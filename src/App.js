import React, { Component } from "react";
import axios from "axios";
import Table from "./components/Table";
import { Map, List } from "immutable";
import classNames from "classnames";
import validateUserInput from "./validation/userInput";

class App extends Component {
  /**
   * Initialises the state for the App class
   * @constructor
   */
  constructor() {
    // Calling the constructor of the parent class to initialise the "this.props" object.
    super();
    // Initialising state
    this.state = {
      userInput: "",
      history: List(),
      inputErrors: Map(),
    };
  }

  /**
   * Updates the state when a change occurs
   * @param {Object} changedObject - The object that is added to state.
   * @returns {void}
   */
  handleChange(changedObject) {
    this.setState(changedObject);
  }

  /**
   * Fetches the nutrition information of the requested ingredient.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The mouse event, e.g. a clicked button.
   * @returns {void}
   */
  getNutritionInfo(e) {
    // Validate the user input
    const { inputErrors, noInputErrors } = validateUserInput(
      this.state.userInput
    );

    const data = { userInput: encodeURI(this.state.userInput) };

    // If there are errors set the error to state
    if (!noInputErrors) {
      this.setState({ inputErrors: inputErrors });
      // Do not make an API call if there are errors.
      return;
    } else {
      // Set the state's inputErrors entry to an empty map
      this.setState({ inputErrors: Map() });

      axios
        .post("http://localhost:5000/api/nutrition/", data)
        .then((res) => {
          // Update the state's history by pushing the response onto the stack.
          // The response is converted into an immutable Map to ensure that the data stays consistent.
          this.setState({ history: this.state.history.push(Map(res.data)) });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-4">
            <h1 className="display4 text-center">Get Nutrition Information</h1>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-4">
            <div className="input-group mb-3">
              <input
                type="text"
                // The classnames module allows for conditional classes
                className={classNames("form-control", {
                  // Only add the "is-invalid" class if there are input errors.
                  "is-invalid": !this.state.inputErrors.isEmpty(),
                })}
                placeholder="Ingredient"
                aria-label="Ingredient Input"
                onChange={(e) =>
                  // Updates the state with the user's input
                  this.handleChange({
                    userInput: e.target.value,
                  })
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  onClick={(e) => {
                    // Retrieve the nutrition information for the ingredient when the button is clicked.
                    this.getNutritionInfo(e);
                  }}
                >
                  Button
                </button>
              </div>
              {
                // If there are input errors, display them underneath the input group
                !this.state.inputErrors.isEmpty() && (
                  <div className="invalid-feedback">
                    {
                      // Display the latest input error.
                      this.state.inputErrors.last()
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <h1 className="display4 text-center">Results</h1>
        </div>
        <div className="row justify-content-center align-items-center">
          {/* Display the results table */}
          <Table history={this.state.history} />
        </div>
      </div>
    );
  }
}

export default App;
