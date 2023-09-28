import React from "react";
import Leads from "../../components/Leads/Leads";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./ListTable.scss";

const ListTable = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Leads />
      </div>
    </div>
  );
};

export default ListTable;
