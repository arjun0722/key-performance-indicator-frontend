import React from "react";
import Scheduler from "../../components/calendar/Calendar";
import Chart from "../../components/charts/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="employee" />
          <Widget type="" />
          <Widget type="" />
          <Widget type="" />
        </div>
        <div className="charts">
          {/* <Scheduler /> */}
          <Featured />
          <Chart title="Last 6 months Revenue" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
