import React, { useState } from "react";
import { Link } from "react-router-dom";
import Datagrid from "../Datagrid/Datagrid.jsx";
import "./Datatable.scss";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Datatable = ({ path, data, labels }) => {
  const newPath = `/${path}/new`;
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {capitalizeFirstLetter(path)}
        <Link to={newPath} className="link">
          Add New
        </Link>
      </div>
      <Datagrid data={data} labels={labels} />
    </div>
  );
};

Datatable.defaultProps = {
  data: [],
  labels: []
}

export default Datatable;
