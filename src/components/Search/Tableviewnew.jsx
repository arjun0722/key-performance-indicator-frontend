import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ACCESS_TOKEN } from "../../Config/Constant";
import { MANAGEMENt_ID } from "../../Config/ManagementEmail";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import Loading from "../Loading";
import { show_error } from "../../Config/Helper";

const Renderfirsttable = ({ val }) => {
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
          // all user and login user
          console.log("********************1111111111111111", val);

          const [users, setusers] = useState("");
          const [loginUser, setLoginUser] = useState(
                    localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
          );
          const useEmailExtractor = () => {
                    const location = useLocation();
                    const searchParams = new URLSearchParams(location.search);
                    return searchParams.get("email");
          };
          const email = useEmailExtractor();

          useEffect(() => {
                    setusers(email);
          }, [email]);

          //UseEffect for the Appraisee Self Rating , Appraiser Rating and target
          console.log(thirdTable, "??????????????????");
          useEffect(() => {
                    setTimeout(() => {
                              setParentSelfAppraise({
                                        customActualdeliveryMarks:
                                                  thirdTable[0]?.J,
                                        customOnTimeMarks: thirdTable[1]?.J,
                                        customAvgCodeMarks: thirdTable[2]?.J,
                                        customReDoMarks: thirdTable[3]?.J,
                                        customBugsReportedMarks:
                                                  thirdTable[4]?.J,
                                        customCriticalIssuesMarks:
                                                  thirdTable[5]?.J,
                                        customCustomerSatisfactionMarks:
                                                  thirdTable[6]?.J,
                                        customUpskillingMarks: thirdTable[7]?.J,
                              });

                              setParentAppraise({
                                        customActualdeliveryMarksAr:
                                                  thirdTable[0]?.L,
                                        customOnTimeMarksAr: thirdTable[1]?.L,
                                        customAvgCodeMarksAr: thirdTable[2]?.L,
                                        customReDoMarksAr: thirdTable[3]?.L,
                                        customBugsReportedMarksAr:
                                                  thirdTable[4]?.L,
                                        customCriticalIssuesMarksAr:
                                                  thirdTable[5]?.L,
                                        customCustomerSatisfactionMarksAr:
                                                  thirdTable[6]?.L,
                                        customUpskillingMarksAr:
                                                  thirdTable[7]?.L,
                              });
                              setParentTarget({
                                        actualDelivery: thirdTable[0]?.I,
                                        onTime: thirdTable[1]?.I,
                                        critical: thirdTable[5]?.I,
                              });
                    }, 500);
          }, []);

          //state to maintain target values

          const [actualDelivery, setActualDelivery] = useState(
                    ind === 0 ? val.I : 0
          );
          const [onTime, setOnTime] = useState(ind === 1 ? val.I : 0);
          const [critical, setCritical] = useState(ind === 5 ? val.I : 0);

          //  this state use for Appraisee Self Rating
          const [customActualdeliveryMarks, setCustomActualdelivery] = useState(
                    ind === 0 ? val.J : 0
          );
          const [customOnTimeMarks, setCustomOnTimeMarks] = useState(
                    ind === 1 ? val.J : 0
          );
          const [customAvgCodeMarks, setCustomAvgCodeMarks] = useState(
                    ind === 2 ? val.J : 0
          );
          const [customReDoMarks, setCustomCustomReDoMarks] = useState(
                    ind === 3 ? val.J : 0
          );
          const [customBugsReportedMarks, setCustomBugsReportedMarks] =
                    useState(ind === 4 ? val.J : 0);
          const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] =
                    useState(ind === 5 ? val.J : 0);
          const [
                    customCustomerSatisfactionMarks,
                    setCustomCustomerSatisfactionMarks,
          ] = useState(ind === 6 ? val.J : 0);
          const [customUpskillingMarks, setCustomUpskillingMarks] = useState(
                    ind === 7 ? val.J : 0
          );

          // this states use for Appraiser Rating
          const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] =
                    useState(ind === 0 ? val.L : 0);
          const [customOnTimeMarksAr, setCustomOnTimeMarksAr] = useState(
                    ind === 1 ? val.L : 0
          );
          const [customAvgCodeMarksAr, setCustomAvgCodeMarksAr] = useState(
                    ind === 2 ? val.L : 0
          );
          const [customReDoMarksAr, setCustomCustomReDoMarksAr] = useState(
                    ind === 3 ? val.L : 0
          );
          const [customBugsReportedMarksAr, setCustomBugsReportedMarksAr] =
                    useState(ind === 4 ? val.L : 0);
          const [customCriticalIssuesMarksAr, setCustomCriticalIssuesMarksAr] =
                    useState(ind === 5 ? val.L : 0);
          const [
                    customCustomerSatisfactionMarksAr,
                    setCustomCustomerSatisfactionMarksAr,
          ] = useState(ind === 6 ? val.L : 0);
          const [customUpskillingMarksAr, setCustomUpskillingMarksAr] =
                    useState(ind === 7 ? val.L : 0);

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
                    actualDelivery,
                    onTime,
                    val.I,
                    val.I,
                    val.I,
                    critical,
                    val.I,
                    val.I,
          ];
          const value = valueMap[ind] !== undefined ? valueMap[ind] : 0;

          const AppraiserRating = [
                    customActualdeliveryMarksAr,
                    customOnTimeMarksAr,
                    customAvgCodeMarksAr,
                    customReDoMarksAr,
                    customBugsReportedMarksAr,
                    customCriticalIssuesMarksAr,
                    customCustomerSatisfactionMarksAr,
                    customUpskillingMarksAr,
          ];

          const AppraiseValue =
                    AppraiserRating[ind] !== undefined
                              ? AppraiserRating[ind]
                              : "";

          const appraiseSelfRating = [
                    val.J === 0 || val.J === undefined
                              ? customActualdeliveryMarks
                              : val.J,
                    val.J === 0 || val.J === undefined
                              ? customOnTimeMarks
                              : val.J,
                    val.J === 0 || val.J === undefined
                              ? customAvgCodeMarks
                              : val.J,
                    val.J === 0 || val.J === undefined
                              ? customReDoMarks
                              : val.J,
                    val.J === 0 || val.J === undefined
                              ? customBugsReportedMarks
                              : val.J,
                    val.J === 0 || val.J === undefined
                              ? customCriticalIssuesMarks
                              : val.J,
                    val.J === 0 || val.J === undefined
                              ? customCustomerSatisfactionMarks
                              : val.J,
                    val.J === 0 || val.J === undefined
                              ? customUpskillingMarks
                              : val.J,
          ];

          const appraiseSelfRatingValue =
                    appraiseSelfRating[ind] !== undefined
                              ? appraiseSelfRating[ind]
                              : "";

          const formula = (a, b, c) => {
                    const value = Number(
                              ((100 + ((a - b) / b) * 100) * c) / 100
                    ).toFixed(2);

                    if (value !== "Infinity" && value !== "NaN") {
                              return value;
                    } else {
                              return 0;
                    }
          };

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
                                                  <input
                                                            type="number"
                                                            min="0"
                                                            value={value}
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
                                                  <input
                                                            type="number"
                                                            min="0"
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
                                                  {/* {val.K} */}
                                                  {ind === 0
                                                            ? formula(
                                                                        actualDelivery,
                                                                        customActualdeliveryMarks,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 1
                                                            ? formula(
                                                                        onTime,
                                                                        customOnTimeMarks,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 2
                                                            ? formula(
                                                                        val.I,
                                                                        customAvgCodeMarks,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 3
                                                            ? formula(
                                                                        val.I,
                                                                        customReDoMarks,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 4
                                                            ? formula(
                                                                        val.I,
                                                                        customBugsReportedMarks,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 5
                                                            ? formula(
                                                                        critical,
                                                                        customCriticalIssuesMarks,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 6
                                                            ? formula(
                                                                        val.I,
                                                                        customCustomerSatisfactionMarks,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 7
                                                            ? formula(
                                                                        val.I,
                                                                        customUpskillingMarks,
                                                                        val.H
                                                              )
                                                            : 0}
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  <input
                                                            type="number"
                                                            min="0"
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
                                                  {/* {val.M} */}
                                                  {ind === 0
                                                            ? formula(
                                                                        actualDelivery,
                                                                        customActualdeliveryMarksAr,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 1
                                                            ? formula(
                                                                        onTime,
                                                                        customOnTimeMarksAr,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 2
                                                            ? formula(
                                                                        val.I,
                                                                        customAvgCodeMarksAr,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 3
                                                            ? formula(
                                                                        val.I,
                                                                        customReDoMarksAr,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 4
                                                            ? formula(
                                                                        val.I,
                                                                        customBugsReportedMarksAr,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 5
                                                            ? formula(
                                                                        critical,
                                                                        customCriticalIssuesMarksAr,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 6
                                                            ? formula(
                                                                        val.I,
                                                                        customCustomerSatisfactionMarksAr,
                                                                        val.H
                                                              )
                                                            : 0 || ind === 7
                                                            ? formula(
                                                                        val.I,
                                                                        customUpskillingMarksAr,
                                                                        val.H
                                                              )
                                                            : 0}
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

          const [actualDelivery, setActualDelivery] = useState(
                    ind === 0 ? val.Target : 0
          );
          const [onTime, setOnTime] = useState(ind === 1 ? val.Target : 0);
          const [critical, setCritical] = useState(ind === 5 ? val.Target : 0);

          const [loginUser, setLoginUser] = useState(
                    localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
          );

          //  this state use for Appraisee Self Rating
          const [customActualdeliveryMarks, setCustomActualdelivery] = useState(
                    ind === 0 ? val.AppraiseeSelfRating : 0
          );
          const [customOnTimeMarks, setCustomOnTimeMarks] = useState(
                    ind === 1 ? val.AppraiseeSelfRating : 0
          );
          const [customAvgCodeMarks, setCustomAvgCodeMarks] = useState(
                    ind === 2 ? val.AppraiseeSelfRating : 0
          );
          const [customReDoMarks, setCustomCustomReDoMarks] = useState(
                    ind === 3 ? val.AppraiseeSelfRating : 0
          );
          const [customBugsReportedMarks, setCustomBugsReportedMarks] =
                    useState(ind === 4 ? val.AppraiseeSelfRating : 0);
          const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] =
                    useState(ind === 5 ? val.AppraiseeSelfRating : 0);
          const [
                    customCustomerSatisfactionMarks,
                    setCustomCustomerSatisfactionMarks,
          ] = useState(ind === 6 ? val.AppraiseeSelfRating : 0);
          const [customUpskillingMarks, setCustomUpskillingMarks] = useState(
                    ind === 7 ? val.AppraiseeSelfRating : 0
          );

          // this states use for Appraiser Rating
          const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] =
                    useState(ind === 0 ? val.AppraiserRating : 0);
          const [customOnTimeMarksAr, setCustomOnTimeMarksAr] = useState(
                    ind === 1 ? val.AppraiserRating : 0
          );
          const [customAvgCodeMarksAr, setCustomAvgCodeMarksAr] = useState(
                    ind === 2 ? val.AppraiserRating : 0
          );
          const [customReDoMarksAr, setCustomCustomReDoMarksAr] = useState(
                    ind === 3 ? val.AppraiserRating : 0
          );
          const [customBugsReportedMarksAr, setCustomBugsReportedMarksAr] =
                    useState(ind === 4 ? val.AppraiserRating : 0);
          const [customCriticalIssuesMarksAr, setCustomCriticalIssuesMarksAr] =
                    useState(ind === 5 ? val.AppraiserRating : 0);
          const [
                    customCustomerSatisfactionMarksAr,
                    setCustomCustomerSatisfactionMarksAr,
          ] = useState(ind === 6 ? val.AppraiserRating : 0);
          const [customUpskillingMarksAr, setCustomUpskillingMarksAr] =
                    useState(ind === 7 ? val.AppraiserRating : 0);

          // this states use for Final Appraisee Marks
          // const [finalActualdeliveryMarks, setFinalActualdelivery] =
          //           useState(0);
          // const [finalOnTimeMarks, setFinalOnTimeMarks] = useState(0);
          // const [finalAvgCodeMarks, setFinalAvgCodeMarks] = useState(0);
          // const [finalReDoMarks, setCustomFinalReDoMarks] = useState(0);
          // const [finalBugsReportedMarks, setFinalBugsReportedMarks] =
          //           useState(0);
          // const [finalCriticalIssuesMarks, setFinalCriticalIssuesMarks] =
          //           useState(0);
          // const [
          //           finalCustomerSatisfactionMarks,
          //           setFinalCustomerSatisfactionMarks,
          // ] = useState(0);
          // const [finalUpskillingMarks, setFinalUpskillingMarks] = useState(0);

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
          // console.log(val.Target, "lllllllllllllllllllllllll");
          const valueMap = [
                    actualDelivery,
                    onTime,
                    com[ind].I,
                    com[ind].I,
                    com[ind].I,
                    critical,
                    com[ind].I,
                    com[ind].I,
          ];
          const value = valueMap[ind] !== undefined ? valueMap[ind] : "";

          // if (ind == 0) {
          //           let fMark =
          //                     ((100 +
          //                               ((actualDelivery -
          //                                         customActualdeliveryMarks) /
          //                                         customActualdeliveryMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (fMark && !isNaN(fMark)) {
          //                     setFinalActualdelivery(fMark);
          //           }
          // } else if (ind == 1) {
          //           let sMark =
          //                     ((100 +
          //                               ((onTime - customOnTimeMarks) /
          //                                         customOnTimeMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (sMark && !isNaN(sMark)) {
          //                     setFinalOnTimeMarks(sMark);
          //           }
          // } else if (ind == 2) {
          //           let tMark =
          //                     ((100 +
          //                               ((com[ind].I - customAvgCodeMarks) /
          //                                         customAvgCodeMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (tMark && !isNaN(tMark)) {
          //                     setFinalAvgCodeMarks(tMark);
          //           }
          // } else if (ind == 3) {
          //           let foMark =
          //                     ((100 +
          //                               ((com[ind].I - customReDoMarks) /
          //                                         customReDoMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (foMark && !isNaN(foMark)) {
          //                     setCustomFinalReDoMarks(foMark);
          //           }
          // } else if (ind == 4) {
          //           let fiMark =
          //                     ((100 +
          //                               ((com[ind].I -
          //                                         customBugsReportedMarks) /
          //                                         customBugsReportedMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (fiMark && !isNaN(fiMark)) {
          //                     setFinalBugsReportedMarks(fiMark);
          //           }
          // } else if (ind == 5) {
          //           let siMark =
          //                     ((100 +
          //                               ((critical -
          //                                         customCriticalIssuesMarks) /
          //                                         customCriticalIssuesMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (siMark && !isNaN(siMark)) {
          //                     setFinalCriticalIssuesMarks(siMark);
          //           }
          // } else if (ind == 6) {
          //           let seMark =
          //                     ((100 +
          //                               ((com[ind].I -
          //                                         customCustomerSatisfactionMarks) /
          //                                         customCustomerSatisfactionMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (seMark && !isNaN(seMark)) {
          //                     setFinalCustomerSatisfactionMarks(seMark);
          //           }
          // } else if (ind == 7) {
          //           let eMark =
          //                     ((100 +
          //                               ((com[ind].I - customUpskillingMarks) /
          //                                         customUpskillingMarks) *
          //                                         100) *
          //                               val.Weightage) /
          //                     100;
          //           if (eMark && !isNaN(eMark)) {
          //                     setFinalUpskillingMarks(eMark);
          //           }
          // }

          const formula = (a, b, c) => {
                    const value = Number(
                              ((100 + ((a - b) / b) * 100) * c) / 100
                    ).toFixed(2);

                    if (value !== "Infinity" && value !== "NaN") {
                              return value;
                    } else {
                              return 0;
                    }
          };
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
                                                            value={value}
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
                                                            min="0"
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
                                                  />
                                        </td>
                                        <td
                                                  style={{
                                                            backgroundColor:
                                                                      "#bf8f00",
                                                            position: "relative",
                                                  }}
                                        >
                                                  {/* {com[ind].K} */}
                                                  {ind === 0
                                                            ? formula(
                                                                        actualDelivery,
                                                                        customActualdeliveryMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 1
                                                            ? formula(
                                                                        onTime,
                                                                        customOnTimeMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 2
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customAvgCodeMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 3
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customReDoMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 4
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customBugsReportedMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 5
                                                            ? formula(
                                                                        critical,
                                                                        customCriticalIssuesMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 6
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customCustomerSatisfactionMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 7
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customUpskillingMarks,
                                                                        val.Weightage
                                                              )
                                                            : 0}
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  {/* {val.L} */}
                                                  <input
                                                            type="number"
                                                            min="0"
                                                            value={
                                                                      // val.AppraiserRating
                                                                      // com[ind].L
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
                                        </td>
                                        <td
                                                  style={{
                                                            backgroundColor:
                                                                      "#70ad47",
                                                  }}
                                        >
                                                  {/* {com[ind].M} */}
                                                  {ind === 0
                                                            ? formula(
                                                                        actualDelivery,
                                                                        customActualdeliveryMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 1
                                                            ? formula(
                                                                        onTime,
                                                                        customOnTimeMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 2
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customAvgCodeMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 3
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customReDoMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 4
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customBugsReportedMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 5
                                                            ? formula(
                                                                        critical,
                                                                        customCriticalIssuesMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 6
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customCustomerSatisfactionMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0 || ind === 7
                                                            ? formula(
                                                                        com[ind]
                                                                                  .I,
                                                                        customUpskillingMarksAr,
                                                                        val.Weightage
                                                              )
                                                            : 0}
                                        </td>
                                        <td>{com[ind].N}</td>
                                        <td>{com[ind].O}</td>
                              </tr>
                    </>
          );
};

const Renderforthtable = ({
          val,
          ind,
          lowPotential,
          setLowPotential,
          goodPotential,
          setGoodPotential,
          highPotential,
          setHighPotential,
}) => {
          //------------------------------------------------------------------//
          //Low potential states//
          //------------------------------------------------------------------//

          const [attendencelp, setAttendencelp] = useState(0);
          const [lessDDependabilitylp, setLessDDependabilitylp] = useState(0);
          const [groupWorkinglp, setGroupWorkinglp] = useState(0);
          const [positiveAttitudelp, setPositiveAttitudelp] = useState(0);
          const [intelligencelp, setIntelligencelp] = useState(0);
          const [imaginationlp, setImaginationlp] = useState(0);
          const [improvementlp, setImprovementlp] = useState(0);
          const [disciplinelp, setDisciplinelp] = useState(0);
          const [qualitylp, setQualitylp] = useState(0);
          const [responsibilitylp, setResponsibilitylp] = useState(0);
          const [multiSkillslp, setMultiSkillslp] = useState(0);

          //------------------------------------------------------------------//
          //Good potential states//
          //------------------------------------------------------------------//

          const [attendencegp, setAttendencegp] = useState(0);
          const [lessDDependabilitygp, setLessDDependabilitygp] = useState(0);
          const [groupWorkinggp, setGroupWorkinggp] = useState(0);
          const [positiveAttitudegp, setPositiveAttitudegp] = useState(0);
          const [intelligencegp, setIntelligencegp] = useState(0);
          const [imaginationgp, setImaginationgp] = useState(0);
          const [improvementgp, setImprovementgp] = useState(0);
          const [disciplinegp, setDisciplinegp] = useState(0);
          const [qualitygp, setQualitygp] = useState(0);
          const [responsibilitygp, setResponsibilitygp] = useState(0);
          const [multiSkillsgp, setMultiSkillsgp] = useState(0);

          //------------------------------------------------------------------//
          //High potential states//
          //------------------------------------------------------------------//

          const [attendencehp, setAttendencehp] = useState(0);
          const [lessDDependabilityhp, setLessDDependabilityhp] = useState(0);
          const [groupWorkinghp, setGroupWorkinghp] = useState(0);
          const [positiveAttitudehp, setPositiveAttitudehp] = useState(0);
          const [intelligencehp, setIntelligencehp] = useState(0);
          const [imaginationhp, setImaginationhp] = useState(0);
          const [improvementhp, setImprovementhp] = useState(0);
          const [disciplinehp, setDisciplinehp] = useState(0);
          const [qualityhp, setQualityhp] = useState(0);
          const [responsibilityhp, setResponsibilityhp] = useState(0);
          const [multiSkillshp, setMultiSkillshp] = useState(0);

          //------------------------------------------------------------------//
          //OnChnage//
          //------------------------------------------------------------------//

          function handleOnChange1(e) {
                    if (ind === 0) {
                              setAttendencelp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        attendencelp: e.target.value,
                              });
                    }
                    if (ind === 1) {
                              setLessDDependabilitylp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        lessDDependabilitylp: e.target.value,
                              });
                    }
                    if (ind === 2) {
                              setGroupWorkinglp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        groupWorkinglp: e.target.value,
                              });
                    }
                    if (ind === 3) {
                              setPositiveAttitudelp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        positiveAttitudelp: e.target.value,
                              });
                    }
                    if (ind === 4) {
                              setIntelligencelp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        intelligencelp: e.target.value,
                              });
                    }
                    if (ind === 5) {
                              setImaginationlp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        imaginationlp: e.target.value,
                              });
                    }
                    if (ind === 6) {
                              setImprovementlp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        improvementgp: e.target.value,
                              });
                    }
                    if (ind === 7) {
                              setDisciplinelp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        disciplinegp: e.target.value,
                              });
                    }
                    if (ind === 8) {
                              setQualitylp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        qualitylp: e.target.value,
                              });
                    }
                    if (ind === 9) {
                              setResponsibilitylp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        responsibilitylp: e.target.value,
                              });
                    }
                    if (ind === 10) {
                              setMultiSkillslp(e.target.value);
                              setLowPotential({
                                        ...lowPotential,
                                        multiSkillslp: e.target.value,
                              });
                    }
          }

          function handleOnChange2(e) {
                    if (ind === 0) {
                              setAttendencegp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        attendencegp: e.target.value,
                              });
                    }
                    if (ind === 1) {
                              setLessDDependabilitygp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        lessDDependabilitygp: e.target.value,
                              });
                    }
                    if (ind === 2) {
                              setGroupWorkinggp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        groupWorkinggp: e.target.value,
                              });
                    }
                    if (ind === 3) {
                              setPositiveAttitudegp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        positiveAttitudegp: e.target.value,
                              });
                    }
                    if (ind === 4) {
                              setIntelligencegp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        intelligencegp: e.target.value,
                              });
                    }
                    if (ind === 5) {
                              setImaginationgp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        imaginationgp: e.target.value,
                              });
                    }
                    if (ind === 6) {
                              setImprovementgp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        improvementgp: e.target.value,
                              });
                    }
                    if (ind === 7) {
                              setDisciplinegp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        disciplinegp: e.target.value,
                              });
                    }
                    if (ind === 8) {
                              setQualitygp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        qualitygp: e.target.value,
                              });
                    }
                    if (ind === 9) {
                              setResponsibilitygp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        responsibilitygp: e.target.value,
                              });
                    }
                    if (ind === 10) {
                              setMultiSkillsgp(e.target.value);
                              setGoodPotential({
                                        ...goodPotential,
                                        multiSkillsgp: e.target.value,
                              });
                    }
          }

          function handleOnChange3(e) {
                    if (ind === 0) {
                              setAttendencehp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        attendencehp: e.target.value,
                              });
                    }
                    if (ind === 1) {
                              setLessDDependabilityhp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        lessDDependabilityhp: e.target.value,
                              });
                    }
                    if (ind === 2) {
                              setGroupWorkinghp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        groupWorkinghp: e.target.value,
                              });
                    }
                    if (ind === 3) {
                              setPositiveAttitudehp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        positiveAttitudehp: e.target.value,
                              });
                    }
                    if (ind === 4) {
                              setIntelligencehp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        intelligencehp: e.target.value,
                              });
                    }
                    if (ind === 5) {
                              setImaginationhp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        imaginationhp: e.target.value,
                              });
                    }
                    if (ind === 6) {
                              setImprovementhp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        improvementhp: e.target.value,
                              });
                    }
                    if (ind === 7) {
                              setDisciplinehp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        disciplinehp: e.target.value,
                              });
                    }
                    if (ind === 8) {
                              setQualityhp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        qualityhp: e.target.value,
                              });
                    }
                    if (ind === 9) {
                              setResponsibilityhp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        responsibilityhp: e.target.value,
                              });
                    }
                    if (ind === 10) {
                              setMultiSkillshp(e.target.value);
                              setHighPotential({
                                        ...highPotential,
                                        multiSkillshp: e.target.value,
                              });
                    }
          }

          //------------------------------------------------------------------//
          //values//
          //------------------------------------------------------------------//

          const lowPotentialValues = [
                    attendencelp,
                    lessDDependabilitylp,
                    groupWorkinglp,
                    positiveAttitudelp,
                    intelligencelp,
                    imaginationlp,
                    improvementlp,
                    disciplinelp,
                    qualitylp,
                    responsibilitylp,
                    multiSkillslp,
          ];

          const lowPotentialInputValues =
                    lowPotentialValues[ind] !== undefined
                              ? lowPotentialValues[ind]
                              : "undefined";

          const goodPotentialValues = [
                    attendencegp,
                    lessDDependabilitygp,
                    groupWorkinggp,
                    positiveAttitudegp,
                    intelligencegp,
                    imaginationgp,
                    improvementgp,
                    disciplinegp,
                    qualitygp,
                    responsibilitygp,
                    multiSkillsgp,
          ];

          const goodPotentialInputValues =
                    goodPotentialValues[ind] !== undefined
                              ? goodPotentialValues[ind]
                              : "undefined";

          const highPotentialValues = [
                    attendencehp,
                    lessDDependabilityhp,
                    groupWorkinghp,
                    positiveAttitudehp,
                    intelligencehp,
                    imaginationhp,
                    improvementhp,
                    disciplinehp,
                    qualityhp,
                    responsibilityhp,
                    multiSkillshp,
          ];
          const highPotentialInputValues =
                    highPotentialValues[ind] !== undefined
                              ? highPotentialValues[ind]
                              : "undefined";

          return (
                    <>
                              <tr style={{ textAlign: "center" }}>
                                        <td>{val.B}</td>
                                        <td style={{ position: "relative" }}>
                                                  <input
                                                            type="number"
                                                            value={
                                                                      lowPotentialInputValues
                                                            }
                                                            onChange={(e) =>
                                                                      handleOnChange1(
                                                                                e
                                                                      )
                                                            }
                                                            style={{
                                                                      outline: "0",
                                                                      height: " 100%",
                                                                      width: "100%",
                                                                      position: " absolute",
                                                                      top: " 0",
                                                                      left: "0",
                                                                      border: " none",
                                                            }}
                                                  />
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  <input
                                                            type="number"
                                                            value={
                                                                      goodPotentialInputValues
                                                            }
                                                            onChange={(e) =>
                                                                      handleOnChange2(
                                                                                e
                                                                      )
                                                            }
                                                            style={{
                                                                      outline: "0",
                                                                      height: " 100%",
                                                                      width: "100%",
                                                                      position: " absolute",
                                                                      top: " 0",
                                                                      left: "0",
                                                                      border: " none",
                                                            }}
                                                  />
                                        </td>
                                        <td style={{ position: "relative" }}>
                                                  <input
                                                            type="number"
                                                            value={
                                                                      highPotentialInputValues
                                                            }
                                                            onChange={(e) =>
                                                                      handleOnChange3(
                                                                                e
                                                                      )
                                                            }
                                                            style={{
                                                                      outline: "0",
                                                                      height: " 100%",
                                                                      width: "100%",
                                                                      position: " absolute",
                                                                      top: " 0",
                                                                      left: "0",
                                                                      border: " none",
                                                            }}
                                                  />
                                        </td>
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
          const [loader, setLoader] = useState(false);
          const [updatedData, setUpdatedData] = useState({});
          const [loginUser, setLoginUser] = useState(
                    localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
          );
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

                    setUpdatedData(data);
          }
          useEffect(() => {
                    getAllData();
          }, []);

          useEffect(() => {
                    if (updatedData && updatedData.data) {
                              setParentSelfAppraise({
                                        customActualdeliveryMarks:
                                                  updatedData?.data?.data[0]
                                                            ?.AppraiseeSelfRating,
                                        customOnTimeMarks:
                                                  updatedData?.data?.data[1]
                                                            ?.AppraiseeSelfRating,
                                        customAvgCodeMarks:
                                                  updatedData?.data?.data[2]
                                                            ?.AppraiseeSelfRating,

                                        customReDoMarks:
                                                  updatedData?.data?.data[3]
                                                            ?.AppraiseeSelfRating,

                                        customBugsReportedMarks:
                                                  updatedData?.data?.data[4]
                                                            ?.AppraiseeSelfRating,

                                        customCriticalIssuesMarks:
                                                  updatedData?.data?.data[5]
                                                            ?.AppraiseeSelfRating,

                                        customCustomerSatisfactionMarks:
                                                  updatedData?.data?.data[6]
                                                            ?.AppraiseeSelfRating,

                                        customUpskillingMarks:
                                                  updatedData?.data?.data[7]
                                                            ?.AppraiseeSelfRating,
                              });
                    }
                    if (updatedData && updatedData.data) {
                              setParentAppraise({
                                        customActualdeliveryMarksAr:
                                                  updatedData?.data?.data[0]
                                                            ?.AppraiserRating,
                                        customOnTimeMarksAr:
                                                  updatedData?.data?.data[1]
                                                            ?.AppraiserRating,
                                        customAvgCodeMarksAr:
                                                  updatedData?.data?.data[2]
                                                            ?.AppraiserRating,
                                        customReDoMarksAr:
                                                  updatedData?.data?.data[3]
                                                            ?.AppraiserRating,
                                        customBugsReportedMarksAr:
                                                  updatedData?.data?.data[4]
                                                            ?.AppraiserRating,
                                        customCriticalIssuesMarksAr:
                                                  updatedData?.data?.data[5]
                                                            ?.AppraiserRating,
                                        customCustomerSatisfactionMarksAr:
                                                  updatedData?.data?.data[6]
                                                            ?.AppraiserRating,
                                        customUpskillingMarksAr:
                                                  updatedData?.data?.data[7]
                                                            ?.AppraiserRating,
                              });
                    }

                    if (updatedData && updatedData.data) {
                              setParentTarget({
                                        actualDelivery:
                                                  updatedData?.data?.data[0]
                                                            ?.Target,
                                        onTime: updatedData?.data?.data[1]
                                                  ?.Target,

                                        critical: updatedData?.data?.data[5]
                                                  ?.Target,
                              });
                    }
          }, [updatedData]);

          const [parentTarget, setParentTarget] = useState({});

          const [parentAppraise, setParentAppraise] = useState({});
          const [parentSelfAppraise, setParentSelfAppraise] = useState({});
          console.log("EEEEEEEEEEEE", parentSelfAppraise);

          //------------------------------------------------------------------//
          //Behavioural KPI Table//
          //------------------------------------------------------------------//

          const initialLowPotential = {
                    attendencelp: 0,
                    lessDDependabilitylp: 0,
                    groupWorkinglp: 0,
                    positiveAttitudelp: 0,
                    intelligencelp: 0,
                    imaginationlp: 0,
                    improvementlp: 0,
                    disciplinelp: 0,
                    qualitylp: 0,
                    responsibilitylp: 0,
                    multiSkillslp: 0,
          };
          const initialGoodPotential = {
                    attendencegp: 0,
                    lessDDependabilitygp: 0,
                    groupWorkinggp: 0,
                    positiveAttitudegp: 0,
                    intelligencegp: 0,
                    imaginationgp: 0,
                    improvementgp: 0,
                    disciplinegp: 0,
                    qualitygp: 0,
                    responsibilitygp: 0,
                    multiSkillsgp: 0,
          };
          const initialHighPotential = {
                    attendencehp: 0,
                    lessDDependabilityhp: 0,
                    groupWorkinghp: 0,
                    positiveAttitudehp: 0,
                    intelligencehp: 0,
                    imaginationhp: 0,
                    improvementhp: 0,
                    disciplinehp: 0,
                    qualityhp: 0,
                    responsibilityhp: 0,
                    multiSkillshp: 0,
          };

          const [lowPotential, setLowPotential] = useState(initialLowPotential);
          const [goodPotential, setGoodPotential] =
                    useState(initialGoodPotential);
          const [highPotential, setHighPotential] =
                    useState(initialHighPotential);

          async function KpiMarks() {
                    // show_error("are you agree this points");
                    alert("okkkkkkkkkkkk");
                    setLoader(true);
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
                                        ShowDevOpsData: 0,
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
                                                            loginUser || "";
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
                    let data = axios({
                              method: "post",
                              url: `http://localhost:8080/kpi/marks`,
                              data: allFinalData,
                              headers: { Accept: "application/json" },
                    });
                    setTimeout(() => {
                              setLoader(false);
                    }, 2000);
          }

          let firstTable = fileData.slice(0, 4);
          let secondTable = fileData.slice(4, 5);
          let thirdTable = fileData.slice(6, 14);
          let forthTable = fileData.slice(17, 31);
          let fifthTable = fileData.slice(32, 37);

          return (
                    <>
                              {loader ? (
                                        <Loading />
                              ) : (
                                        <div style={{ border: "none" }}>
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
                                                            {firstTable.map(
                                                                      (
                                                                                val,
                                                                                index
                                                                      ) => {
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
                                                                      }
                                                            )}
                                                            <tr
                                                                      style={{
                                                                                height: "100px",
                                                                      }}
                                                            ></tr>
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
                                                                                {
                                                                                          secondTable[0]
                                                                                                    .B
                                                                                }
                                                                      </td>
                                                            </tr>
                                                            <tr>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .B
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .C
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .D
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .E
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .F
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .G
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .H
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .I
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .J
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .K
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .L
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .M
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .N
                                                                                }
                                                                      </th>
                                                                      <th
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#00b0f0",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[5]
                                                                                                    .O
                                                                                }
                                                                      </th>
                                                            </tr>

                                                            {updatedData?.data
                                                                      ?.data[0]
                                                                      ?.ShowDevOpsData ===
                                                                      1 ||
                                                            updatedData?.data
                                                                      ?.data[0]
                                                                      ?.ShowDevOpsData ===
                                                                      undefined
                                                                      ? thirdTable?.map(
                                                                                  (
                                                                                            val,
                                                                                            ind
                                                                                  ) => {
                                                                                            return (
                                                                                                      <>
                                                                                                                <Renderthirdtable
                                                                                                                          thirdTable={
                                                                                                                                    thirdTable
                                                                                                                          }
                                                                                                                          ind={
                                                                                                                                    ind
                                                                                                                          }
                                                                                                                          val={
                                                                                                                                    val
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
                                                                        )
                                                                      : updatedData?.data?.data?.map(
                                                                                  (
                                                                                            val,
                                                                                            ind
                                                                                  ) => {
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

                                                            <tr
                                                                      style={{
                                                                                height: "100px",
                                                                      }}
                                                            ></tr>
                                                            <tr
                                                                      style={{
                                                                                height: "40px",
                                                                      }}
                                                            >
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#f4b084",
                                                                                          textAlign: "center",
                                                                                }}
                                                                                colSpan="5"
                                                                      >
                                                                                {
                                                                                          fileData[14]
                                                                                                    .B
                                                                                }
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
                                                                                {
                                                                                          fileData[15]
                                                                                                    .B
                                                                                }
                                                                      </td>
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[15]
                                                                                                    .C
                                                                                }
                                                                      </td>
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[15]
                                                                                                    .D
                                                                                }
                                                                      </td>
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[15]
                                                                                                    .E
                                                                                }
                                                                      </td>
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                                rowSpan="2"
                                                                      >
                                                                                {
                                                                                          fileData[15]
                                                                                                    .F
                                                                                }
                                                                      </td>
                                                            </tr>
                                                            <tr>
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[16]
                                                                                                    .C
                                                                                }
                                                                      </td>
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[16]
                                                                                                    .D
                                                                                }
                                                                      </td>
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                      >
                                                                                {
                                                                                          fileData[16]
                                                                                                    .E
                                                                                }
                                                                      </td>
                                                            </tr>
                                                            {forthTable.map(
                                                                      (
                                                                                val,
                                                                                index
                                                                      ) => {
                                                                                return (
                                                                                          <>
                                                                                                    <Renderforthtable
                                                                                                              key={
                                                                                                                        index
                                                                                                              }
                                                                                                              val={
                                                                                                                        val
                                                                                                              }
                                                                                                              ind={
                                                                                                                        index
                                                                                                              }
                                                                                                              lowPotential={
                                                                                                                        lowPotential
                                                                                                              }
                                                                                                              setLowPotential={
                                                                                                                        setLowPotential
                                                                                                              }
                                                                                                              goodPotential={
                                                                                                                        goodPotential
                                                                                                              }
                                                                                                              setGoodPotential={
                                                                                                                        setGoodPotential
                                                                                                              }
                                                                                                              highPotential={
                                                                                                                        highPotential
                                                                                                              }
                                                                                                              setHighPotential={
                                                                                                                        setHighPotential
                                                                                                              }
                                                                                                    />
                                                                                          </>
                                                                                );
                                                                      }
                                                            )}
                                                            <tr
                                                                      style={{
                                                                                height: "100px",
                                                                      }}
                                                            ></tr>
                                                            <tr
                                                                      style={{
                                                                                height: "40px",
                                                                      }}
                                                            >
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#f4b084",
                                                                                          textAlign: "center",
                                                                                }}
                                                                                colSpan="5"
                                                                      >
                                                                                Feedback
                                                                      </td>
                                                            </tr>
                                                            <tr
                                                                      style={{
                                                                                height: "40px",
                                                                      }}
                                                            >
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                                colSpan="5"
                                                                      >
                                                                                <span
                                                                                          style={{
                                                                                                    margin: " 0px 25px",
                                                                                          }}
                                                                                >
                                                                                          Positive
                                                                                          point
                                                                                </span>
                                                                      </td>
                                                            </tr>
                                                            <td
                                                                      style={{
                                                                                background: "lightgrey",
                                                                                position: "relative",
                                                                                height: "9rem",
                                                                                display: "flex",
                                                                                border: "none",
                                                                      }}
                                                            >
                                                                      <textarea
                                                                                type="text"
                                                                                // placeholder="positive point"
                                                                                style={{
                                                                                          outline: "none",
                                                                                          position: "absolute",
                                                                                          background: "rgb(227, 226, 226)",
                                                                                          border: "none",
                                                                                          width: " 590px",
                                                                                          padding: "10px 29px",
                                                                                          height: "145px",
                                                                                          resize: "none",
                                                                                }}
                                                                      />
                                                            </td>
                                                            <tr
                                                                      style={{
                                                                                height: "50px",
                                                                      }}
                                                            ></tr>

                                                            <tr
                                                                      style={{
                                                                                height: "40px",
                                                                      }}
                                                            >
                                                                      <td
                                                                                style={{
                                                                                          backgroundColor:
                                                                                                    "#92d050",
                                                                                }}
                                                                                colSpan="5"
                                                                      >
                                                                                <span
                                                                                          style={{
                                                                                                    margin: " 0px 25px",
                                                                                          }}
                                                                                >
                                                                                          Scope
                                                                                          of
                                                                                          improvement
                                                                                </span>
                                                                      </td>
                                                            </tr>
                                                            <td
                                                                      style={{
                                                                                background: "lightgrey",
                                                                                position: "relative",
                                                                                height: "9rem",
                                                                                display: "flex",
                                                                                border: "none",
                                                                      }}
                                                            >
                                                                      <textarea
                                                                                type="text"
                                                                                // placeholder="positive point"
                                                                                style={{
                                                                                          outline: "none",
                                                                                          position: "absolute",
                                                                                          background: "rgb(227, 226, 226)",
                                                                                          border: "none",
                                                                                          width: " 590px",
                                                                                          padding: "10px 29px",
                                                                                          height: "145px",
                                                                                          resize: "none",
                                                                                }}
                                                                      />
                                                            </td>
                                                            <tr
                                                                      style={{
                                                                                height: "30px",
                                                                      }}
                                                            ></tr>
                                                            <td
                                                                      style={{
                                                                                backgroundColor:
                                                                                          "#92d050",
                                                                      }}
                                                                      colSpan="5"
                                                            >
                                                                      <span
                                                                                style={{
                                                                                          margin: " 0px 25px",
                                                                                }}
                                                                      >
                                                                                Do
                                                                                you
                                                                                agree
                                                                                with
                                                                                this
                                                                                feedback
                                                                                ?{" "}
                                                                      </span>
                                                            </td>
                                                            <tr
                                                                      style={{
                                                                                height: "15px",
                                                                      }}
                                                            ></tr>
                                                            <td
                                                                      style={{
                                                                                display: "flex",
                                                                                border: "none",
                                                                      }}
                                                            >
                                                                      <div>
                                                                                <button
                                                                                          style={{
                                                                                                    borderRadius: "0px",
                                                                                                    height: "30px",
                                                                                                    width: "60px",
                                                                                                    fontSize: "13px",

                                                                                                    background: "#b0afaf",
                                                                                                    color: "black",
                                                                                                    fontWeight: "600",
                                                                                                    display: "flex",
                                                                                                    justifyContent:
                                                                                                              "center",
                                                                                                    margin: "0px 10px",
                                                                                          }}
                                                                                >
                                                                                          <span>
                                                                                                    Yes
                                                                                          </span>
                                                                                </button>
                                                                      </div>
                                                                      <div>
                                                                                <button
                                                                                          style={{
                                                                                                    borderRadius: "0px",
                                                                                                    height: "30px",
                                                                                                    width: "60px",
                                                                                                    fontSize: "13px",
                                                                                                    display: "flex",
                                                                                                    justifyContent:
                                                                                                              "center",
                                                                                                    background: "#b0afaf",
                                                                                                    color: "black",
                                                                                                    fontWeight: "600",
                                                                                                    margin: "0px 15px",
                                                                                          }}
                                                                                >
                                                                                          No
                                                                                </button>
                                                                      </div>
                                                            </td>
                                                            <td
                                                                      style={{
                                                                                border: "none",
                                                                      }}
                                                            ></td>
                                                            <td
                                                                      style={{
                                                                                border: "none",
                                                                      }}
                                                            ></td>
                                                            <td
                                                                      style={{
                                                                                border: "none",
                                                                      }}
                                                            ></td>
                                                            <td
                                                                      style={{
                                                                                border: "none",
                                                                      }}
                                                            ></td>
                                                            <td
                                                                      style={{
                                                                                border: "none",
                                                                      }}
                                                            ></td>
                                                            <td
                                                                      style={{
                                                                                border: "none",
                                                                      }}
                                                            ></td>

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
                                                                                Submit
                                                                                KPI
                                                                      </Button>
                                                            </div>
                                                            <tr
                                                                      style={{
                                                                                height: "100px",
                                                                      }}
                                                            ></tr>

                                                            {fifthTable.map(
                                                                      (
                                                                                val,
                                                                                index
                                                                      ) => {
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
                                                                      }
                                                            )}
                                                  </table>
                                        </div>
                              )}
                    </>
          );
};

export default Tableviewnew;
