import { Button } from "@mui/material";
import React, { useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import moment from "moment/moment";

const Renderfirsttable = ({ val }) => {
          console.log();
          return (
                    <>
                              <tr>
                                        <td
                                                  style={{
                                                            color: "whitesmoke",
                                                            backgroundColor:
                                                                      "#4472c4",
                                                            fontWeight: "bold",
                                                  }}
                                        >
                                                  {val.B}
                                        </td>
                                        <td>{val.C}</td>
                                        <td
                                                  style={{
                                                            color: "whitesmoke",
                                                            backgroundColor:
                                                                      "#4472c4",
                                                            fontWeight: "bold",
                                                  }}
                                        >
                                                  {val.D}
                                        </td>
                                        <td style={{ width: "150px" }}>
                                                  {val.E}
                                        </td>
                              </tr>
                    </>
          );
};

const Renderthirdtable = ({ val, thirdTable, ind }) => {
          //  this state use for Appraisee Self Rating
          const [customActualdeliveryMarks, setCustomActualdelivery] =
                    useState("");
          const [customOnTimeMarks, setCustomOnTimeMarks] = useState("");
          const [customAvgCodeMarks, setCustomAvgCodeMarks] = useState("");
          const [customReDoMarks, setCustomCustomReDoMarks] = useState("");
          const [customBugsReportedMarks, setCustomBugsReportedMarks] =
                    useState("");
          const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] =
                    useState("");
          const [
                    customCustomerSatisfactionMarks,
                    setCustomCustomerSatisfactionMarks,
          ] = useState("");
          const [customUpskillingMarks, setCustomUpskillingMarks] =
                    useState("");

          // this states use for Appraiser Rating
          const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] =
                    useState("");
          const [customOnTimeMarksAr, setCustomOnTimeMarksAr] = useState("");
          const [customAvgCodeMarksAr, setCustomAvgCodeMarksAr] = useState("");
          const [customReDoMarksAr, setCustomCustomReDoMarksAr] = useState("");
          const [customBugsReportedMarksAr, setCustomBugsReportedMarksAr] =
                    useState("");
          const [customCriticalIssuesMarksAr, setCustomCriticalIssuesMarksAr] =
                    useState("");
          const [
                    customCustomerSatisfactionMarksAr,
                    setCustomCustomerSatisfactionMarksAr,
          ] = useState("");
          const [customUpskillingMarksAr, setCustomUpskillingMarksAr] =
                    useState("");

          function handleOnChange(e) {
                    // console.log(
                    //           e.target.parentNode.parentNode.id,
                    //           ">>>>>>>>>>>>"
                    // );
                    if (e.target.parentNode.parentNode.id == 0) {
                              setCustomActualdelivery(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setCustomOnTimeMarks(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 2) {
                              setCustomAvgCodeMarks(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 3) {
                              setCustomCustomReDoMarks(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 4) {
                              setCustomBugsReportedMarks(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCustomCriticalIssuesMarks(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 6) {
                              setCustomCustomerSatisfactionMarks(
                                        e.target.value
                              );
                    }
                    if (e.target.parentNode.parentNode.id == 7) {
                              setCustomUpskillingMarks(e.target.value);
                    }
          }

          function handleOnChange1(e) {
                    console.log(e.target.value, ">>>>>>>>>>>>");
                    if (e.target.parentNode.parentNode.id == 0) {
                              setCustomActualdeliveryAr(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setCustomOnTimeMarksAr(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 2) {
                              setCustomAvgCodeMarksAr(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 3) {
                              setCustomCustomReDoMarksAr(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 4) {
                              setCustomBugsReportedMarksAr(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCustomCriticalIssuesMarksAr(e.target.value);
                    }
                    if (e.target.parentNode.parentNode.id == 6) {
                              setCustomCustomerSatisfactionMarksAr(
                                        e.target.value
                              );
                    }
                    if (e.target.parentNode.parentNode.id == 7) {
                              setCustomUpskillingMarksAr(e.target.value);
                    }
          }

          console.log(customActualdeliveryMarks, "testtttttttttttttttts");
          return (
                    <>
                              <tr id={ind}>
                                        <th>{val.B}</th>
                                        <td>{val.C}</td>
                                        <td>{val.D}</td>
                                        <td>{val.E}</td>
                                        <td>{val.F}</td>
                                        <td>{val.G}</td>
                                        <td>{val.H}</td>
                                        <td>{val.I}</td>
                                        <td style={{ position: "relative" }}>
                                                  <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                      ind === 0
                                                                                ? customActualdeliveryMarks
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            1
                                                                                ? customOnTimeMarks
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            2
                                                                                ? customAvgCodeMarks
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            3
                                                                                ? customReDoMarks
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            4
                                                                                ? customBugsReportedMarks
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            5
                                                                                ? customCriticalIssuesMarks
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            6
                                                                                ? customCustomerSatisfactionMarks
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            7
                                                                                ? customUpskillingMarks
                                                                                : 0
                                                            }
                                                            // value={val.J}
                                                            style={{
                                                                      height: "100%",
                                                                      position: "absolute",
                                                                      top: "0",
                                                                      bottom: "0",

                                                                      backgroundColor:
                                                                                "#ecf0f1",
                                                                      border: "none",
                                                                      width: "100%",
                                                                      fontSize: "17px",
                                                            }}
                                                            onChange={(e) => {
                                                                      handleOnChange(
                                                                                e
                                                                      );
                                                            }}
                                                  />
                                        </td>
                                        <td
                                                  style={{
                                                            backgroundColor:
                                                                      "#bf8f00",
                                                            position: "relative",
                                                  }}
                                        >
                                                  {val.K}
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                      ind === 0
                                                                                ? customActualdeliveryMarksAr
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            1
                                                                                ? customOnTimeMarksAr
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            2
                                                                                ? customAvgCodeMarksAr
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            3
                                                                                ? customReDoMarksAr
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            4
                                                                                ? customBugsReportedMarksAr
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            5
                                                                                ? customCriticalIssuesMarksAr
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            6
                                                                                ? customCustomerSatisfactionMarksAr
                                                                                : 0 ||
                                                                                  ind ===
                                                                                            7
                                                                                ? customUpskillingMarksAr
                                                                                : 0
                                                            }
                                                            style={{
                                                                      height: "100%",
                                                                      position: "absolute",
                                                                      top: "0",
                                                                      bottom: "0",

                                                                      backgroundColor:
                                                                                "#ecf0f1",
                                                                      border: "none",
                                                                      width: "100%",
                                                                      fontSize: "17px",
                                                            }}
                                                            // value={val.L}
                                                            onChange={(e) => {
                                                                      handleOnChange1(
                                                                                e
                                                                      );
                                                            }}
                                                  />
                                                  {/* {val.L} */}
                                        </td>
                                        <td
                                                  style={{
                                                            backgroundColor:
                                                                      "#70ad47",
                                                  }}
                                        >
                                                  {val.M}
                                        </td>
                                        <td>{val.N}</td>
                                        <td>{val.O}</td>
                              </tr>
                    </>
          );
};

const Renderforthtable = ({ val }) => {
          return (
                    <>
                              <tr style={{ textAlign: "center" }}>
                                        <td>{val.B}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{val.F}</td>
                              </tr>
                    </>
          );
};

const Renderfifthtable = ({ val }) => {
          return (
                    <>
                              <tr>
                                        <td colSpan="4">{val.B}</td>
                                        <td colSpan="4"></td>
                              </tr>
                    </>
          );
};

const Tableviewnew = ({ fileData, TaskwiseMarks, email }) => {
          async function KpiMarks() {
                    let allFinalData = [];
                    let currentDate = new Date();
                    let dateTime1 = moment(currentDate).format(
                              "YYYY-MM-DD HH:mm:ss"
                    );
                    thirdTable.map((val, ind) => {
                              let allData = {
                                        KpiTitle: "",
                                        KpiDescription: "",
                                        KPI: "",
                                        Category: "",
                                        Type: "",
                                        ToUserId: "",
                                        FromUserId: "",
                                        Weightage: 0,
                                        AppraiseeSelfRating: 0,
                                        AppraiserRating: 0,
                                        UpdatedDate: "",
                                        IsEditable: 1,
                                        ToDate: "",
                                        FromDate: "",
                              };
                              allData.KpiTitle = val.C || "";
                              allData.KpiDescription = val.D || "";
                              allData.KPI = "";
                              allData.Category = val.B || "";
                              allData.Type = val.F || "";
                              allData.ToUserId = email || "";
                              allData.FromUserId = email || "";
                              allData.Weightage = val.H || 0;
                              allData.AppraiseeSelfRating = val.J || 0;
                              allData.AppraiserRating = val.L || 0;
                              allData.UpdatedDate = dateTime1 || "";
                              allData.IsEditable = 1;
                              allData.ToDate = fileData[0].E || "";
                              allData.FromDate = fileData[1].E || "";
                              return allFinalData.push(allData);
                    });
                    console.log(allFinalData, "LLLLLLLLLLLLLLLLLLLL");
                    let fileDataModi = fileData.slice(6, 14);
                    let data = await axios({
                              method: "post",
                              url: `http://localhost:8080/kpi/marks`,
                              data: allFinalData,
                              headers: { Accept: "application/json" },
                    });
          }

          let firstTable = fileData.slice(0, 4);
          let secondTable = fileData.slice(4, 5);
          let thirdTable = fileData.slice(6, 14);
          let forthTable = fileData.slice(17, 31);
          let fifthTable = fileData.slice(32, 37);
          return (
                    <div>
                              <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button"
                                        table="table-to-xls"
                                        filename={email}
                                        sheet="kpisheet"
                                        buttonText="Export to Excel"
                              />
                              <br />
                              <br />
                              <table
                                        id="table-to-xls"
                                        className="waffle"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        border="true"
                              >
                                        {firstTable.map((val, index) => {
                                                  return (
                                                            <>
                                                                      <Renderfirsttable
                                                                                key={
                                                                                          index
                                                                                }
                                                                                val={
                                                                                          val
                                                                                }
                                                                      />
                                                            </>
                                                  );
                                        })}
                                        <tr style={{ height: "100px" }}></tr>
                                        <tr>
                                                  {" "}
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#f4b084",
                                                                      height: "40px",
                                                            }}
                                                            colSpan="14"
                                                  >
                                                            {secondTable[0].B}
                                                  </td>
                                        </tr>
                                        <tr>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].B}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].C}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].D}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].E}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].F}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].G}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].H}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].I}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].J}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].K}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].L}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].M}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].N}
                                                  </th>
                                                  <th
                                                            style={{
                                                                      backgroundColor:
                                                                                "#00b0f0",
                                                            }}
                                                  >
                                                            {fileData[5].O}
                                                  </th>
                                        </tr>
                                        {thirdTable.map((val, ind) => {
                                                  return (
                                                            <>
                                                                      <Renderthirdtable
                                                                                ind={
                                                                                          ind
                                                                                }
                                                                                val={
                                                                                          val
                                                                                }
                                                                                thirdTable={
                                                                                          thirdTable
                                                                                }
                                                                      />
                                                            </>
                                                  );
                                        })}
                                        <tr style={{ height: "100px" }}></tr>
                                        <tr style={{ height: "40px" }}>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#f4b084",
                                                                      textAlign: "center",
                                                            }}
                                                            colSpan="5"
                                                  >
                                                            {fileData[14].B}
                                                  </td>
                                        </tr>
                                        <tr>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                                      textAlign: "center",
                                                            }}
                                                            rowSpan="2"
                                                  >
                                                            {fileData[15].B}
                                                  </td>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                            }}
                                                  >
                                                            {fileData[15].C}
                                                  </td>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                            }}
                                                  >
                                                            {fileData[15].D}
                                                  </td>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                            }}
                                                  >
                                                            {fileData[15].E}
                                                  </td>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                            }}
                                                            rowSpan="2"
                                                  >
                                                            {fileData[15].F}
                                                  </td>
                                        </tr>
                                        <tr>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                            }}
                                                  >
                                                            {fileData[16].C}
                                                  </td>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                            }}
                                                  >
                                                            {fileData[16].D}
                                                  </td>
                                                  <td
                                                            style={{
                                                                      backgroundColor:
                                                                                "#92d050",
                                                            }}
                                                  >
                                                            {fileData[16].E}
                                                  </td>
                                        </tr>
                                        {forthTable.map((val, index) => {
                                                  return (
                                                            <>
                                                                      <Renderforthtable
                                                                                key={
                                                                                          index
                                                                                }
                                                                                val={
                                                                                          val
                                                                                }
                                                                      />
                                                            </>
                                                  );
                                        })}
                                        <td style={{ border: "none" }}></td>
                                        <td style={{ border: "none" }}></td>
                                        <td style={{ border: "none" }}></td>
                                        <td style={{ border: "none" }}></td>
                                        <td style={{ border: "none" }}></td>
                                        <td style={{ border: "none" }}></td>
                                        <td style={{ border: "none" }}></td>
                                        <td style={{ border: "none" }}></td>

                                        <div>
                                                  <Button
                                                            variant="contained"
                                                            style={{
                                                                      width: "100%",
                                                                      minWidth: "120px",
                                                            }}
                                                            onClick={() =>
                                                                      KpiMarks()
                                                            }
                                                  >
                                                            Submit KPI
                                                  </Button>
                                        </div>
                                        <tr style={{ height: "100px" }}></tr>

                                        {fifthTable.map((val, index) => {
                                                  return (
                                                            <>
                                                                      <Renderfifthtable
                                                                                key={
                                                                                          index
                                                                                }
                                                                                val={
                                                                                          val
                                                                                }
                                                                      />
                                                            </>
                                                  );
                                        })}
                              </table>
                    </div>
          );
};

export default Tableviewnew;
