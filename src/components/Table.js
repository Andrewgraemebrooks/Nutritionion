import React, { Component } from "react";

class Table extends Component {
  render() {

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
            {this.props.history &&
              this.props.history.map((result) => {
                return (
                  <tr>
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
