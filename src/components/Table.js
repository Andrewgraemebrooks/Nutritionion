import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

class Table extends Component {
  render() {
    const history = this.props.history;
    return (
      <div className="col">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Calories</th>
              <th>Total Nutrients</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((result) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{result.get("calories")}</td>
                    <td>{result.get("calories")}</td>
                    <td>{result.get("calories")}</td>
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
