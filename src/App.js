import React, { Component } from "react";
import config from "./config/config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <div className="row justify-content-center">
          <div className="col">
            <h1 className="display4 text-center">Get Nutrition Information</h1>
            <button
              className="btn btn-danger"
              type="button"
              onClick={(e) => {
                this.getNutritionInfo(e);
              }}
            >
              Get
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
