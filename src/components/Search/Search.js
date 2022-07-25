import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import html2canvas from "html2canvas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Backdrop,
  CircularProgress,
  DialogActions,
  DialogContentText,
  Fab,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { jsPDF } from "jspdf";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import parse from "html-react-parser";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { ACCESS_TOKEN } from "../../Config/Constant";
import { API_END_POINTS } from "../../Config/Constant";
import { show_error } from "../../Config/Helper";
import Loading from "../Loading";
import { ERROR } from "../../Config/Constant";

import "./../../../src/Details.css";

const Search = () => {
  if (!JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN))) {
    window.location = "/login";
  }

  const search = useLocation().search;
  const email = new URLSearchParams(search).get("email");

  const [selectedEmail ] = useState(email ? email : "");
  const [workitems, setWorkitems] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [openDialogForComments, setOpenDialogForComments] = useState(false);
  // const [closeDialogForComments, setcloseDialogForComments] = useState(false);
  const [taskDone, setTaskDone] = useState(0);
  const [removed, setRemoved] = useState(0);
  const [customdate, setCustomdate] = useState([null, null]);
  const [ready, setReady] = useState(0);
  const [toDo, setToDo] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [comments, setComments] = useState([]);
  const [others, setOthers] = useState(0);
  const [points, setPoints] = useState(0);
  const [showCustomDate, setshowCustomDate] = useState();
  const monthyear = moment().format("YYYY-MM");
  const firstDay = moment(monthyear + "-01").format("YYYY-MM-DD");
  const [startDate, setstartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [lastDate, setlastDate] = useState(
    moment(firstDay).subtract("1", "days").format("YYYY-MM-DD")
  );
  const [open, setOpen] = React.useState(false);
  const [openbackdrop, setOpenbackdrop] = React.useState(false);
  const [closeBackdrop] = React.useState(false);
  const [timePeriod, setTimePeriod] = React.useState(2);
  const navigate = useNavigate();

  const getComment = (url) => {
    //get comments of task
    setOpenbackdrop(true);
    let headersList = {
      Accept: "application/json",
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN)).access_token
      }`,
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: url,
      method: "GET",
      headers: headersList,
    };

    axios.request(reqOptions).then((response) => {
      if (response?.data?.totalCount) {
        setComments(response?.data?.comments);
        setOpenDialogForComments(true);
      } else {
        show_error(ERROR.COMMENT_ERROR);
        setComments([]);
      }
      setOpenbackdrop(false);
    });
  };
  const downloadPdfDocument = () => {
    const input = document.getElementById("pdf-convert");
    const divHeight = input.clientHeight;
    const divWidth = input.clientWidth;
    const ratio = divHeight / divWidth;

    html2canvas(input, { scale: "1" }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const pdfDOC = new jsPDF("l", "mm", "a0"); //  use a4 for smaller page

      const width = pdfDOC.internal.pageSize.getWidth();
      let height = pdfDOC.internal.pageSize.getHeight();
      height = ratio * width;

      pdfDOC.addImage(imgData, "JPEG", 0, 0, width - 20, height - 10);
      pdfDOC.save(`${selectedEmail}-${startDate}-${lastDate}.pdf`); //Download the rendered PDF.
    });
  };
  const closeDialog = () => {
    setComments([]);
    setOpenDialogForComments(false);
  };

  const goBack = () => {
    navigate("/");
  };

  const handleChangeSelectBox = (event) => {
    setTimePeriod(event.target.value);
    //custom
    if (event.target.value == 5) {
      setshowCustomDate(true);
      return;
    }
    setshowCustomDate(false);
    //last Week
    if (event.target.value == 1) {
      let currentDate = moment();

      let weekStart = moment()
        .subtract(1, "weeks")
        .startOf("week")
        .format("YYYY-MM-DD");
      let weekEnd = moment()
        .subtract(1, "weeks")
        .endOf("week")
        .format("YYYY-MM-DD");

      setstartDate(weekStart);
      setlastDate(weekEnd);
    }
    //last Month

    if (event.target.value == 2) {
      let monthStart = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      const monthyear = moment().format("YYYY-MM");
      const firstDay = moment(monthyear + "-01").format("YYYY-MM-DD");
      let monthEnd = moment(firstDay)
        .subtract("1", "days")
        .format("YYYY-MM-DD");
      setstartDate(monthStart);
      setlastDate(monthEnd);
    }
    //last Six Month
    if (event.target.value == 3) {
      //last Six Month
      let sixMonthStartDate = moment()
        .subtract(6, "months")
        .format("YYYY-MM-DD");
      let currentDate = moment().format("YYYY-MM-DD");
      setstartDate(sixMonthStartDate);
      setlastDate(currentDate);
    }
    //last Year

    if (event.target.value == 4) {
      //last Six Month
      let sixMonthStartDate = moment()
        .subtract(12, "months")
        .format("YYYY-MM-DD");
      let currentDate = moment().format("YYYY-MM-DD");
      setstartDate(sixMonthStartDate);
      setlastDate(currentDate);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setstate] = useState({
    labels: [
      "Removed Tasks",
      "To Do Tasks",
      "In Progress Tasks",
      "Ready Tasks",
      "Done Tasks",
      "Others",
    ],
    datasets: [
      {
        label: "Task Performance",
        backgroundColor: [
          "#C0C0C0",
          "#ffcccb",
          "#ffffe0",
          "#ADD8E6",
          "#66CDAA",
        ],
        hoverBackgroundColor: [
          "#C0C0C0",
          "#ffcccb",
          "#ffffe0",
          "#ADD8E6",
          "#66CDAA",
        ],
        data: [removed, toDo, inProgress, ready, taskDone, others],
      },
    ],
  });

  const TotalScore = (total) => {
    var color;
    // switch (total) {
    if (total >= 80) color = "#66CDAA";
    if (total < 80 && total >= 70) color = "#ADD8E6";
    if (total < 70 && total >= 60) color = "#ffffe0";
    if (total < 60 && total >= 50) color = "#ff7f50";
    if (total < 50) color = "#ffcccb";

    return color;
  };

  useEffect(() => {
    setWorkitems([]);
    setRemoved(0);
    setReady(0);
    setToDo(0);
    setTaskDone(0);
    setInProgress(0);
    setOthers(0);
    setPoints(0);
    setOpen(false);
    setLoadingData(true);

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
      data: `{\n  "query": "Select * From workItems WHERE [System.WorkItemType] = 'Task' AND  [System.CreatedDate] >= '${startDate}' AND [System.CreatedDate] <= '${lastDate}' AND [System.AssignedTo] = \'${selectedEmail}\'"\n}`,
    };

    axios.request(reqOptions).then((response) => {
      var ids = [];
      (response?.data?.workItems || []).map((workitem) => {
        ids.push(workitem.id);
      });

      if (!ids.length) {
        setLoadingData(false);
        show_error(ERROR.PERMISSION_ERROR);
        return;
      }

      for (let index = 0; index < Math.ceil(ids.length / 200); index++) {
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
        axios
          .request(reqOptions)
          .then((response) => {
            (response?.data?.value || []).map((project) => {
              var totalPointForThisPoint = 0;

              // -------------------------------- Caluation of the score via date----------------------------------------------

              var taskDoneOn = project.fields["Custom.ActualEndDate"];
              var taskDuedate =
                project.fields["Microsoft.VSTS.Scheduling.DueDate"];

              if (taskDoneOn && taskDuedate) {
                if (taskDuedate > taskDoneOn) {
                  totalPointForThisPoint = totalPointForThisPoint + 5;
                } else {
                  var date1 = new Date(taskDoneOn);
                  var date2 = new Date(taskDuedate);
                  var diffTime = Math.abs(date2 - date1);
                  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  const weekDayInNumber = moment(date2);
                  const numberWeek = weekDayInNumber.day();
                  var addtionDays = 0;

                  if (numberWeek == 2) {
                    //if Due Date is on tuesday
                    if (diffDays > 4) {
                      addtionDays = 2;
                    }
                  }
                  if (numberWeek == 3) {
                    //if Due Date is on wednesday
                    //wed
                    if (diffDays > 3) {
                      addtionDays = 2;
                    }
                  }
                  if (numberWeek == 4) {
                    //if Due Date is on thursday
                    //thrus
                    if (diffDays > 2) {
                      addtionDays = 2;
                    }
                  }
                  if (numberWeek == 5) {
                    //if Due Date is on friday
                    //friday
                    if (diffDays > 1) {
                      addtionDays = 2;
                    }
                  }

                  if (diffDays > 5 + addtionDays) {
                    diffDays = 5 + addtionDays;
                  }

                  totalPointForThisPoint =
                    totalPointForThisPoint +
                    (5 + addtionDays) -
                    parseInt(diffDays);
                }
              }
              // -------------------------------- Caluation of the score via efforts----------------------------------------------
              var effortsGiven =
                project.fields["Microsoft.VSTS.Scheduling.Effort"];
              var effortsTaken =
                project.fields["Custom.ActualHours"] ||
                project.fields["Custom.HoursTaken"];
              if (
                project.fields["System.State"] == "Done" ||
                project.fields["System.State"] == "Ready"
              ) {
                if (effortsGiven && effortsTaken) {
                  if (effortsGiven > effortsTaken) {
                    totalPointForThisPoint = totalPointForThisPoint + 5;
                  } else {
                    var totalDifference = effortsTaken - effortsGiven;

                    if (totalDifference > 5) {
                      totalDifference = 5;
                    }
                    totalPointForThisPoint =
                      totalPointForThisPoint + 5 - parseInt(totalDifference);
                  }
                }

                //Adding Points in previous Points
                setPoints((pre) => pre + totalPointForThisPoint);
              }
              setWorkitems((pre) => [
                ...pre,
                { ...project, score: totalPointForThisPoint },
              ]);
              if (project.fields["System.State"] == "Done") {
                setTaskDone((pre) => pre + 1);
                return project;
              }

              if (project.fields["System.State"] == "Removed") {
                setRemoved((pre) => pre + 1);
                return project;
              }
              if (project.fields["System.State"] == "Ready") {
                setReady((pre) => pre + 1);
                return project;
              }
              if (project.fields["System.State"] == "To Do") {
                setToDo((pre) => pre + 1);
                return project;
              }
              if (project.fields["System.State"] == "In Progress") {
                setInProgress((pre) => pre + 1);
                return project;
              }
              setOthers((pre) => pre + 1);
              return project;
            });

            if (Math.ceil(ids.length / 200) == index + 1) {
              setTimeout(() => {
                setLoadingData(false);
              }, ids.length * 10);
            }
          })
          .catch((err) => {
            show_error(ERROR.PERMISSION_ERROR);
          });
      }
    });
  }, [startDate, lastDate]);
  // ------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setstate({
      labels: [
        "Removed Tasks",
        "To Do Tasks",
        "In Progress Tasks",
        "Ready Tasks",
        "Done Tasks",
      ],
      datasets: [
        {
          label: "Task Performance",
          backgroundColor: [
            "#C0C0C0",
            "#ffcccb",
            "#ffffe0",
            "#ADD8E6",
            "#66CDAA",
          ],
          hoverBackgroundColor: [
            "#C0C0C0",
            "#ffcccb",
            "#ffffe0",
            "#ADD8E6",
            "#66CDAA",
          ],
          data: [removed, toDo, inProgress, ready, taskDone, others],
        },
      ],
    });
  }, [removed, toDo, inProgress, ready, taskDone, others]);

  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <>
          <Dialog
            open={openDialogForComments}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">Comments</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div class="container">
                  <div class="col-md-12" id="fbcomment">
                    <div class="header_comment">
                      <div class="row">
                        <div class="col-md-6 text-left">
                          <span class="count_comment">
                            {comments.length} Comments
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="body_comment">
                      <div class="row">
                        <ul id="list_comment" class="col-md-12">
                          {(comments || []).map((comment) => {
                            return (
                              <>
                                <li class="box_result row">
                                  <div class="avatar_comment col-md-1">
                                    <img
                                      src={comment.modifiedBy.imageUrl}
                                      alt="avatar"
                                    />
                                  </div>
                                  <div class="result_comment col-md-11">
                                    <h4>{comment.modifiedBy.displayName}</h4>
                                    <p style={{ color: "black" }}>
                                      {parse(comment.text)}
                                    </p>
                                    <div class="tools_comment">
                                      <i class="fa fa-thumbs-o-up"></i>{" "}
                                      <span>
                                        {new Date(
                                          comment.modifiedDate
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}> Close</Button>
            </DialogActions>
          </Dialog>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openbackdrop}
            onClick={closeBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", margin: "20px 0" }}
          >
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              onClick={goBack}
              style={{ margin: "7px 5px", background: "#1f57c3" }}
            >
              <ArrowBackIcon />
            </Fab>

            {workitems && workitems.length > 0 && (
              <Button
                variant="outlined"
                onClick={downloadPdfDocument}
                style={{ margin: "0 15px" }}
              >
                Download PDF
              </Button>
            )}
            <FormControl sx={{ marginRight: 2, minWidth: 200 }}>
              <InputLabel id="demo-dialog-select-label">Time Period</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={timePeriod}
                onChange={handleChangeSelectBox}
                input={<OutlinedInput label="Time Period" />}
              >
                <MenuItem value={1}>Last Week</MenuItem>
                <MenuItem value={2}>Last Month</MenuItem>
                <MenuItem value={3}>Last Six Months</MenuItem>
                <MenuItem value={4}>Last Year</MenuItem>
                <MenuItem value={5}>Custom</MenuItem>
              </Select>
            </FormControl>

            {showCustomDate && (
              <>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    startText="Starting Date"
                    endText="Ending Date"
                    value={customdate}
                    onChange={(newValue) => {
                      setCustomdate(newValue);
                      if (newValue[0] && newValue[1]) {
                        setstartDate(moment(newValue[0]).format("YYYY-MM-DD"));
                        setlastDate(moment(newValue[1]).format("YYYY-MM-DD"));
                      }
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
              </>
            )}
          </Box>

          {workitems && workitems.length > 0 && (
            <div className="Search" id="pdf-convert">
              <Grid container>
                <Grid item xs={5}>
                  <br></br>
                  <div style={{ paddingLeft: "80px" }}>
                    <Pie
                      data={state}
                      options={{
                        title: {
                          display: true,
                          text: "Task Performance",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                  <div class="mainContainer">
                    <div class="cardHolder">
                      <div class="header">
                        <div class="heading center">Task Report</div>
                        <div class="stepHeading center">{selectedEmail}</div>
                        <div className="heading center">
                          <b>{startDate}</b>
                          <span style={{ margin: "0px 10px" }}> to </span>
                          <b>{lastDate}</b>
                        </div>

                        <div class="card1">
                          <div class="bottom part">
                            <div class="holderInfo">
                              <div class="infoheader vcenter">Total Tasks</div>
                              <div class="infocontent name vcenter">
                                {taskDone + toDo + ready + inProgress + removed}
                              </div>
                            </div>
                            <div class="expDate">
                              <div class="infoheader vcenter">Compeleted</div>
                              <div class="infocontent date vcenter">
                                {taskDone}
                              </div>
                            </div>
                          </div>
                          <div class="bottom part">
                            <div class="holderInfo">
                              <div class="infoheader vcenter">
                                In Progress Tasks
                              </div>
                              <div class="infocontent name vcenter">
                                {inProgress}
                              </div>
                            </div>
                            <div class="expDate">
                              <div class="infoheader vcenter">Removed</div>
                              <div class="infocontent date vcenter">
                                {removed}
                              </div>
                            </div>
                          </div>
                          <div class="bottom part">
                            <div class="holderInfo">
                              <div class="infoheader vcenter">Ready Tasks</div>
                              <div class="infocontent name vcenter">
                                {ready}
                              </div>
                            </div>
                            <div class="expDate">
                              <div class="infoheader vcenter">To Do Tasks</div>
                              <div class="infocontent date vcenter">{toDo}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 class="center">Total Score</h5>
                    <div class="payment vcenter">
                      <div
                        class="button center"
                        style={{
                          color: "black",
                          background: TotalScore(
                            parseInt(
                              (parseInt(points) /
                                parseInt(
                                  (taskDone +
                                    toDo +
                                    ready +
                                    inProgress -
                                    removed) *
                                    10
                                )) *
                                100
                            )
                          ),
                        }}
                      >
                        {parseInt(
                          (parseInt(points) /
                            parseInt(
                              (taskDone + toDo + ready + inProgress - removed) *
                                10
                            )) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <br></br>
              <div></div>
              <div>
                <table class="styled-table" id="myTable">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Project Name</th>
                      <th>Sprint</th>
                      <th>Created By</th>
                      <th>Task Name</th>
                      <th>Created Date</th>
                      <th>Due Date</th>
                      <th>Efforts</th>
                      <th>Hours Taken</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Task Status</th>
                      <th>Task Score</th>
                      <th>Assigned To</th>
                      <th>View task</th>
                      <th>View Comments</th>
                      {/* <th>Appraisee Marks(Task wise)</th> */}
                    </tr>
                  </thead>
                  <tbody id="Reports-Table">
                    {(workitems || []).map((workitem, index) => {
                      let actualHours =
                        workitem.fields["Custom.ActualHours"] ||
                        workitem.fields["Custom.HoursTaken"] ||
                        "Not Given";
                      let effort =
                        workitem.fields["Microsoft.VSTS.Scheduling.Effort"] ||
                        "Not Given";
                      return (
                        <tr className={workitem.fields["System.State"]}>
                          <td>{index + 1}</td>
                          <td>{workitem.fields["System.TeamProject"]}</td>
                          <td>{workitem.fields["System.IterationPath"]}</td>
                          <td>
                            {workitem.fields["System.CreatedBy"]
                              ? workitem.fields["System.CreatedBy"].displayName
                              : ""}
                          </td>
                          <td>{workitem.fields["System.Title"]}</td>
                          <td>
                            {new Date(
                              workitem.fields["System.CreatedDate"]
                            ).toLocaleString() || "Not Assigned"}
                          </td>

                          <td>
                            {new Date(
                              workitem.fields[
                                "Microsoft.VSTS.Scheduling.DueDate"
                              ]
                            ).toLocaleString()}
                          </td>
                          <td>
                            {workitem.fields[
                              "Microsoft.VSTS.Scheduling.Effort"
                            ] || "Not Given"}
                          </td>
                          <td>
                            {workitem.fields["Custom.ActualHours"] ||
                              workitem.fields["Custom.HoursTaken"] ||
                              "Not Given"}
                          </td>
                          <td>
                            {new Date(
                              workitem.fields["Custom.ActualStartDate"]
                            ).toLocaleString()}
                          </td>
                          <td>
                            {new Date(
                              workitem.fields["Custom.ActualEndDate"]
                            ).toLocaleString()}
                          </td>

                          <td>{workitem.fields["System.State"]}</td>
                          <td
                            style={{
                              backgroundColor: TotalScore(workitem.score * 10),
                            }}
                          >
                            {workitem.score}
                          </td>
                          <td>
                            {workitem.fields["System.AssignedTo"]
                              ? workitem.fields["System.AssignedTo"].displayName
                              : ""}
                          </td>
                          <td>
                            <a
                              href={`${API_END_POINTS.BASE_URL}/Speedo/_workitems/edit/${workitem.id}`}
                              style={{
                                color: "blue",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                            >
                              View
                            </a>
                          </td>
                          <td>
                            <a
                              onClick={() =>
                                getComment(
                                  `${API_END_POINTS.BASE_URL}/${workitem.fields["System.TeamProject"]}/_apis/wit/workItems/${workitem.id}/comments?api-version=6.1-preview.3`
                                )
                              }
                              style={{
                                color: "blue",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                            >
                              Comments
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Search;
