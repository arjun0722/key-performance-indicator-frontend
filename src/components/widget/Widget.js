import "./widget.scss";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Widget = ({ type }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">Employees</span>
        <span className="counter">12</span>
        <span className="link">See all Employees</span>
      </div>
      <div className="right">
        <div className="percentage negative">
          <KeyboardArrowUpIcon /> 20%
        </div>
        <PersonOutlinedIcon className="icon" />
      </div>
    </div>
  );
};

export default Widget;
