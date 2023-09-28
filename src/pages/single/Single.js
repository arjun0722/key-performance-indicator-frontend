import React from "react";
import Chart from "../../components/charts/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/table/Table";

import { useDetails } from "../../context/DetailsContext";
import "./single.scss";

const Single = ({ id }) => {
  const { phone } = useDetails();

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://instahyre-2.s3-ap-south-1.amazonaws.com/media/CACHE/images/images/profile/base/recruiter/54507/71423d36b1/tmpt3294B/4026400f19c101cca69293d9fd72d1d3.jpg"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Nausheen Hasan</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">jamesons@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+91 {phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">Gomtinagar</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Performance last 6 months" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">All Employees</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
