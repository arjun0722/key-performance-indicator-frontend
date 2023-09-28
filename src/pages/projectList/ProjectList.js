import React from "react";
import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Projects from "../../components/table/Table";
import "../list/list.scss";

const ProjectList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Projects />
      </div>
    </div>
  );
};

export default ProjectList;
