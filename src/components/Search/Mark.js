import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useLocation, NavLink } from "react-router-dom";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import moment from "moment";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";

import { API_END_POINTS } from "../../Config/Constant";
import { show_error } from "../../Config/Helper";
import { ERROR } from "../../Config/Constant";
import Loading from "../Loading";
import { BACKEND_URL, tableData } from "./config";
import { ACCESS_TOKEN } from "../../Config/Constant";
import Tableview from "./Tableview";
import Tableviewnew from "./Tableviewnew";
import { SignalWifiStatusbarNullRounded } from "@mui/icons-material";
import { NULL } from "xlsx-populate/lib/FormulaError";

const useStyles = makeStyles({
  sprintbg: {
    "& > *": {
      color: "black",
    },
  },
  tableRow: {
    transition: "transform",
    "&:hover": {
      transform: "scale(1.4)",
    },
  },
});

const Mark = () => {
  if (!JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN))) {
    window.location = "/login";
  }

  const search = useLocation().search;
  const email = new URLSearchParams(search).get("email");

  const [isReload, setIsRelaod] = useState(0);

  const [selectedEmail, setSelectedEmail] = useState(email ? email : "");
  const [EmpName, setEmpName] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [TaskwiseMarks, setTaskwiseMarks] = useState(0);
  const [criticalMarks, setcriticalMarks] = useState(0);
  const [redoMarks, setRedoMarks] = useState(0);
  const [Redocount, setRedocount] = useState(0);
  const [sprintwiseMarks, setsprintwiseMarks] = useState(0);
  const monthyear = moment().format("YYYY-MM");
  const firstDay = moment(monthyear + "-01").format("YYYY-MM-DD");
  const [showCustomDate, setshowCustomDate] = useState();
  const [timePeriod, setTimePeriod] = useState();
  // const [customdate, setCustomdate] = useState([
  //   moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD"),
  //   moment(firstDay).subtract("1", "days").format("YYYY-MM-DD"),
  // ]);
  const [customdate, setCustomdate] = useState([
    localStorage.getItem("startDate"),

    localStorage.getItem("endDate"),
  ]);
  const [dateEvent, setEvent] = useState();
  const [test, setTest] = useState([]);
  const [clientbugMarks, setClientbugMarks] = useState(0);
  const [ExcelFileData, setExcelFileData] = useState(null);
  const [Designation, setDesignation] = useState();
  const [fileData, setFileData] = useState();
  const [TotalEffort, setTotalEffort] = useState(0);
  const [codeReviewRating, setCodeReviewRating] = useState(0);
  const [Totalactualhour, setTotalactualhour] = useState(0);
  const [AssignTask, setAssignTask] = useState(0);
  const [OntimeTask, setOntimeTask] = useState(0);
  const [TotalcriticalBug, setTotalcriticalBug] = useState(0);
  const [ResolvedcriticalBug, setResolvedcriticalBug] = useState(0);
  const [ReportedByclient, setReportedByclient] = useState(0);

  const [startDate, setstartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [isThreeMonths, setIsThreeMonths] = useState(false);

  const [lastDate, setlastDate] = useState(
    moment(firstDay).subtract("1", "days").format("YYYY-MM-DD")
  );
  const [selectedThreeMonths, setSelectedThreeMonths] = useState(false);

  const classes = useStyles();

  let dataApi = [];

  useEffect(() => {
    setLoadingData(true);
    setExcelFileData(null);
    setFileData(null);
    let responseArr = [];
    let ontimesprint = 0;
    let effortArr = [];
    let codeReviewRatingArr = [];
    let actualHoursArr = [];
    let redoHoursArr = [];
    let uniqueProjectlist = [];
    let taskandbugsArr = [];
    let redocountArr = 0;
    let numberofbugsreportedbyClient = 0;

    let headersList = {
      Accept: "application/json",
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN)).access_token
      }`,
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `${API_END_POINTS.BASE_URL}/_apis/wit/wiql?api-version=6.0`,
      method: "POST",
      headers: headersList,
      data: `{\n  "query": "Select * From workItems WHERE [System.WorkItemType] = 'Task' AND ([Custom.ExpectedStartDate] >= '${startDate}' AND [Custom.ExpectedStartDate] <= '${lastDate}' OR [Microsoft.VSTS.Scheduling.DueDate] >= '${startDate}' AND [Microsoft.VSTS.Scheduling.DueDate]<= '${lastDate}') AND [System.AssignedTo] = \'${selectedEmail}\'"\n}`,
    };

    let reqOptionsforBugs = {
      url: `${API_END_POINTS.BASE_URL}/_apis/wit/wiql?api-version=6.0`,
      method: "POST",
      headers: headersList,
      data: `{\n  "query": "Select * From workItems WHERE [System.WorkItemType] = 'Bug' AND ( [Custom.ExpectedStartDate] >= '${startDate}' AND [Custom.ExpectedStartDate] <= '${lastDate}' OR [Microsoft.VSTS.Scheduling.DueDate] >='${startDate}' AND [Microsoft.VSTS.Scheduling.DueDate]<= '${lastDate}') AND [System.AssignedTo] = \'${selectedEmail}\'"\n}`,
    };
    taskandbugsArr.push(axios.request(reqOptions));
    taskandbugsArr.push(axios.request(reqOptionsforBugs));

    let taskandbugsResponse = Promise.all(taskandbugsArr);

    var ids = [];

    taskandbugsResponse.then((response) => {
      (response || []).map((res) => {
        res?.data?.workItems?.map((workitem) => {
          ids.push(workitem.id);
        });
      });

      if (!ids.length) {
        setLoadingData(false);
        show_error(ERROR.PERMISSION_ERROR);
        setTaskwiseMarks(0);
        setsprintwiseMarks(0);
        setRedoMarks(0);
        setcriticalMarks(0);
        setClientbugMarks(0);
        return;
      }

      for (let index = 0; index < Math.ceil(ids.length / 300); index++) {
        let headersList = {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN)).access_token
          }`,
          "Content-Type": "application/json",
        };
        let reqOptions = {
          url: `${API_END_POINTS.BASE_URL}/Speedo/_apis/wit/workitems?ids=${ids
            .slice(index * 200, (index + 1) * 200)
            .toString(",")}&api-version=6.0`,
          method: "GET",
          headers: headersList,
        };
        responseArr.push(axios.request(reqOptions));
        let result = Promise.all(responseArr);

        result.then((resp) => {
          resp.map((resp) => {
            let task = resp?.data?.value.filter((val) => {
              // let value = val.fields["System.State"] !== "Removed";

              return val;
            });
            let assignedTask = task.length;
            // ----------------------------------------------------------------------------------------
            // task wise  marks calculation according to hours
            task.map((res) => {
              setEmpName(res?.fields["System.AssignedTo"]?.displayName);
              if (
                res.fields["System.State"] === "Closed" ||
                res.fields["System.State"] === "Done" ||
                res.fields["System.State"] === "Ready" ||
                res.fields["System.State"] === "Passed QA" ||
                res.fields["System.State"] === "Ready for QA" ||
                res.fields["System.State"] === "To Do" ||
                res.fields["System.State"] === "Blocked" ||
                res.fields["System.State"] === "In Progress" ||
                res.fields["System.State"] === "Removed" ||
                res.fields["System.State"] === "New" ||
                res.fields["System.State"] === "Rework" ||
                res.fields["System.State"] === "Merged"
              ) {
                let effort =
                  res.fields["Microsoft.VSTS.Scheduling.Effort"] || 0;
                effortArr.push(effort);
                let CodeReviewRating =
                  res.fields["Custom.CodeReviewRating"] || 0;
                codeReviewRatingArr.push(CodeReviewRating);
                const filteredArr = codeReviewRatingArr.filter(
                  (val) => val !== 0
                );
                let ReviewArr = filteredArr.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                );
                let finalReviewArr = ReviewArr / filteredArr.length;

                setCodeReviewRating(finalReviewArr);
                let actualHours = 0;
                if (
                  res.fields["System.WorkItemType"] === "Task" ||
                  res.fields["System.WorkItemType"] === "Bug"
                ) {
                  actualHours = res.fields["Custom.HoursTaken"] || 0;
                }

                let redoHours;
                redoHours = res.fields["Custom.RedoHours"] || 0;
                if (res.fields["System.WorkItemType"] === "Bug") {
                  redoHours = res.fields["Custom.RedoHours"] || 2 * effort;
                }
                if (actualHours !== 0) {
                  actualHoursArr.push(actualHours);
                } else {
                  actualHoursArr.push(effort * 3);
                }

                redoHoursArr.push(redoHours);
              }
            });

            actualHoursArr = (actualHoursArr || [])
              .reduce((partialmarks, a) => partialmarks + a, 0)
              .toFixed(2);
            actualHoursArr = parseFloat(actualHoursArr);

            effortArr = (effortArr || [])
              .reduce((partialmarks, a) => partialmarks + a, 0)
              .toFixed(2);
            effortArr = parseFloat(effortArr);

            redoHoursArr = (redoHoursArr || [])
              .reduce((partialmarks, a) => partialmarks + a, 0)
              .toFixed(2);
            redoHoursArr = parseFloat(redoHoursArr);
            // actualHoursArr = actualHoursArr + redoHoursArr;
            setTotalEffort(effortArr);
            setTotalactualhour(actualHoursArr);
            if (effortArr && actualHoursArr) {
              let tasmark =
                ((100 + ((effortArr - actualHoursArr) / actualHoursArr) * 100) *
                  20) /
                100;
              tasmark = parseFloat(tasmark.toFixed(2));
              setTaskwiseMarks(tasmark);
            } else {
              setTaskwiseMarks(0);
            }
            // -------------------------------------------------------------------------------------------
            // calculation according to sprint start
            let projectList = [];
            task.map((res) => {
              projectList.push(res.fields["System.AreaPath"]);
            });
            uniqueProjectlist = [...new Set(projectList)];
            uniqueProjectlist.map((projectName) => {
              let requestOptions = {
                url: `${API_END_POINTS.BASE_URL}/${projectName}/${projectName} Team/_apis/work/teamsettings/iterations?api-version=6.0`,
                method: "GET",
                headers: headersList,
              };
              dataApi.push(axios.request(requestOptions));
            });
            let sprintDetails = Promise.all(dataApi);
            sprintDetails.then((res) => {
              (res || []).map((sprint) => {
                (sprint.data.value || []).map((innersprint) => {
                  if (innersprint) {
                    setLoadingData(false);
                  }
                  (task || []).map((taskdetails) => {
                    if (
                      innersprint.path ===
                      taskdetails.fields["System.IterationPath"]
                    ) {
                      if (
                        taskdetails.fields["System.State"] === "Closed" ||
                        taskdetails.fields["System.State"] === "Done" ||
                        taskdetails.fields["System.State"] === "Ready" ||
                        taskdetails.fields["System.State"] === "Passed QA" ||
                        taskdetails.fields["System.State"] === "Ready for QA" ||
                        taskdetails.fields["System.State"] === "To Do" ||
                        taskdetails.fields["System.State"] === "Blocked" ||
                        taskdetails.fields["System.State"] === "In Progress" ||
                        taskdetails.fields["System.State"] === "Removed" ||
                        taskdetails.fields["System.State"] === "New" ||
                        taskdetails.fields["System.State"] === "Rework" ||
                        taskdetails.fields["System.State"] === "Merged"
                      ) {
                        let dueDate = moment(
                          taskdetails.fields[
                            "Microsoft.VSTS.Scheduling.DueDate"
                          ]
                        ).format("YYYY-MM-DD");
                        let actualEndDate = moment(
                          taskdetails.fields["Custom.ActualEndDate"]
                        ).format("YYYY-MM-DD");
                        let diffInDays = moment(actualEndDate).diff(
                          dueDate,
                          "days"
                        );

                        if (
                          actualEndDate <= dueDate &&
                          taskdetails.fields["Custom.HoursTaken"] <=
                            taskdetails.fields[
                              "Microsoft.VSTS.Scheduling.Effort"
                            ]
                        ) {
                          ontimesprint++;
                        } else if (diffInDays == 1) {
                          ontimesprint += 0.9;
                        } else if (diffInDays == 2) {
                          ontimesprint += 0.6;
                        } else if (diffInDays == 3) {
                          ontimesprint += 0.3;
                        }
                        //   }
                        // }
                      }
                    }
                  });
                });
              });
              setAssignTask(assignedTask);
              setOntimeTask(ontimesprint);
              if (assignedTask && ontimesprint) {
                let sprintmarks =
                  ((100 +
                    ((ontimesprint - assignedTask) / assignedTask) * 100) *
                    25) /
                  100;
                sprintmarks = sprintmarks.toFixed(2);
                sprintmarks = parseFloat(sprintmarks);
                setsprintwiseMarks(sprintmarks);
              } else {
                setsprintwiseMarks(0);
              }
            });
            // ---------------------------------------------------------------------------------------------------------
            // marks calculation according to redocount
            task.map((redo) => {
              // let redoCount = redo.fields["System.State"] || 0;
              // redocountArr.push(redoCount);
              if (redo.fields["System.State"] === "Rework") {
                return redocountArr++;
              }
            });
            // redocountArr = (redocountArr || []).reduce(
            //   (partialmarks, a) => partialmarks + a,
            //   0
            // );

            setRedocount(redocountArr);
            if (redocountArr) {
              let redocountmarks =
                ((100 + ((2 - redocountArr) / redocountArr) * 100) * 10) / 100;
              redocountmarks = redocountmarks.toFixed(2);
              redocountmarks = parseFloat(redocountmarks);
              setRedoMarks(redocountmarks);
            } else {
              setRedoMarks(0);
            }
            // ---------------------------------------------------------------------------------------------------
            // Marks calculation according to critical issue resolved

            let critical = task.filter((innerval) => {
              let criticaltask =
                innerval.fields["Microsoft.VSTS.Common.Severity"] ===
                "1 - Critical";
              return criticaltask;
            });
            let resolvecriticalbug = critical.filter((innerval) => {
              let value =
                innerval.fields["System.State"] === "Closed" ||
                innerval.fields["System.State"] === "Done" ||
                innerval.fields["System.State"] === "Ready" ||
                innerval.fields["System.State"] === "Passed QA" ||
                innerval.fields["System.State"] === "Ready for QA";
              return value;
            });
            let totalcriticalbug = critical.length;
            resolvecriticalbug = resolvecriticalbug.length;
            if (totalcriticalbug && resolvecriticalbug) {
              setResolvedcriticalBug(resolvecriticalbug);
              setTotalcriticalBug(totalcriticalbug);
              let criticalmarks = (resolvecriticalbug / totalcriticalbug) * 5;
              criticalmarks = criticalmarks.toFixed(2);
              criticalmarks = parseFloat(criticalmarks);
              setcriticalMarks(criticalmarks);
            } else {
              setcriticalMarks(0);
            }
            //------------------------------------------------------------------------------------------------
            // Marks calculation according to bugs reported by client
            task.filter((innerval) => {
              if (
                innerval.fields["System.Tags"] === "ReportedByClient" ||
                innerval.fields["System.Tags"] === "Critical" ||
                innerval.fields["System.Tags"] === "Critical; ReportedByClient"
              ) {
                numberofbugsreportedbyClient++;
              }
              if (innerval.fields["System.Tags"] === "Reopen") {
                redocountArr++;
              }
              if (
                innerval.fields["System.Tags"] === "Critical; Reopen" ||
                innerval.fields["System.Tags"] === "Reopen; ReportedByClient" ||
                innerval.fields["System.Tags"] ===
                  "Critical; Reopen; ReportedByClient"
              ) {
                numberofbugsreportedbyClient++;
                redocountArr++;
              }
            });
            setRedocount(redocountArr);
            // let bugsreportedbyClient = task.filter((innerval) => {
            //   let reportedbyclient =
            //     innerval.fields["System.Tags"] === "ReportedByClient" || innerval.fields["System.Tags"] === "Critical";
            //   return reportedbyclient;
            // });
            // let numberofbugsreportedbyClient = bugsreportedbyClient.length;
            setReportedByclient(numberofbugsreportedbyClient);
            if (numberofbugsreportedbyClient) {
              let reportedbyclientmark =
                ((100 +
                  ((2 - numberofbugsreportedbyClient) /
                    numberofbugsreportedbyClient) *
                    100) *
                  10) /
                100;
              reportedbyclientmark = reportedbyclientmark.toFixed(2);
              reportedbyclientmark = parseFloat(reportedbyclientmark);
              setClientbugMarks(reportedbyclientmark);
            } else {
              setClientbugMarks(0);
            }
          });
        });
      }
    });
  }, [startDate, lastDate]);

  useEffect(() => {
    if (
      !(
        TaskwiseMarks === "" &&
        sprintwiseMarks === "" &&
        redoMarks === "" &&
        criticalMarks === "" &&
        clientbugMarks === ""
      )
    ) {
      let newtableData = [...tableData];
      newtableData[0].marks = [TaskwiseMarks, sprintwiseMarks];
      newtableData[1].marks = [0, redoMarks, clientbugMarks];
      newtableData[2].marks = [criticalMarks, 0];
      setTest(newtableData);
    }
  }, [
    TaskwiseMarks,
    sprintwiseMarks,
    redoMarks,
    criticalMarks,
    clientbugMarks,
  ]);

  const handleexceldropdown = async (e) => {
    let selectedFile = e;
    setDesignation(e);
    localStorage.setItem("designation", selectedFile);
    let data = await axios({
      method: "post",
      url: `${BACKEND_URL}/dummy/path`,
      // url: `http://localhost:8080/dummy/path`,
      data: {
        selectedFile: selectedFile,
      },
      // headers: { Accept: "application/json" }
    });

  

    let finalData = [];
    finalData = data?.data?.Updated2023;
    finalData[0].C = EmpName;
    finalData[0].E = lastDate;
    finalData[1].E = startDate;
    finalData[6].I = TotalEffort;
    finalData[6].J = Totalactualhour;
    finalData[6].K = TaskwiseMarks;
    finalData[7].I = AssignTask;
    finalData[7].J = OntimeTask;
    finalData[7].K = sprintwiseMarks;
    finalData[8].K = 0;
    finalData[9].J = Redocount;
    finalData[9].K = redoMarks;
    finalData[10].J = ReportedByclient;
    finalData[10].K = clientbugMarks;
    finalData[11].K = criticalMarks;
    finalData[11].I = TotalcriticalBug;
    finalData[11].J = ResolvedcriticalBug;
    finalData[12].K = 0;
    finalData[13].K = 0;
    setFileData(finalData);
  };

  useEffect(() => {
    setDesignation(localdesigantion);
    const urlParams = new URLSearchParams(window.location.search);
    const hasMarkParam = urlParams.has("email");
    if (hasMarkParam === false) {
      localStorage.removeItem("designation");
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
    }
  }, []);

  // ******************************************************************************************//
  // Get the current date
  const currentDate = moment();

  const year = moment().year(); // The year you want to divide into quarters

  // Get the first day of each quarter for the given year
  const q1Start = moment({ year }).startOf("year");
  const q2Start = moment({ year }).startOf("year").add(3, "months");
  const q3Start = moment({ year }).startOf("year").add(6, "months");
  const q4Start = moment({ year }).startOf("year").add(9, "months");

  // Get the last day of each quarter for the given year
  const q1End = moment(q2Start).subtract(1, "day");
  const q2End = moment(q3Start).subtract(1, "day");
  const q3End = moment(q4Start).subtract(1, "day");
  const q4End = moment({ year }).endOf("year");

  // Format the start and end dates of each quarter as strings
  const startJanToMar = q1Start.format("YYYY-MM-DD");
  const endJanToMar = q1End.format("YYYY-MM-DD");
  const startAprToJun = q2Start.format("YYYY-MM-DD");
  const endAprToJun = q2End.format("YYYY-MM-DD");
  const startJulToSep = q3Start.format("YYYY-MM-DD");
  const endJulToSep = q3End.format("YYYY-MM-DD");
  const startOctToDec = q4Start.format("YYYY-MM-DD");
  const endOctToDec = q4End.format("YYYY-MM-DD");

  // Determine which quarter is coming soon or has already passed
  let janToMar = true;
  let aprToJun = true;
  let julToSep = true;
  let octToDec = true;

  if (currentDate.isBetween(q1Start, q1End, null, "[]")) {
    janToMar = false;
  } else if (currentDate.isBetween(q2Start, q2End, null, "[]")) {
    janToMar = false;
    aprToJun = false;
  } else if (currentDate.isBetween(q3Start, q3End, null, "[]")) {
    janToMar = false;
    aprToJun = false;
    julToSep = false;
  } else if (currentDate.isBetween(q4Start, q4End, null, "[]")) {
    janToMar = false;
    aprToJun = false;
    julToSep = false;
    octToDec = false;
  }

  // *************************************************************************************** //

  const handleChangeSelectBox = (event) => {
    setTimePeriod(event);
    localStorage.setItem("timperiod", event);
    // ..........................................................................................................
    // Jan To March Months
    if (event == 1) {
      localStorage.setItem("startDate", startJanToMar);
      localStorage.setItem("endDate", endJanToMar);
      setEvent(1);
      setstartDate(startJanToMar);
      setlastDate(endJanToMar);
      setSelectedThreeMonths(true);
    }

    // Apr To Jun Months
    if (event == 2) {
      localStorage.setItem("startDate", startAprToJun);
      localStorage.setItem("endDate", endAprToJun);
      setEvent(2);
      setstartDate(startAprToJun);
      setlastDate(endAprToJun);
      setSelectedThreeMonths(true);
    }

    // Jul To Sep Months
    if (event == 3) {
      localStorage.setItem("startDate", startJulToSep);
      localStorage.setItem("endDate", endJulToSep);
      setEvent(3);
      setstartDate(startJulToSep);
      setlastDate(endJulToSep);
      setSelectedThreeMonths(true);
    }

    // Oct To Dec Months
    if (event == 4) {
      localStorage.setItem("startDate", startOctToDec);
      localStorage.setItem("endDate", endOctToDec);
      setEvent(4);
      setstartDate(startOctToDec);
      setlastDate(endOctToDec);
      setSelectedThreeMonths(true);
    }

    // custom
    if (event == 5) {
      setshowCustomDate(true);
      setEvent(5);
      setSelectedThreeMonths(false);

      return;
    }
  };

  const localdesigantion = localStorage.getItem("designation");
  const localStartDate = localStorage.getItem("startDate");
  const localTimePeriod = localStorage.getItem("timperiod");
  const localEndDate = localStorage.getItem("endDate");

  function checkThreeMonths() {
    if (Number(localTimePeriod) == 5) {
    
      const date1 = new Date(localStartDate);
      const date2 = new Date(localEndDate);

      const diffInMonths =
        (date2.getFullYear() - date1.getFullYear()) * 12 +
        (date2.getMonth() - date1.getMonth());

     

      if (diffInMonths + 1 === 3) {
        
        setIsThreeMonths(true);
      } else {
       
        setIsThreeMonths(false);
      }
    } else {
      setIsThreeMonths(false);
    }
  }

  useEffect(() => {
    checkThreeMonths();
  }, [localTimePeriod, localStartDate, localEndDate]);

  const windwoRefresh = async () => {
    if (localdesigantion !== null) {
      // setshowCustomDate(true)
      setstartDate(localStartDate);
      setlastDate(localEndDate);
      setTimePeriod(localTimePeriod);
      let data = await axios({
        method: "post",
        url: `${BACKEND_URL}/dummy/path`,
        // url: `http://localhost:8080/dummy/path`,
        data: {
          selectedFile: localdesigantion,
        },
        // headers: { Accept: "application/json" }
      });
 

      let finalData = [];
      finalData = data?.data?.Updated2023;
      finalData[0].C = EmpName;
      finalData[0].E = lastDate;
      finalData[1].E = startDate;
      finalData[6].I = TotalEffort;
      finalData[6].J = Totalactualhour;
      finalData[6].K = TaskwiseMarks;
      finalData[7].I = AssignTask;
      finalData[7].J = OntimeTask;
      finalData[7].K = sprintwiseMarks;
      finalData[8].K = 0;
      finalData[9].J = Redocount;
      finalData[9].K = redoMarks;
      finalData[10].J = ReportedByclient;
      finalData[10].K = clientbugMarks;
      finalData[11].K = criticalMarks;
      finalData[11].I = TotalcriticalBug;
      finalData[11].J = ResolvedcriticalBug;
      finalData[12].K = 0;
      finalData[13].K = 0;
      setFileData(finalData);
    } else {
    }
  };

  useEffect(() => {
    windwoRefresh();
  }, [
    localdesigantion,
    localStartDate,
    localTimePeriod,
    localEndDate,
    EmpName,
    lastDate,
    startDate,
    TotalEffort,
    Totalactualhour,
    TaskwiseMarks,
    AssignTask,
    OntimeTask,
    sprintwiseMarks,
    Redocount,
    redoMarks,
    ReportedByclient,
    clientbugMarks,
    criticalMarks,
    TotalcriticalBug,
    ResolvedcriticalBug,
  ]);

  function handleApply() {
    setstartDate(customdate[0]);
    setlastDate(customdate[1]);
    localStorage.setItem("startDate", customdate[0]);
    localStorage.setItem("endDate", customdate[1]);
  }

  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <div className={classes.sprintbg}>
          <Grid container alignItems={"center"}>
            <Grid item sm={3}>
              <FormControl
                sx={{ marginRight: 2, minWidth: 200, margin: 2 }}
                className={classes.sprintbg}
              >
                <InputLabel id="demo-simple-select-label">
                  Time Period
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timePeriod}
                  onChange={(e) => handleChangeSelectBox(e.target.value)}
                  input={<OutlinedInput label="Time Period" />}
                >
                  <MenuItem disabled={janToMar} value={1}>
                    Jan To Mar
                  </MenuItem>
                  <MenuItem disabled={aprToJun} value={2}>
                    Apr To June
                  </MenuItem>
                  <MenuItem disabled={julToSep} value={3}>
                    July To Sept
                  </MenuItem>
                  <MenuItem disabled={octToDec} value={4}>
                    Oct To Dec
                  </MenuItem>
                  <MenuItem value={5}>Custom</MenuItem>
                  {/* <MenuItem value={6}>Last Three Months</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            {/* {timePeriod === 5
              ? ( */}
            <Grid item sm={5}>
              {/* {true && ( */}
              <>
                <input
                  type="date"
                  id="dob"
                  disabled={Number(localTimePeriod) === 5 ? false : true}
                  onChange={(newValue) => {
                    setCustomdate([
                      moment(newValue.target.value).format("YYYY-MM-DD"),
                      moment(newValue.target.value).format("YYYY-MM-DD"),
                    ]);
                  }}
                  value={
                    Number(localTimePeriod) === 5
                      ? customdate[0]
                      : localStartDate
                  }
                />
                <span> to </span>
                <input
                  type="date"
                  disabled={Number(localTimePeriod) === 5 ? false : true}
                  onChange={(newValue) => {
                    setCustomdate([
                      customdate[0],
                      moment(newValue.target.value).format("YYYY-MM-DD"),
                    ]);
                  }}
                  // min={customdate[0]}
                  id="dob"
                  // value={localEndDate !== "" ? localEndDate :customdate[1]}
                  value={
                    Number(localTimePeriod) === 5 ? customdate[1] : localEndDate
                  }
                />
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  onClick={() => {
                    handleApply();
                  }}
                  disabled={Number(localTimePeriod) === 5 ? false : true}
                >
                  Apply
                </Button>
              </>
              {/* )} */}
            </Grid>
            {/* ) : ""} */}

            <Grid item sm={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Designation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Designation}
                  label=" Designation"
                  onChange={(e) => handleexceldropdown(e.target.value)}
                  input={<OutlinedInput label="Select Designation" />}
                >
                  <MenuItem value={"seniorDeveloper"}>Senior dev</MenuItem>
                  <MenuItem value={"juniorDeveloper"}>Junior Dev</MenuItem>
                  <MenuItem value={"seniorDesigner"}>
                    Senior Graphic Designer
                  </MenuItem>
                  <MenuItem value={"juniorDesigner"}>
                    Junior Graphic Designer
                  </MenuItem>
                  <MenuItem value={"seniorQA"}>Senior QA</MenuItem>
                  <MenuItem value={"juniorQA"}>Junior QA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2}>
              <NavLink style={{ margin: 2 }} to={`/search?email=${email}`}>
                <button>View Tasks</button>
              </NavLink>
            </Grid>
          </Grid>
          {!fileData ? (
            <Tableview test={test} />
          ) : (
            <Tableviewnew
              fileData={fileData}
              email={email}
              handleexceldropdown={handleexceldropdown}
              selectedThreeMonths={selectedThreeMonths}
              isThreeMonths={isThreeMonths}
              codeReviewRating={codeReviewRating}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Mark;
