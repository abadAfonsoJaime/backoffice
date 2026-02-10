import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns, itemValue }) => {
  const renderCell = (item, col) => {
    return col.content ? col.content(item) : _.get(item, col.path);
  };

  return (
    <tbody style={{ backgroundColor: "white" }}>
      {data.map(item => (
        <tr key={item[itemValue]}>
          {columns.map(col => (
            <td key={col.label || col.key}>{renderCell(item, col)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  itemValue: "_id"
};

export default TableBody;
