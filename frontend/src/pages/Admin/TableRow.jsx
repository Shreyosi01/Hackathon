// src/pages/Admin/TableRow.jsx
import React from "react";

export default function TableRow({ as = "tr", children, ...props }) {
  const Comp = as;
  return (
    <Comp
      className="admin-table-row"
      tabIndex={0}
      {...props}
      aria-label={props["aria-label"] || "Table row"}
    >
      {children}
    </Comp>
  );
}
