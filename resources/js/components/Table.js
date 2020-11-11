import React, { Component } from "react"
import { capitaliseSentence } from "../utils/helperFunctions"
import classNames from "classnames"

class Table extends Component {
  render() {
    const history = this.props.history
    return (
      <div id="table-col" className="col-sm-8">
        <table
          className={classNames(
            "table",
            "table-bordered",
            "text-white",
            "justify-content-center",
            { invisible: this.props.history.isEmpty() }
          )}
        >
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((result) => {
                return (
                  <tr
                    key={result.getIn(["ingredients", 0, "text"]) + Date.now()}
                  >
                    <td data-label="Ingredients">
                      {
                        // Retrieves the requested ingredient information.
                        capitaliseSentence(
                          result.getIn(["ingredients", 0, "text"])
                        )
                      }
                    </td>
                    <td data-label="Calories">
                      {
                        // Displays the ingredient's calories.
                        result.get("calories")
                      }
                    </td>
                    <td data-label="Protein">
                      {result
                        .getIn(["totalNutrients", "PROCNT", "quantity"])
                        .toFixed(2) + " "}
                      grams
                    </td>
                    <td data-label="Carbs">
                      {result
                        .getIn(["totalNutrients", "CHOCDF", "quantity"])
                        .toFixed(2) + " "}
                      grams
                    </td>
                    <td data-label="Fat">
                      {result
                        .getIn(["totalNutrients", "FAT", "quantity"])
                        .toFixed(2) + " "}
                      grams
                    </td>
                    <td data-label="Labels">
                      {
                        // Retrieves the healthLabel information.
                        result.get("healthLabels") &&
                          result.get("healthLabels").map((healthLabel) => {
                            return (
                              <li key={healthLabel + Date.now()}>
                                {capitaliseSentence(
                                  healthLabel.toLowerCase().replaceAll("_", " ")
                                )}
                              </li>
                            )
                          })
                      }
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
