import "./sidebar.scss";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Super Admin Panel</span>
        </Link>
      </div>
      <hr />

      <div className="center">
        <ul>
          <p className="title"> MAIN </p>
          <li>
            <DashboardIcon className="icon" />
            <span> Dashboard</span>
          </li>
          <li>
            <GroupIcon className="icon" />
            <Link to="/users" style={{ textDecoration: "none" }}>
              <span> Employees</span>
            </Link>
          </li>
          {/* <li>
            <AssignmentIcon className="icon" />
            <Link to="/blogs" style={{ textDecoration: "none" }}>
              <span> All Blogs</span>
            </Link>
          </li> */}
          <li>
            <AssignmentIcon className="icon" />
            <Link to="/projects" style={{ textDecoration: "none" }}>
              <span> Projects</span>
            </Link>
          </li>
          <li>
            <AssignmentIcon className="icon" />
            <Link to="/gallery" style={{ textDecoration: "none" }}>
              <span> Gallery</span>
            </Link>
          </li>
          <li>
            <AssignmentIcon className="icon" />
            <Link to="/leads" style={{ textDecoration: "none" }}>
              <span>Leads</span>
            </Link>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span> Logout </span>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
