import React, { Component } from "react";
import { Map } from "immutable";

class Table extends Component {
  render() {
    const results = Map({
      calories: this.props.results.calories,
      cautions: this.props.results.cautions,
      dietLabels: this.props.results.dietLabels,
      healthLabels: this.props.results.healthLabels,
      ingredients: this.props.results.ingredients,
      totalDaily: this.props.results.totalDaily,
      totalNutrients: this.props.results.totalNutrients,
      totalNutrientsKCal: this.props.results.totalNutrientsKCal,
      totalWeight: this.props.results.totalWeight,
    });

    return (
      <div className="col">
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>Number</th>
              <th>Calories</th>
              <th>Cautions</th>
              <th>Diet Labels</th>
              <th>Health Labels</th>
              <th>Ingredients</th>
              <th>Total Daily</th>
              <th>Total Nutrients</th>
              <th>Total Nutrients (KCal)</th>
              <th>Total Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>{typeof results.get("healthLabels")}</th>
              <th>Example</th>
              <th>Example</th>
              <th>Example</th>
              <th>Example</th>
              <th>Example</th>
              <th>Example</th>
              <th>Example</th>
              <th>Example</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
