import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

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
              <th>Health Labels</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((result) => {
                return (
                  <tr key={uuidv4()}>
                    <td>
                      {
                        // Retrieves the ingredient's information from the ingredient object.
                        result.get("ingredients") &&
                          result.get("ingredients").map((ingredient) => {
                            return this.capitaliseSentence(ingredient.text);
                          })
                      }
                    </td>
                    <td>{result.get("calories")}</td>
                    <td>
                      {
                        // Retrieves the healthLabel information from the healthLabel object.
                        result.get("healthLabels") &&
                          result.get("healthLabels").map((healthLabel) => {
                            return (
                              <li key={uuidv4()}>
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
