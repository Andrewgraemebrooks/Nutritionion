import React from "react";

function Table(props) {
  return (
    <div className="col">
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
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
            <th>Example</th>
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

export default Table;
