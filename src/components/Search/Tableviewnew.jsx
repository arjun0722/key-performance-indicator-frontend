import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
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

const Renderthirdtable = ({
          val,
          thirdTable,
          ind,
          setParentAppraise,
          parentAppraise,
          setParentSelfAppraise,
          parentSelfAppraise,
          parentTarget,
          setParentTarget,
}) => {
          //state to maintain target values

          const [actualDelivery, setActualDelivery] = useState(0);
          const [onTime, setOnTime] = useState(0);
          const [critical, setCritical] = useState(0);

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
                    if (e.target.parentNode.parentNode.id == 0) {
                              setCustomActualdelivery(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customActualdeliveryMarks:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setCustomOnTimeMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customOnTimeMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 2) {
                              setCustomAvgCodeMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customAvgCodeMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 3) {
                              setCustomCustomReDoMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customReDoMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 4) {
                              setCustomBugsReportedMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customBugsReportedMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCustomCriticalIssuesMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customCriticalIssuesMarks:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 6) {
                              setCustomCustomerSatisfactionMarks(
                                        e.target.value
                              );
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customCustomerSatisfactionMarks:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 7) {
                              setCustomUpskillingMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customUpskillingMarks: e.target.value,
                              });
                    }
          }

          function handleOnChange1(e) {
                    if (e.target.parentNode.parentNode.id == 0) {
                              setCustomActualdeliveryAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customActualdeliveryMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setCustomOnTimeMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customOnTimeMarksAr: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 2) {
                              setCustomAvgCodeMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customAvgCodeMarksAr: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 3) {
                              setCustomCustomReDoMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customReDoMarksAr: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 4) {
                              setCustomBugsReportedMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customBugsReportedMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCustomCriticalIssuesMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customCriticalIssuesMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 6) {
                              setCustomCustomerSatisfactionMarksAr(
                                        e.target.value
                              );
                              setParentAppraise({
                                        ...parentAppraise,
                                        customCustomerSatisfactionMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 7) {
                              setCustomUpskillingMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customUpskillingMarksAr: e.target.value,
                              });
                    }
          }

          function handleTarget(e) {
                    if (e.target.parentNode.parentNode.id == 0) {
                              setActualDelivery(e.target.value);
                              setParentTarget({
                                        ...parentTarget,
                                        actualDelivery: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setOnTime(e.target.value);
                              setParentTarget({
                                        ...parentTarget,
                                        onTime: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCritical(e.target.value);
                              setParentTarget({
                                        ...parentTarget,
                                        critical: e.target.value,
                              });
                    }
          }
          const valueMap = [
                    val.I === 0 || val.I === undefined ? actualDelivery : val.I,
                    val.I === 0 || val.I === undefined ? onTime : val.I,
                    val.I,
                    val.I,
                    val.I,
                    val.I === 0 || val.I === undefined ? critical : val.I,
                    val.I,
                    val.I,
          ];
          const value = valueMap[ind] !== undefined ? valueMap[ind] : "";
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
                                        <td style={{ position: "relative" }}>
                                                  {val.I}
                                                  {/* <input
                                                            type="number"
                                                            min="0"
                                                            // value={value}
                                                            value={val.I}
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
                                                            onChange={(e) =>
                                                                      handleTarget(
                                                                                e
                                                                      )
                                                            }
                                                  /> */}
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  {val.J}
                                                  {/* <input
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
                                                  /> */}
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
                                                  {val.L}
                                                  {/* <input
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
                                                  /> */}
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

const RenderTestTable = ({
          val,
          thirdTable,
          ind,
          com,
          setParentAppraise,
          parentAppraise,
          setParentSelfAppraise,
          parentSelfAppraise,
          parentTarget,
          setParentTarget,
}) => {
          //state to maintain target values

          const [actualDelivery, setActualDelivery] = useState(0);
          const [onTime, setOnTime] = useState(0);
          const [critical, setCritical] = useState(0);

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
          console.log(val, "''''''''''''''''''''");
          console.log(val.Category, "}}}}}}}}}}}}}}}}}}");
          console.log(com[ind], "COM");
          function handleOnChange(e) {
                    if (e.target.parentNode.parentNode.id == 0) {
                              setCustomActualdelivery(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customActualdeliveryMarks:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setCustomOnTimeMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customOnTimeMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 2) {
                              setCustomAvgCodeMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customAvgCodeMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 3) {
                              setCustomCustomReDoMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customReDoMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 4) {
                              setCustomBugsReportedMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customBugsReportedMarks: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCustomCriticalIssuesMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customCriticalIssuesMarks:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 6) {
                              setCustomCustomerSatisfactionMarks(
                                        e.target.value
                              );
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customCustomerSatisfactionMarks:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 7) {
                              setCustomUpskillingMarks(e.target.value);
                              setParentSelfAppraise({
                                        ...parentSelfAppraise,
                                        customUpskillingMarks: e.target.value,
                              });
                    }
          }

          function handleOnChange1(e) {
                    if (e.target.parentNode.parentNode.id == 0) {
                              setCustomActualdeliveryAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customActualdeliveryMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setCustomOnTimeMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customOnTimeMarksAr: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 2) {
                              setCustomAvgCodeMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customAvgCodeMarksAr: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 3) {
                              setCustomCustomReDoMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customReDoMarksAr: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 4) {
                              setCustomBugsReportedMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customBugsReportedMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCustomCriticalIssuesMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customCriticalIssuesMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 6) {
                              setCustomCustomerSatisfactionMarksAr(
                                        e.target.value
                              );
                              setParentAppraise({
                                        ...parentAppraise,
                                        customCustomerSatisfactionMarksAr:
                                                  e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 7) {
                              setCustomUpskillingMarksAr(e.target.value);
                              setParentAppraise({
                                        ...parentAppraise,
                                        customUpskillingMarksAr: e.target.value,
                              });
                    }
          }

          function handleTarget(e) {
                    if (e.target.parentNode.parentNode.id == 0) {
                              setActualDelivery(e.target.value);
                              setParentTarget({
                                        ...parentTarget,
                                        actualDelivery: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 1) {
                              setOnTime(e.target.value);
                              setParentTarget({
                                        ...parentTarget,
                                        onTime: e.target.value,
                              });
                    }
                    if (e.target.parentNode.parentNode.id == 5) {
                              setCritical(e.target.value);
                              setParentTarget({
                                        ...parentTarget,
                                        critical: e.target.value,
                              });
                    }
          }
          const valueMap = [
                    val.I === 0 || val.I === undefined ? actualDelivery : val.I,
                    val.I === 0 || val.I === undefined ? onTime : val.I,
                    val.I,
                    val.I,
                    val.I,
                    val.I === 0 || val.I === undefined ? critical : val.I,
                    val.I,
                    val.I,
          ];
          const value = valueMap[ind] !== undefined ? valueMap[ind] : "";
          return (
                    <>
                              <tr id={ind}>
                                        <th>{val.Category}</th>
                                        <td>{val.KpiTitle}</td>
                                        <td>{val.KpiDescription}</td>
                                        <td>{com[ind].E}</td>
                                        <td>{val.Type}</td>
                                        <td>{com[ind].G}</td>
                                        <td>{val.Weightage}</td>
                                        <td style={{ position: "relative" }}>
                                                  {/* {val.I} */}
                                                  <input
                                                            type="number"
                                                            min="0"
                                                            value={com[ind].I}
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
                                                            onChange={(e) =>
                                                                      handleTarget(
                                                                                e
                                                                      )
                                                            }
                                                  />
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  {/* {val.J} */}
                                                  <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                      com[ind].J
                                                                      // ind === 0
                                                                      //           ? customActualdeliveryMarks
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       1
                                                                      //           ? customOnTimeMarks
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       2
                                                                      //           ? customAvgCodeMarks
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       3
                                                                      //           ? customReDoMarks
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       4
                                                                      //           ? customBugsReportedMarks
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       5
                                                                      //           ? customCriticalIssuesMarks
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       6
                                                                      //           ? customCustomerSatisfactionMarks
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       7
                                                                      //           ? customUpskillingMarks
                                                                      //           : 0
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
                                                  {com[ind].K}
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  {/* {val.L} */}
                                                  <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                      com[ind].L
                                                                      // ind === 0
                                                                      //           ? customActualdeliveryMarksAr
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       1
                                                                      //           ? customOnTimeMarksAr
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       2
                                                                      //           ? customAvgCodeMarksAr
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       3
                                                                      //           ? customReDoMarksAr
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       4
                                                                      //           ? customBugsReportedMarksAr
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       5
                                                                      //           ? customCriticalIssuesMarksAr
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       6
                                                                      //           ? customCustomerSatisfactionMarksAr
                                                                      //           : 0 ||
                                                                      //             ind ===
                                                                      //                       7
                                                                      //           ? customUpskillingMarksAr
                                                                      //           : 0
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
                                        </td>
                                        <td
                                                  style={{
                                                            backgroundColor:
                                                                      "#70ad47",
                                                  }}
                                        >
                                                  {com[ind].M}
                                        </td>
                                        <td>{com[ind].N}</td>
                                        <td>{com[ind].O}</td>
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
let combineData = [];
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
          const [updatedData, setUpdatedData] = useState({});

          async function getAllData() {
                    let reqOptions = {
                              method: "post",
                              url: `http://localhost:8080/kpi/marks/data`,
                              data: [
                                        {
                                                  email: email,
                                                  ToDate: fileData[0].E,
                                                  FromDate: fileData[1].E,
                                        },
                              ],
                              headers: { Accept: "application/json" },
                    };
                    let data = await axios.request(reqOptions);
                    console.log(data, ">>>>>>>>>>>>>>>");
                    setUpdatedData(data);
          }
          useEffect(() => {
                    getAllData();
          }, []);
          console.log(fileData.slice(6, 14), "::::::::::::::::::");
          console.log(updatedData?.data?.data, "///////////////////");
          const intialparentAppraise = {
                    customActualdeliveryMarksAr: 0,
                    customOnTimeMarksAr: 0,
                    customAvgCodeMarksAr: 0,
                    customReDoMarksAr: 0,
                    customBugsReportedMarksAr: 0,
                    customCriticalIssuesMarksAr: 0,
                    customCustomerSatisfactionMarksAr: 0,
                    customUpskillingMarksAr: 0,
          };
          const intialparentSelfAppraise = {
                    customActualdeliveryMarks: 0,
                    customOnTimeMarks: 0,
                    customAvgCodeMarks: 0,
                    customReDoMarks: 0,
                    customBugsReportedMarks: 0,
                    customCriticalIssuesMarks: 0,
                    customCustomerSatisfactionMarks: 0,
                    customUpskillingMarks: 0,
          };
          const intialTarget = {
                    actualDelivery: 0,
                    onTime: 0,
                    critical: 0,
          };
          const [parentAppraise, setParentAppraise] =
                    useState(intialparentAppraise);
          const [parentSelfAppraise, setParentSelfAppraise] = useState(
                    intialparentSelfAppraise
          );
          const [parentTarget, setParentTarget] = useState(intialTarget);
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
                                        Category: "",
                                        Type: "",
                                        ToUserId: "",
                                        FromUserId: "",
                                        Weightage: 0,
                                        Target: 0,
                                        AppraiseeSelfRating: 0,
                                        AppraiserRating: 0,
                                        UpdatedDate: "",
                                        IsEditable: 1,
                                        ToDate: "",
                                        FromDate: "",
                              };
                              switch (ind) {
                                        case (ind = 0):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.Target =
                                                            parentTarget.actualDelivery ||
                                                            0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customActualdeliveryMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customActualdeliveryMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        case (ind = 1):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.Target =
                                                            parentTarget.onTime ||
                                                            0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customOnTimeMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customOnTimeMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        case (ind = 2):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customAvgCodeMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customAvgCodeMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        case (ind = 3):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customReDoMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customReDoMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        case (ind = 4):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customBugsReportedMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customBugsReportedMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        case (ind = 5):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.Target =
                                                            parentTarget.critical ||
                                                            0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customCriticalIssuesMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customCriticalIssuesMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        case (ind = 6):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customCustomerSatisfactionMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customCustomerSatisfactionMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        case (ind = 7):
                                                  allData.KpiTitle =
                                                            val.C || "";
                                                  allData.KpiDescription =
                                                            val.D || "";
                                                  allData.Category =
                                                            val.B || "";
                                                  allData.Type = val.F || "";
                                                  allData.ToUserId =
                                                            email || "";
                                                  allData.FromUserId =
                                                            email || "";
                                                  allData.Weightage =
                                                            val.H || 0;
                                                  allData.AppraiseeSelfRating =
                                                            parentSelfAppraise.customUpskillingMarks ||
                                                            0;
                                                  allData.AppraiserRating =
                                                            parentAppraise.customUpskillingMarksAr ||
                                                            0;
                                                  allData.UpdatedDate =
                                                            dateTime1 || "";
                                                  allData.IsEditable = 1;
                                                  allData.ToDate =
                                                            fileData[0].E || "";
                                                  allData.FromDate =
                                                            fileData[1].E || "";
                                                  return allFinalData.push(
                                                            allData
                                                  );
                                        default:
                                                  return allFinalData;
                              }
                    });
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
                                        {/* {thirdTable?.map((val, ind) => {
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
                                                                                setParentAppraise={
                                                                                          setParentAppraise
                                                                                }
                                                                                parentAppraise={
                                                                                          parentAppraise
                                                                                }
                                                                                setParentSelfAppraise={
                                                                                          setParentSelfAppraise
                                                                                }
                                                                                parentSelfAppraise={
                                                                                          parentSelfAppraise
                                                                                }
                                                                                setParentTarget={
                                                                                          setParentTarget
                                                                                }
                                                                                parentTarget={
                                                                                          parentTarget
                                                                                }
                                                                      />
                                                            </>
                                                  );
                                        })} */}
                                        {updatedData?.data?.data?.map(
                                                  (val, ind) => {
                                                            return (
                                                                      <>
                                                                                <RenderTestTable
                                                                                          ind={
                                                                                                    ind
                                                                                          }
                                                                                          val={
                                                                                                    val
                                                                                          }
                                                                                          com={
                                                                                                    thirdTable
                                                                                          }
                                                                                          renderTestTable={
                                                                                                    thirdTable
                                                                                          }
                                                                                          setParentAppraise={
                                                                                                    setParentAppraise
                                                                                          }
                                                                                          parentAppraise={
                                                                                                    parentAppraise
                                                                                          }
                                                                                          setParentSelfAppraise={
                                                                                                    setParentSelfAppraise
                                                                                          }
                                                                                          parentSelfAppraise={
                                                                                                    parentSelfAppraise
                                                                                          }
                                                                                          setParentTarget={
                                                                                                    setParentTarget
                                                                                          }
                                                                                          parentTarget={
                                                                                                    parentTarget
                                                                                          }
                                                                                />
                                                                      </>
                                                            );
                                                  }
                                        )}
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
