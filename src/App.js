import React, { Component } from "react";
import axios from "axios";
import Table from "./components/Table";
import { Map, List } from "immutable";
import classNames from "classnames";
import validateUserInput from "./validation/userInput";
import isEmpty from "./validation/isEmpty";

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
      errors: Map(),
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
    const { errors, noErrors } = validateUserInput(this.state.userInput);

    const data = { userInput: encodeURI(this.state.userInput) };

    // If there are errors set the error to state
    if (!noErrors) {
      this.setState({ errors: errors });
      // Do not make an API call if there is an input error.
      return;
    } else {
      // Reset the state's errors to an empty map
      this.setState({ errors: Map() });
      axios
        .post("http://localhost:5000/api/nutrition/", data)
        .then((res) => {
          const data = Map(res.data);

          // If the data's total nutrients is empty, the ingredient is not valid.
          if (isEmpty(data.get("totalNutrients"))) {
            // Add the error to state
            this.setState({
              errors: this.state.errors.set(
                "invalidIngredient",
                "The ingredient requested is not valid"
              ),
            });
          } else {
            // Update the state's history by pushing the data onto the history stack.
            this.setState({ history: this.state.history.push(data) });
          }
        })
        // Catch any errors and log them to console.
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="container justify-content-center align-items-center">
          {/* Website Title */}
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-4">
              <h1 className="display4 text-center">
                Get Nutrition Information
              </h1>
            </div>
          </div>
          {/* The Input Area */}
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <input
                  type="text"
                  // The classnames module allows for conditional classes
                  className={classNames("form-control", {
                    // Only add the "is-invalid" class if there are input errors.
                    "is-invalid": !this.state.errors.isEmpty(),
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
                  !this.state.errors.isEmpty() && (
                    <div className="invalid-feedback">
                      {
                        // Display the latest input error.
                        this.state.errors.last()
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          {/* The Results Title */}
          <div className="row justify-content-center align-items-center">
            <h1 className="display4 text-center">Results</h1>
          </div>
          {/* The Results Table */}
          <div className="row justify-content-center align-items-center">
            <Table history={this.state.history} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
