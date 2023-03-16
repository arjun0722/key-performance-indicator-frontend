import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ACCESS_TOKEN } from "../../Config/Constant";
import { MANAGEMENt_ID } from "../../Config/ManagementEmail";
import { useLocation } from "react-router-dom";

const Renderfirsttable = ({ val }) => {
  return (
    <>
      <tr>
        <td
          style={{
            color: "whitesmoke",
            backgroundColor: "#4472c4",
            fontWeight: "bold",
          }}
        >
          {val.B}
        </td>
        <td>{val.C}</td>
        <td
          style={{
            color: "whitesmoke",
            backgroundColor: "#4472c4",
            fontWeight: "bold",
          }}
        >
          {val.D}
        </td>
        <td style={{ width: "150px" }}>{val.E}</td>
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

  //state to maintain target values

  const [actualDelivery, setActualDelivery] = useState("0");
  const [onTime, setOnTime] = useState("0");
  const [critical, setCritical] = useState("0");

  //  this state use for Appraisee Self Rating
  const [customActualdeliveryMarks, setCustomActualdelivery] = useState("");
  const [customOnTimeMarks, setCustomOnTimeMarks] = useState("");
  const [customAvgCodeMarks, setCustomAvgCodeMarks] = useState("");
  const [customReDoMarks, setCustomCustomReDoMarks] = useState("");
  const [customBugsReportedMarks, setCustomBugsReportedMarks] = useState("");
  const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] =
    useState("");
  const [customCustomerSatisfactionMarks, setCustomCustomerSatisfactionMarks] =
    useState("");
  const [customUpskillingMarks, setCustomUpskillingMarks] = useState("");

  // this states use for Appraiser Rating
  const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] = useState("");
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
  const [customUpskillingMarksAr, setCustomUpskillingMarksAr] = useState("");

  function handleOnChange(e) {
    if (e.target.parentNode.parentNode.id == 0) {
      setCustomActualdelivery(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customActualdeliveryMarks: e.target.value,
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
        customCriticalIssuesMarks: e.target.value,
      });
    }
    if (e.target.parentNode.parentNode.id == 6) {
      setCustomCustomerSatisfactionMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customCustomerSatisfactionMarks: e.target.value,
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
        customActualdeliveryMarksAr: e.target.value,
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
        customBugsReportedMarksAr: e.target.value,
      });
    }
    if (e.target.parentNode.parentNode.id == 5) {
      setCustomCriticalIssuesMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customCriticalIssuesMarksAr: e.target.value,
      });
    }
    if (e.target.parentNode.parentNode.id == 6) {
      setCustomCustomerSatisfactionMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customCustomerSatisfactionMarksAr: e.target.value,
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
    AppraiserRating[ind] !== undefined ? AppraiserRating[ind] : "";

  const appraiseSelfRating = [
    val.J === 0 || val.J === undefined ? customActualdeliveryMarks : val.J,
    val.J === 0 || val.J === undefined ? customOnTimeMarks : val.J,
    val.J === 0 || val.J === undefined ? customAvgCodeMarks : val.J,
    val.J === 0 || val.J === undefined ? customReDoMarks : val.J,
    val.J === 0 || val.J === undefined ? customBugsReportedMarks : val.J,
    val.J === 0 || val.J === undefined ? customCriticalIssuesMarks : val.J,
    val.J === 0 || val.J === undefined
      ? customCustomerSatisfactionMarks
      : val.J,
    val.J === 0 || val.J === undefined ? customUpskillingMarks : val.J,
  ];

  const appraiseSelfRatingValue =
    appraiseSelfRating[ind] !== undefined ? appraiseSelfRating[ind] : "";

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
        <td>
          <input
            type="number"
            min="0"
            value={value}
            style={{
              height: "4.4rem",

              fontSize: "17px",
              width: "100%",

              backgroundColor: "#ecf0f1",
              border: "none",
              width: "100%",
            }}
            onChange={(e) => handleTarget(e)}
          />
        </td>
        <td style={{ position: "relative" }}>
          <input
            type="number"
            min="1"
            value={
              loginUser === users
                ? appraiseSelfRatingValue
                : val.J !== undefined
                ? val.J
                : 0
            }
            // value={val.J}
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",

              backgroundColor: "#ecf0f1",
              border: "none",
              width: "100%",
              fontSize: "17px",
            }}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </td>
        <td
          style={{
            backgroundColor: "#bf8f00",
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
              MANAGEMENt_ID.includes(loginUser)
                ? AppraiseValue
                : val.L !== undefined
                ? val.L
                : 0
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",

              backgroundColor: "#ecf0f1",
              border: "none",
              width: "100%",
              fontSize: "17px",
            }}
            // value={val.L}
            onChange={(e) => {
              handleOnChange1(e);
            }}
          />
          {/* {val.L} */}
        </td>
        <td
          style={{
            backgroundColor: "#70ad47",
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

  const [parentTarget, setParentTarget] = useState(intialTarget);

  const [parentAppraise, setParentAppraise] = useState(intialparentAppraise);
  const [parentSelfAppraise, setParentSelfAppraise] = useState(
    intialparentSelfAppraise
  );
  console.log("YYYYYYYYYYYYYYY", parentTarget);

  let firstTable = fileData.slice(0, 4);
  let secondTable = fileData.slice(4, 5);
  let thirdTable = fileData.slice(6, 14);
  let forthTable = fileData.slice(17, 31);
  let fifthTable = fileData.slice(32, 37);
  return (
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
        {firstTable.map((val, index) => {
          return (
            <>
              <Renderfirsttable key={index} val={val} />
            </>
          );
        })}
        <tr style={{ height: "100px" }}></tr>
        <tr>
          {" "}
          <td
            style={{
              backgroundColor: "#f4b084",
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
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].B}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].C}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].D}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].E}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].F}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].G}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].H}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].I}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].J}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].K}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].L}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].M}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].N}
          </th>
          <th
            style={{
              backgroundColor: "#00b0f0",
            }}
          >
            {fileData[5].O}
          </th>
        </tr>
        {thirdTable.map((val, ind) => {
          return (
            <>
              <Renderthirdtable
                ind={ind}
                val={val}
                thirdTable={thirdTable}
                setParentAppraise={setParentAppraise}
                parentAppraise={parentAppraise}
                setParentSelfAppraise={setParentSelfAppraise}
                parentSelfAppraise={parentSelfAppraise}
                setParentTarget={setParentTarget}
                parentTarget={parentTarget}
              />
            </>
          );
        })}
        <tr style={{ height: "100px" }}></tr>
        <tr style={{ height: "40px" }}>
          <td
            style={{
              backgroundColor: "#f4b084",
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
              backgroundColor: "#92d050",
              textAlign: "center",
            }}
            rowSpan="2"
          >
            {fileData[15].B}
          </td>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
          >
            {fileData[15].C}
          </td>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
          >
            {fileData[15].D}
          </td>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
          >
            {fileData[15].E}
          </td>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
            rowSpan="2"
          >
            {fileData[15].F}
          </td>
        </tr>
        <tr>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
          >
            {fileData[16].C}
          </td>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
          >
            {fileData[16].D}
          </td>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
          >
            {fileData[16].E}
          </td>
        </tr>
        {forthTable.map((val, index) => {
          return (
            <>
              <Renderforthtable key={index} val={val} />
            </>
          );
        })}
        <tr style={{ height: "100px" }}></tr>
        <tr style={{ height: "40px" }}>
          <td
            style={{
              backgroundColor: "#f4b084",
              textAlign: "center",
            }}
            colSpan="5"
          >
            Feedback
          </td>
        </tr>
        <tr style={{ height: "40px" }}>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
            colSpan="5"
          >
            <span style={{ margin: " 0px 25px" }}>Positive point</span>
          </td>
        </tr>
        <td
          style={{
            background: "lightgrey",
            height: "9rem",
            display: "flex",
            border: "none",
          }}
        >
          <input
            type="text"
            placeholder="positive point"
            style={{ outline: "none", background: "#e3e2e2", border: "none" }}
          />
        </td>
        <tr style={{ height: "50px" }}></tr>

        <tr style={{ height: "40px" }}>
          <td
            style={{
              backgroundColor: "#92d050",
            }}
            colSpan="5"
          >
            <span style={{ margin: " 0px 25px" }}>Score of improvement</span>
          </td>
        </tr>
        <td
          style={{
            height: "9rem",
            // width: "29rem",
            display: "flex",
            border: "none",
          }}
        >
          <input
            type="text"
            placeholder="score of improvement"
            style={{ outline: "none", background: "#e3e2e2", border: "none" }}
          />
        </td>
        <tr style={{ height: "30px" }}></tr>
        <td style={{ border: "none" }}>Do you agree with this feedback ? </td>
        <tr style={{ height: "15px" }}></tr>
        <td style={{ display: "flex", border: "none" }}>
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
                justifyContent: "center",
                margin: "0px 10px",
              }}
            >
              <span>Yes</span>
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
                justifyContent: "center",
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

            //   onClick={() => {
            //             setstartDate(
            //                       customdate[0]
            //             );
            //             setlastDate(
            //                       customdate[1]
            //             );
            //   }}
          >
            Submit KPI
          </Button>
        </div>
        <tr style={{ height: "100px" }}></tr>

        {fifthTable.map((val, index) => {
          return (
            <>
              <Renderfifthtable key={index} val={val} />
            </>
          );
        })}
      </table>
    </div>
  );
};

export default Tableviewnew;
