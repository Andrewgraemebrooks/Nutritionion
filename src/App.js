import React, { Component } from "react";
import config from "./config/config";
import Table from "./components/Table";
import { Map, List } from "immutable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      history: List(),
    };
  }

  handleChange(changedObject) {
    this.setState(changedObject);
  }

  getNutritionInfo(e) {
    // Proxy to prevent a CORS error
    const PROXY = "https://cors-anywhere.herokuapp.com/";
    // API App ID and Key
    const APP_ID = config.API_ID;
    const APP_KEY = config.API_KEY;

    fetch(
      `${PROXY}https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${this.state.userInput}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ history: this.state.history.push(Map(res)) });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
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
                className="form-control"
                placeholder="Ingredient"
                aria-label="Ingredient Input"
                onChange={(e) =>
                  this.handleChange({
                    userInput: encodeURI(e.target.value),
                  })
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  onClick={(e) => {
                    this.getNutritionInfo(e);
                  }}
                >
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <h1 className="display4 text-center">Results</h1>
        </div>
        <div className="row justify-content-center align-items-center">
          <Table history={this.state.history} />
        </div>
      </div>
    );
  }
}

export default App;
