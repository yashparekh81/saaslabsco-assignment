import React from "react";

const Table = ({ data, page }) => {
  return (
    <table aria-label="Projects">
      <thead>
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Percentage Funded</th>
          <th scope="col">Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {data.slice((page - 1) * 5, page * 5).map((project, index) => (
          <tr key={index} data-testid={`table-row-${index}`}>
            <td data-testid={`row-${index}-serial`}>{project["s.no"]}</td>
            <td data-testid={`row-${index}-percentage`}>
              {project["percentage.funded"]}%
            </td>
            <td data-testid={`row-${index}-amount`}>
              ${project["amt.pledged"]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
