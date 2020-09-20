import React, { Component } from "react";

class Table extends Component {
  /**
   * Capitalises the first letter of each word in a sentence
   * @param {string} string - The sentence to capitalise.
   * @returns {string} Capitalised sentence
   */
  capitaliseSentence(string) {
    return string
      .split(" ")
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(" ");
  }

  render() {
    const history = this.props.history;
    return (
      <div className="col">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th>Health Labels</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((result) => {
                return (
                  <tr
                    key={result.getIn(["ingredients", 0, "text"]) + Date.now()}
                  >
                    <td>
                      {
                        // Retrieves the requested ingredient information.
                        this.capitaliseSentence(
                          result.getIn(["ingredients", 0, "text"])
                        )
                      }
                    </td>
                    <td>
                      {
                        // Displays the ingredient's calories.
                        result.get("calories")
                      }
                    </td>
                    <td>
                      {result
                        .getIn(["totalNutrients", "PROCNT", "quantity"])
                        .toFixed(2) + " "}
                      grams
                    </td>
                    <td>
                      {result
                        .getIn(["totalNutrients", "CHOCDF", "quantity"])
                        .toFixed(2) + " "}
                      grams
                    </td>
                    <td>
                      {result
                        .getIn(["totalNutrients", "FAT", "quantity"])
                        .toFixed(2) + " "}
                      grams
                    </td>
                    <td>
                      {
                        // Retrieves the healthLabel information.
                        result.get("healthLabels") &&
                          result.get("healthLabels").map((healthLabel) => {
                            return (
                              <li key={healthLabel + Date.now()}>
                                {this.capitaliseSentence(
                                  healthLabel.toLowerCase().replaceAll("_", " ")
                                )}
                              </li>
                            );
                          })
                      }
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
