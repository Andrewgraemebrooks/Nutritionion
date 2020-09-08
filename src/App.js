import React, { Component } from "react";
import config from "./config/config";
import Table from "./components/Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      calories: 0,
      cautions: [],
      dietLabels: [],
      healthLabels: [],
      ingredients: [],
      totalDaily: {},
      totalNutrients: {},
      totalNutrientsKCal: {},
      totalWeight: 0,
      uri: "",
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
      `${PROXY}https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=1%20large%20apple`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
            <div className="input-group">
              <div className="input-group-prepend"></div>
              <textarea
                className="form-control"
                aria-label="With textarea"
              ></textarea>
              <div className="input-group-append">
                <button
                  className="btn btn-danger"
                  type="button"
                  id="button-addon2"
                  onClick={(e) => {
                    this.getNutritionInfo(e);
                  }}
                >
                  Get Info
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <h1 className="display4 text-center">Results</h1>
        </div>
        <div className="row justify-content-center align-items-center">
        {/* <Table /> */}
        </div>
      </div>
    );
  }
}

export default App;
