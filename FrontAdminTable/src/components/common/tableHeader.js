import React from "react";

// columns: array
// sortColumn: object
// onSort: function
const TableHeader = ({ columns, ...props }) => {
  // const raiseSort = path => {
  //   const sortColumn = { ...props.sortColumn };
  //   if (sortColumn.path === path)
  //     sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  //   else {
  //     sortColumn.path = path;
  //     sortColumn.order = "asc";
  //   }
  //   onSort(sortColumn);
  // };

  return (
    <thead className="thead-light">
      <tr>
        {columns.map(eachCol => (
          <th
            key={eachCol.label || eachCol.key}
            //onClick={() => raiseSort("publishDate")}
          >
            {eachCol.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHeader;
