import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ACCESS_TOKEN } from "../../Config/Constant";
import { MANAGEMENt_ID } from "../../Config/ManagementEmail";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import Loading from "../Loading";
import ModalFeedback from "./ModalFeedback";
import { REVIEWER_MANAGER } from "../../Config/ManagementEmail";
import { BACKEND_URL } from "./config";
import { THIRD_TABLE_KEYS } from "../../Config/Constant";
import { show_error1, show_kpi_submit } from "../../Config/Helper";
import Renderfirsttable from "./Renderfirsttable";
import Renderthirdtable from "./Renderthirdtable";
import RenderTestTable from "./RenderTestTable";
import Renderforthtable from "./Renderforthtable";
import Renderfifthtable from "./Renderfifthtable";
import { results } from "./fakedata";

const Tableviewnew = ({
  fileData,
  TaskwiseMarks,
  email,

  handleexceldropdown,
  selectedThreeMonths,
  isThreeMonths,
  codeReviewRating,
}) => {
  const EmpName = "kumari Nikita";
  const startOfIndex =
    fileData.indexOf(
      fileData.find((e) => e.B && e.B === THIRD_TABLE_KEYS.START)
    ) + 2;
  const endOfIndex = fileData.indexOf(
    fileData.find((e) => e.B && e.B === THIRD_TABLE_KEYS.END)
  );

  const startOfIndexForHeading =
    fileData.indexOf(
      fileData.find((e) => e.B && e.B === THIRD_TABLE_KEYS.START)
    ) + 1;
  const startOfIndexEndHeading = startOfIndexForHeading + 1;

  const [loader, setLoader] = useState(false);
  const [updatedData, setUpdatedData] = useState();
  const [userfeedback, setUserfeedback] = useState({});
  const [appraiseMarksAvg, setAppraiseMarksAvg] = useState({});
  const [division, setDivision] = useState(0);
  const [appraiserAvg, setAppraiserAvg] = useState({});
  const [avgQuaterlyData, setAvgQuaterlyData] = useState();
  const [quarterlyBehavioural, setQuarterlyBehavioural] = useState();
  const [behviouralDivision, setBehviouralDivision] = useState(0);
  const [dynamicKpiTestTable, setdynamicKpiTestTable] = useState();

  const [updatedBehaviourData, setUpdatedBehaviourData] = useState({});
  const [testTbaleData, setTestTableData] = useState(results);
  const [state, setState] = useState("");
  const [loginUser, setLoginUser] = useState(
    localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
  );
  const [totalMarksInputs, setTotalMarksInputs] = useState(0);
  const [users, setusers] = useState("");
  const useEmailExtractor = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("email");
  };
  const getLocalTImeperiod = localStorage.getItem("timperiod");
  const emails = useEmailExtractor();

  useEffect(() => {
    setusers(emails);
  }, [emails]);

  let firstTable = fileData.slice(0, 4);
  let secondTable = fileData.slice(4, 5);
  let thirdTable = fileData.slice(startOfIndex, endOfIndex);
  let headerTable = fileData.slice(
    startOfIndexForHeading,
    startOfIndexEndHeading
  );
  let forthTable = fileData.slice(endOfIndex + 3, Number(fileData.length));
  let fifthTable = fileData.slice(32, 37);
  let designation = fileData[3].C;

  const [scope, setScope] = useState();
  const [feedback, setFeedback] = useState();
  const [agreeData, setAgreeData] = useState();
  const [dataFeedback, setdataFeedback] = useState({});
  const [dataScope, setDataScope] = useState({});
  const [dataAgree, setDataAgree] = useState("");
  const [isSubmit, setIsSubmit] = useState(
    MANAGEMENt_ID.includes(loginUser)
      ? false
      : isThreeMonths || selectedThreeMonths
      ? true
      : false
  );
  const [headerTestTable, setHeaderTestTable] = useState([]);
  const [disableText, setDisableText] = useState(true);

  useEffect(() => {
    setState(dataAgree[0]?.Userfeedback ? dataAgree[0]?.Userfeedback : "");
  }, [dataAgree]);

  const localStartDate = localStorage.getItem("startDate");
  const localEndDate = localStorage.getItem("endDate");

  const date1 = new Date(localStartDate);
  const date2 = new Date(localEndDate);

  const diffInMonths =
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    (date2.getMonth() - date1.getMonth());

  let newwDiffMonthhs = diffInMonths + 1;

  //------------------------------------------------------------------//
  // feedback //
  //------------------------------------------------------------------//

  const handleFeedback = (e) => {
    let currentDate = new Date();
    let dateTime1 = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
    setFeedback({
      PositivePoint: e.target.value || "",
      ToUserId: email || "",
      FromUserId: loginUser || "",
      ToDate: fileData[0]?.E || "",
      FromDate: fileData[1]?.E || "",
      UpdatedDate: dateTime1 || "",
    });
  };

  //------------------------------------------------------------------//
  // scope of improvement //
  //------------------------------------------------------------------//
  let currentDate = new Date();
  let dateTime1 = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
  const handleScope = (e) => {
    setScope({
      ScopeOfImprovement: e.target.value || "",
      ToUserId: email || "",
      FromUserId: loginUser || "",
      UpdatedDate: dateTime1 || "",
      ToDate: fileData[0]?.E || "",
      FromDate: fileData[1]?.E || "",
    });
  };
  //------------------------------------------------------------------//
  // agree
  //------------------------------------------------------------------//
  const handleAgree = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    setFeedback({
      PositivePoint: dataFeedback[0]?.PositivePoint,
      ToUserId: dataFeedback[0]?.ToUserId,
      FromUserId: dataFeedback[0]?.FromUserId,
      ToDate: dataFeedback[0]?.ToDate,
      FromDate: dataFeedback[0]?.FromDate,
      UpdatedDate: dataFeedback[0]?.UpdatedDate,
    });
    setScope({
      ScopeOfImprovement: dataScope ? dataScope[0]?.ScopeOfImprovement : "",
      ToUserId: dataScope ? dataScope[0]?.ToUserId : "",
      FromUserId: dataScope ? dataScope[0]?.FromUserId : "",
      UpdatedDate: dataScope ? dataScope[0]?.UpdatedDate : "",
      ToDate: dataScope ? dataScope[0]?.ToDate : "",
      FromDate: dataScope ? dataScope[0]?.FromDate : "",
    });
    setDataAgree(agreeData !== undefined || 0 ? agreeData : "");
  }, [dataFeedback, dataScope, agreeData]);

  const [IsExactDataExist, setIsExactDataExist] = useState(0);
  const [dynamicData, setDynamicData] = useState([]);

  async function getAllData() {
    let reqOptions = {
      method: "post",
      // url: `${BACKEND_URL}/kpi/marks/data`,
      url: `http://localhost:8080/kpi/marks/data`,
      data: [
        {
          email: email,
          ToDate: fileData[0].E,
          FromDate: fileData[1].E,
          isThreeMonths: newwDiffMonthhs === 3 ? 1 : 0,
        },
      ],
      headers: { Accept: "application/json" },
    };
    let data = await axios.request(reqOptions);

    setIsExactDataExist(data?.data?.data[0]?.isExactData);
    if (newwDiffMonthhs > 1) {
      setDivision(data?.data?.data?.length / 8);
      let sum = {
        Appraisee_Self_Rating: [],
        Appraiser_Rating: [],
        Target: [],
        Reviewer_Marks: [],
      };

      const groupedData = data?.data?.data?.reduce((result, item) => {
        const toDate = item?.ToDate;
        if (!result[toDate]) {
          result[toDate] = [];
        }
        result[toDate].push(item);
        return result;
      }, {});

      Object.values(groupedData).forEach((data, index) => {
        data.forEach((allData, allindex) => {
          sum.Appraisee_Self_Rating[allindex] =
            (sum.Appraisee_Self_Rating[allindex] || 0) +
            parseFloat(allData?.Appraisee_Self_Rating);
          sum.Appraiser_Rating[allindex] =
            (sum.Appraiser_Rating[allindex] || 0) +
            parseFloat(allData?.Appraiser_Rating);
          sum.Target[allindex] =
            (sum.Target[allindex] || 0) + parseFloat(allData?.Target);
          sum.Reviewer_Marks[allindex] =
            (sum.Reviewer_Marks[allindex] || 0) +
            parseFloat(allData?.Reviewer_Marks);
        });
      });

      const theQuarterLengthAvg = data?.data?.data.length / newwDiffMonthhs;
      const sliceArr = data.data.data.splice(0, theQuarterLengthAvg);

      for (let i = 0; i < sliceArr.length; i++) {
        let dataItem = sliceArr[i];

        for (let key in sum) {
          if (key in dataItem) {
            dataItem[key] = sum[key][i];
          }
        }
      }

      console.log(sliceArr);

      setAvgQuaterlyData(sum);
    } else {
      const datas = data.data.data;

      // const newData = datas.map((item) => ({
      //   AppraiseeSelfRating: item.AppraiseeSelfRating,
      //   AppraiserRating: item.AppraiserRating,
      //   Target: item.Target,
      //   ReviewerMarks: item.ReviewerMarks,
      // }));

      // setDynamicData(newData);

      const keysToRemove = [
        "Id",
        "ToUserId",
        "FromUserId",
        "ToDate",
        "FromDate",
        "UpdatedDate",
        "CreatedDate",
        "IsReviewKey",
        "isExactData",
        "ShowDevOpsData",
        "IsEditable",
      ];

      const filteredResult = datas.map((item) => {
        // Create a copy of the original object
        const newItem = { ...item };

        // Remove the specified keys
        keysToRemove.forEach((key) => {
          delete newItem[key];
        });

        return newItem;
      });
      console.log("llllllllll", filteredResult);

      setDynamicData(filteredResult);
      setColumnDataArray(filteredResult);

      setUpdatedData(data);
    }
  }

  useEffect(() => {
    if (results.length > 0) {
      const header = Object.keys(results[0]);

      setHeaderTestTable(header);
    }
  }, []);

  async function getBehaviouralData() {
    let data = [
      {
        email: email,
        ToDate: fileData[0].E,
        FromDate: fileData[1].E,
      },
    ];
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let reqOptions = {
      // url: `${BACKEND_URL}/kpi/behavioural/data`,
      url: `http://localhost:8080/kpi/behavioural/data`,
      method: "POST",
      headers: headersList,
      data: data,
    };
    let resData = await axios.request(reqOptions);

    if (resData?.data?.data?.length > 14 || parseInt(newwDiffMonthhs) > 1) {
      if (designation.includes("Sr.")) {
        setBehviouralDivision(resData.data.data.length / 14);
      } else {
        setBehviouralDivision(resData.data.data.length / 11);
      }

      const sum = {
        LowPotential: [],
        GoodPotential: [],
        HighPotential: [],
      };

      const groupedData = resData?.data?.data?.reduce((result, item) => {
        const toDate = item?.ToDate;
        if (!result[toDate]) {
          result[toDate] = [];
        }
        result[toDate].push(item);
        return result;
      }, {});

      Object.values(groupedData).forEach((data, index) => {
        data.forEach((allData, allindex) => {
          sum.LowPotential[allindex] =
            (sum.LowPotential[allindex] || 0) + Number(allData?.LowPotential);
          sum.GoodPotential[allindex] =
            (sum.GoodPotential[allindex] || 0) + Number(allData?.GoodPotential);
          sum.HighPotential[allindex] =
            (sum.HighPotential[allindex] || 0) + Number(allData?.HighPotential);
        });
      });

      setQuarterlyBehavioural(sum);
    } else {
      setUpdatedBehaviourData(resData.data.data);
    }
  }

  async function getPositivePoint() {
    let data = [
      {
        email: email,
        ToDate: fileData[0].E,
        FromDate: fileData[1].E,
      },
    ];
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let reqOptions = {
      // url: `${BACKEND_URL}/kpi/positivepoint/data`,
      url: `http://localhost:8080/kpi/positivepoint/data`,
      method: "POST",
      headers: headersList,
      data: data,
    };
    let resData = await axios.request(reqOptions);
    return setdataFeedback(resData.data.data);
  }

  async function getScopeOfImprovement() {
    let data = [
      {
        email: email,
        ToDate: fileData[0].E,
        FromDate: fileData[1].E,
      },
    ];
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let reqOptions = {
      // url: `${BACKEND_URL}/kpi/scopeofimprovement/data`,
      url: `http://localhost:8080/kpi/scopeofimprovement/data`,
      method: "POST",
      headers: headersList,
      data: data,
    };
    let resData = await axios.request(reqOptions);
    return setDataScope(resData.data.data);
  }

  async function getUserFeedback() {
    let data = [
      {
        email: email,
        ToDate: fileData[0].E,
        FromDate: fileData[1].E,
      },
    ];
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let reqOptions = {
      // url: `${BACKEND_URL}/kpi/userfeedback/data`,
      url: `http://localhost:8080/kpi/userfeedback/data`,
      method: "POST",
      headers: headersList,
      data: data,
    };
    let resData = await axios.request(reqOptions);

    return setAgreeData(resData?.data?.data);
  }

  useEffect(() => {
    getAllData();
    getBehaviouralData();
    getPositivePoint();
    getScopeOfImprovement();
    getUserFeedback();
  }, []);

  useEffect(() => {
    if (updatedData && updatedData?.data?.data?.length > 0) {
      setParentSelfAppraise({
        customActualdeliveryMarks:
          updatedData?.data?.data[0]?.AppraiseeSelfRating,
        customOnTimeMarks: updatedData?.data?.data[1]?.AppraiseeSelfRating,
        customAvgCodeMarks: updatedData?.data?.data[2]?.AppraiseeSelfRating,

        customReDoMarks: updatedData?.data?.data[3]?.AppraiseeSelfRating,

        customBugsReportedMarks:
          updatedData?.data?.data[4]?.AppraiseeSelfRating,

        customCriticalIssuesMarks:
          updatedData?.data?.data[5]?.AppraiseeSelfRating,

        customCustomerSatisfactionMarks:
          updatedData?.data?.data[6]?.AppraiseeSelfRating,

        customUpskillingMarks: updatedData?.data?.data[7]?.AppraiseeSelfRating,
      });
    } else {
      setParentSelfAppraise({
        customActualdeliveryMarks: thirdTable[0].J,
        customOnTimeMarks: thirdTable[1].J,
        customAvgCodeMarks: thirdTable[2].J,

        customReDoMarks: thirdTable[3].J,

        customBugsReportedMarks: thirdTable[4].J,

        customCriticalIssuesMarks: thirdTable[5].J,

        customCustomerSatisfactionMarks: thirdTable[6].J,

        customUpskillingMarks: thirdTable[7].J,
      });
    }

    if (updatedData && updatedData?.data?.data?.length > 0) {
      setParentAppraise({
        customActualdeliveryMarksAr:
          updatedData?.data?.data[0]?.AppraiserRating,
        customOnTimeMarksAr: updatedData?.data?.data[1]?.AppraiserRating,
        customAvgCodeMarksAr: updatedData?.data?.data[2]?.AppraiserRating,
        customReDoMarksAr: updatedData?.data?.data[3]?.AppraiserRating,
        customBugsReportedMarksAr: updatedData?.data?.data[4]?.AppraiserRating,
        customCriticalIssuesMarksAr:
          updatedData?.data?.data[5]?.AppraiserRating,
        customCustomerSatisfactionMarksAr:
          updatedData?.data?.data[6]?.AppraiserRating,
        customUpskillingMarksAr: updatedData?.data?.data[7]?.AppraiserRating,
      });
    }
    if (updatedData && updatedData?.data?.data?.length > 0) {
      setParentReviewerMarks({
        customActualdeliveryMarksRM: updatedData?.data?.data[0]?.ReviewerMarks,
        customOnTimeMarksRM: updatedData?.data?.data[1]?.ReviewerMarks,
        customAvgCodeMarksRM: updatedData?.data?.data[2]?.ReviewerMarks,
        customReDoMarksRM: updatedData?.data?.data[3]?.ReviewerMarks,
        customBugsReportedMarksRM: updatedData?.data?.data[4]?.ReviewerMarks,
        customCriticalIssuesMarksRM: updatedData?.data?.data[5]?.ReviewerMarks,
        customCustomerSatisfactionMarksRM:
          updatedData?.data?.data[6]?.ReviewerMarks,
        customUpskillingMarksRM: updatedData?.data?.data[7]?.ReviewerMarks,
      });
    }
    if (updatedData && updatedData?.data?.data?.length > 0) {
      setParentTarget({
        actualDelivery: updatedData?.data?.data[0]?.Target,
        onTime: updatedData?.data?.data[1]?.Target,
        standards: updatedData?.data?.data[2]?.Target,
        usuaibility: updatedData?.data?.data[3]?.Target,
        redo: updatedData?.data?.data[4]?.Target,
        critical: updatedData?.data?.data[5]?.Target,
        satisfaction: updatedData?.data?.data[6]?.Target,
        upskilling: updatedData?.data?.data[7]?.Target,
      });
    } else {
      setParentTarget({
        actualDelivery: thirdTable[0]?.I,
        onTime: thirdTable[1]?.I,
        standards: thirdTable[2]?.I,
        usuaibility: thirdTable[3]?.I,
        redo: thirdTable[4]?.I,
        critical: thirdTable[5]?.I,
        satisfaction: thirdTable[6]?.I,
        upskilling: thirdTable[7]?.I,
      });
    }
  }, [updatedData]);

  const [parentTarget, setParentTarget] = useState({});
  const [parentAppraise, setParentAppraise] = useState({});
  const [parentSelfAppraise, setParentSelfAppraise] = useState({});
  const [parentReviewerMarks, setParentReviewerMarks] = useState({});

  //------------------------------------------------------------------//
  // Behavioural KPI Table //
  //------------------------------------------------------------------//

  const [lowPotential, setLowPotential] = useState({});
  const [goodPotential, setGoodPotential] = useState({});
  const [highPotential, setHighPotential] = useState({});
  const [rowTotal, setRowTotal] = useState({});
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalAppraiseAvg, setFinalAppraiseAvg] = useState(0);
  const [finalAppraiserAvg, setFinalAppraiserAvg] = useState(0);

  // const quarterlyBehavioural = {
  //   LowPotential : [1,2,3,4,5,6,7,8,9,10,11],
  //   GoodPotential : [1,2,3,4,5,6,7,8,9,10,11],
  //   HighPotential : [1,2,3,4,5,6,7,8,9,10,11]
  // }

  // const updatedBehaviourData = [
  // {
  //   "LowPotential" : 1,
  //    "GoodPotential" : 2,
  //    "HighPotential" : 3
  // }

  // ]

  // const [dynamicLowpotential, setDynamicLowPotential] = useState({});
  //   const [dynamicGoodpotential, setDynamicGoodPotential] = useState({});
  //   const [dynamicHighpotential, setDynamicHighPotential] = useState({});

  // const [dynamicLowpotential, setDynamicLowPotential] = useState({});
  // const [dynamicGoodpotential, setDynamicGoodPotential] = useState({});
  // const [dynamicHighpotential, setDynamicHighPotential] = useState({});

  // useEffect(() => {
  //   const initialValues = {};
  //   for (let i = 0; i < forthTable.length - 1; i++) {
  //     initialValues[i] = 0;
  //   }
  //   setDynamicLowPotential(initialValues);
  //   setDynamicGoodPotential(initialValues);
  //   setDynamicHighPotential(initialValues);

  // }, [designation])

  useEffect(() => {
    if (
      updatedBehaviourData.length === 0 &&
      quarterlyBehavioural?.length !== undefined
    ) {
      const keys = Array.from(
        Array(quarterlyBehavioural.LowPotential?.length).keys()
      );
      const datalowpotential = {};
      const datagoodpotential = {};
      const datahighpotential = {};

      for (let i = 0; i < keys.length; i++) {
        datalowpotential[i] = quarterlyBehavioural?.LowPotential[i];
        datagoodpotential[i] = quarterlyBehavioural?.GoodPotential[i];
        datahighpotential[i] = quarterlyBehavioural?.HighPotential[i];
      }

      setDynamicLowPotential(datalowpotential);
      setDynamicGoodPotential(datagoodpotential);
      setDynamicHighPotential(datahighpotential);

      // if (designation.includes("Sr.")) {
      //   setLowPotential({
      //     attendencelp: quarterlyBehavioural?.LowPotential[0],
      //     lessDDependabilitylp: quarterlyBehavioural?.LowPotential[1],
      //     groupWorkinglp: quarterlyBehavioural?.LowPotential[2],
      //     positiveAttitudelp: quarterlyBehavioural?.LowPotential[3],
      //     intelligencelp: quarterlyBehavioural?.LowPotential[4],
      //     imaginationlp: quarterlyBehavioural?.LowPotential[5],
      //     improvementlp: quarterlyBehavioural?.LowPotential[6],
      //     disciplinelp: quarterlyBehavioural?.LowPotential[7],
      //     qualitylp: quarterlyBehavioural?.LowPotential[8],
      //     responsibilitylp: quarterlyBehavioural?.LowPotential[9],
      //     multiSkillslp: quarterlyBehavioural?.LowPotential[10],
      //     maturitylp: quarterlyBehavioural?.LowPotential[11],
      //     approachlp: quarterlyBehavioural?.LowPotential[12],
      //     teamworklp: quarterlyBehavioural?.LowPotential[13],
      //   });
      //   setGoodPotential({
      //     attendencegp: quarterlyBehavioural?.GoodPotential[0],
      //     lessDDependabilitygp: quarterlyBehavioural?.GoodPotential[1],
      //     groupWorkinggp: quarterlyBehavioural?.GoodPotential[2],
      //     positiveAttitudegp: quarterlyBehavioural?.GoodPotential[3],
      //     intelligencegp: quarterlyBehavioural?.GoodPotential[4],
      //     imaginationgp: quarterlyBehavioural?.GoodPotential[5],
      //     improvementgp: quarterlyBehavioural?.GoodPotential[6],
      //     disciplinegp: quarterlyBehavioural?.GoodPotential[7],
      //     qualitygp: quarterlyBehavioural?.GoodPotential[8],
      //     responsibilitygp: quarterlyBehavioural?.GoodPotential[9],
      //     multiSkillsgp: quarterlyBehavioural?.GoodPotential[10],
      //     maturitygp: quarterlyBehavioural?.GoodPotential[11],
      //     approachgp: quarterlyBehavioural?.GoodPotential[12],
      //     teamworkgp: quarterlyBehavioural?.GoodPotential[13],
      //   });
      //   setHighPotential({
      //     attendencehp: quarterlyBehavioural?.HighPotential[0],
      //     lessDDependabilityhp: quarterlyBehavioural?.HighPotential[1],
      //     groupWorkinghp: quarterlyBehavioural?.HighPotential[2],
      //     positiveAttitudehp: quarterlyBehavioural?.HighPotential[3],
      //     intelligencehp: quarterlyBehavioural?.HighPotential[4],
      //     imaginationhp: quarterlyBehavioural?.HighPotential[5],
      //     improvementhp: quarterlyBehavioural?.HighPotential[6],
      //     disciplinehp: quarterlyBehavioural?.HighPotential[7],
      //     qualityhp: quarterlyBehavioural?.HighPotential[8],
      //     responsibilityhp: quarterlyBehavioural?.HighPotential[9],
      //     multiSkillshp: quarterlyBehavioural?.HighPotential[10],
      //     maturityhp: quarterlyBehavioural?.HighPotential[11],
      //     approachhp: quarterlyBehavioural?.HighPotential[12],
      //     teamworkhp: quarterlyBehavioural?.HighPotential[13],
      //   });
      // } else {
      //   setLowPotential({
      //     attendencelp: quarterlyBehavioural?.LowPotential[0],
      //     lessDDependabilitylp: quarterlyBehavioural?.LowPotential[1],
      //     groupWorkinglp: quarterlyBehavioural?.LowPotential[2],
      //     positiveAttitudelp: quarterlyBehavioural?.LowPotential[3],
      //     intelligencelp: quarterlyBehavioural?.LowPotential[4],
      //     imaginationlp: quarterlyBehavioural?.LowPotential[5],
      //     improvementlp: quarterlyBehavioural?.LowPotential[6],
      //     disciplinelp: quarterlyBehavioural?.LowPotential[7],
      //     qualitylp: quarterlyBehavioural?.LowPotential[8],
      //     responsibilitylp: quarterlyBehavioural?.LowPotential[9],
      //     multiSkillslp: quarterlyBehavioural?.LowPotential[10],
      //   });
      //   setGoodPotential({
      //     attendencegp: quarterlyBehavioural?.GoodPotential[0],
      //     lessDDependabilitygp: quarterlyBehavioural?.GoodPotential[1],
      //     groupWorkinggp: quarterlyBehavioural?.GoodPotential[2],
      //     positiveAttitudegp: quarterlyBehavioural?.GoodPotential[3],
      //     intelligencegp: quarterlyBehavioural?.GoodPotential[4],
      //     imaginationgp: quarterlyBehavioural?.GoodPotential[5],
      //     improvementgp: quarterlyBehavioural?.GoodPotential[6],
      //     disciplinegp: quarterlyBehavioural?.GoodPotential[7],
      //     qualitygp: quarterlyBehavioural?.GoodPotential[8],
      //     responsibilitygp: quarterlyBehavioural?.GoodPotential[9],
      //     multiSkillsgp: quarterlyBehavioural?.GoodPotential[10],
      //   });
      //   setHighPotential({
      //     attendencehp: quarterlyBehavioural?.HighPotential[0],
      //     lessDDependabilityhp: quarterlyBehavioural?.HighPotential[1],
      //     groupWorkinghp: quarterlyBehavioural?.HighPotential[2],
      //     positiveAttitudehp: quarterlyBehavioural?.HighPotential[3],
      //     intelligencehp: quarterlyBehavioural?.HighPotential[4],
      //     imaginationhp: quarterlyBehavioural?.HighPotential[5],
      //     improvementhp: quarterlyBehavioural?.HighPotential[6],
      //     disciplinehp: quarterlyBehavioural?.HighPotential[7],
      //     qualityhp: quarterlyBehavioural?.HighPotential[8],
      //     responsibilityhp: quarterlyBehavioural?.HighPotential[9],
      //     multiSkillshp: quarterlyBehavioural?.HighPotential[10],
      //   });
      // }
    } else if (updatedBehaviourData?.length > 0) {
      const keys = Array.from(Array(updatedBehaviourData?.length).keys());
      const datalowpotential = {};
      const datagoodpotential = {};
      const datahighpotential = {};

      for (let i = 0; i < keys.length; i++) {
        datalowpotential[i] = updatedBehaviourData[i]?.LowPotential;
        datagoodpotential[i] = updatedBehaviourData[i]?.GoodPotential;
        datahighpotential[i] = updatedBehaviourData[i]?.HighPotential;
      }

      setDynamicLowPotential(datalowpotential);
      setDynamicGoodPotential(datagoodpotential);
      setDynamicHighPotential(datahighpotential);

      // if (designation.includes("Sr.")) {
      //   setLowPotential({
      //     attendencelp: updatedBehaviourData[0]?.LowPotential,
      //     lessDDependabilitylp: updatedBehaviourData[1]?.LowPotential,
      //     groupWorkinglp: updatedBehaviourData[2]?.LowPotential,
      //     positiveAttitudelp: updatedBehaviourData[3]?.LowPotential,
      //     intelligencelp: updatedBehaviourData[4]?.LowPotential,
      //     imaginationlp: updatedBehaviourData[5]?.LowPotential,
      //     improvementlp: updatedBehaviourData[6]?.LowPotential,
      //     disciplinelp: updatedBehaviourData[7]?.LowPotential,
      //     qualitylp: updatedBehaviourData[8]?.LowPotential,
      //     responsibilitylp: updatedBehaviourData[9]?.LowPotential,
      //     multiSkillslp: updatedBehaviourData[10]?.LowPotential,
      //     maturitylp: updatedBehaviourData[11]?.LowPotential,
      //     approachlp: updatedBehaviourData[12]?.LowPotential,
      //     teamworklp: updatedBehaviourData[13]?.LowPotential,
      //   });
      //   setGoodPotential({
      //     attendencegp: updatedBehaviourData[0]?.GoodPotential,
      //     lessDDependabilitygp: updatedBehaviourData[1]?.GoodPotential,
      //     groupWorkinggp: updatedBehaviourData[2]?.GoodPotential,
      //     positiveAttitudegp: updatedBehaviourData[3]?.GoodPotential,
      //     intelligencegp: updatedBehaviourData[4]?.GoodPotential,
      //     imaginationgp: updatedBehaviourData[5]?.GoodPotential,
      //     improvementgp: updatedBehaviourData[6]?.GoodPotential,
      //     disciplinegp: updatedBehaviourData[7]?.GoodPotential,
      //     qualitygp: updatedBehaviourData[8]?.GoodPotential,
      //     responsibilitygp: updatedBehaviourData[9]?.GoodPotential,
      //     multiSkillsgp: updatedBehaviourData[10]?.GoodPotential,
      //     maturitygp: updatedBehaviourData[11]?.GoodPotential,
      //     approachgp: updatedBehaviourData[12]?.GoodPotential,
      //     teamworkgp: updatedBehaviourData[13]?.GoodPotential,
      //   });
      //   setHighPotential({
      //     attendencehp: updatedBehaviourData[0]?.HighPotential,
      //     lessDDependabilityhp: updatedBehaviourData[1]?.HighPotential,
      //     groupWorkinghp: updatedBehaviourData[2]?.HighPotential,
      //     positiveAttitudehp: updatedBehaviourData[3]?.HighPotential,
      //     intelligencehp: updatedBehaviourData[4]?.HighPotential,
      //     imaginationhp: updatedBehaviourData[5]?.HighPotential,
      //     improvementhp: updatedBehaviourData[6]?.HighPotential,
      //     disciplinehp: updatedBehaviourData[7]?.HighPotential,
      //     qualityhp: updatedBehaviourData[8]?.HighPotential,
      //     responsibilityhp: updatedBehaviourData[9]?.HighPotential,
      //     multiSkillshp: updatedBehaviourData[10]?.HighPotential,
      //     maturityhp: updatedBehaviourData[11]?.HighPotential,
      //     approachhp: updatedBehaviourData[12]?.HighPotential,
      //     teamworkhp: updatedBehaviourData[13]?.HighPotential,
      //   });
      // } else {
      //   setLowPotential({
      //     attendencelp: updatedBehaviourData[0]?.LowPotential,
      //     lessDDependabilitylp: updatedBehaviourData[1]?.LowPotential,
      //     groupWorkinglp: updatedBehaviourData[2]?.LowPotential,
      //     positiveAttitudelp: updatedBehaviourData[3]?.LowPotential,
      //     intelligencelp: updatedBehaviourData[4]?.LowPotential,
      //     imaginationlp: updatedBehaviourData[5]?.LowPotential,
      //     improvementlp: updatedBehaviourData[6]?.LowPotential,
      //     disciplinelp: updatedBehaviourData[7]?.LowPotential,
      //     qualitylp: updatedBehaviourData[8]?.LowPotential,
      //     responsibilitylp: updatedBehaviourData[9]?.LowPotential,
      //     multiSkillslp: updatedBehaviourData[10]?.LowPotential,
      //   });
      //   setGoodPotential({
      //     attendencegp: updatedBehaviourData[0]?.GoodPotential,
      //     lessDDependabilitygp: updatedBehaviourData[1]?.GoodPotential,
      //     groupWorkinggp: updatedBehaviourData[2]?.GoodPotential,
      //     positiveAttitudegp: updatedBehaviourData[3]?.GoodPotential,
      //     intelligencegp: updatedBehaviourData[4]?.GoodPotential,
      //     imaginationgp: updatedBehaviourData[5]?.GoodPotential,
      //     improvementgp: updatedBehaviourData[6]?.GoodPotential,
      //     disciplinegp: updatedBehaviourData[7]?.GoodPotential,
      //     qualitygp: updatedBehaviourData[8]?.GoodPotential,
      //     responsibilitygp: updatedBehaviourData[9]?.GoodPotential,
      //     multiSkillsgp: updatedBehaviourData[10]?.GoodPotential,
      //   });
      //   setHighPotential({
      //     attendencehp: updatedBehaviourData[0]?.HighPotential,
      //     lessDDependabilityhp: updatedBehaviourData[1]?.HighPotential,
      //     groupWorkinghp: updatedBehaviourData[2]?.HighPotential,
      //     positiveAttitudehp: updatedBehaviourData[3]?.HighPotential,
      //     intelligencehp: updatedBehaviourData[4]?.HighPotential,
      //     imaginationhp: updatedBehaviourData[5]?.HighPotential,
      //     improvementhp: updatedBehaviourData[6]?.HighPotential,
      //     disciplinehp: updatedBehaviourData[7]?.HighPotential,
      //     qualityhp: updatedBehaviourData[8]?.HighPotential,
      //     responsibilityhp: updatedBehaviourData[9]?.HighPotential,
      //     multiSkillshp: updatedBehaviourData[10]?.HighPotential,
      //   });
      // }
    }
  }, [updatedBehaviourData, quarterlyBehavioural]);

  function checkArr() {
    const rawTotalArr = Object.values(rowTotal);

    if (rawTotalArr !== null && rawTotalArr.length !== 0) {
      const total = rawTotalArr.reduce(function (accumulator, currentValue) {
        return accumulator + parseFloat(currentValue);
      }, 0);

      if (designation.includes("Sr.")) {
        setFinalTotal(total / 14);
      } else {
        setFinalTotal(total / 11);
      }
    }
  }

  function checkAppraiseArr() {
    const rawTotalArr = Object.values(appraiseMarksAvg);

    if (rawTotalArr !== null && rawTotalArr.length !== 0) {
      const total = rawTotalArr?.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue)
      );
      setFinalAppraiseAvg(total);
    }
  }

  function checkAppraiserArr() {
    const rawTotalArr = Object.values(appraiserAvg);

    if (rawTotalArr !== null && rawTotalArr.length !== 0) {
      const total = rawTotalArr?.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue)
      );
      setFinalAppraiserAvg(total);
    }
  }

  useEffect(() => {
    checkArr();
    checkAppraiseArr();
    checkAppraiserArr();
  }, [rowTotal, appraiseMarksAvg, appraiserAvg]);

  const aMonth = moment(localStartDate).format("MMMM YYYY");
  const bMonth = moment(localEndDate).format("MMMM YYYY");
  const dateForEmail =
    newwDiffMonthhs === 1 ? aMonth : `${aMonth} To ${bMonth}`;

  async function KpiMarks() {
    // this code for send kpi submit email

    try {
      setLoader(true);
      let allFinalData = [];
      let allBehaviourKpiData = [];
      let currentDate = new Date();
      let dateTime1 = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
      scope.UpdatedDate = dateTime1 || "";
      scope.ToDate = fileData[0]?.E || "";
      scope.FromDate = fileData[1]?.E || "";
      feedback.ToDate = fileData[0]?.E || "";
      feedback.FromDate = fileData[1]?.E || "";
      feedback.UpdatedDate = dateTime1 || "";
      userfeedback.ToDate = fileData[0]?.E || "";
      userfeedback.FromDate = fileData[1]?.E || "";
      userfeedback.UpdatedDate = dateTime1 || "";
      // userfeedback.IsEditable = 1;

      if (
        (agreeData &&
          agreeData.length > 0 &&
          MANAGEMENt_ID.includes(loginUser) &&
          parseInt(agreeData[0]?.IsEditable) === 0) ||
        agreeData[0]?.IsEditable === undefined
      ) {
        userfeedback.IsEditable = 1;
      } else if (
        agreeData &&
        agreeData.length > 0 &&
        MANAGEMENt_ID.includes(loginUser) &&
        parseInt(agreeData[0]?.IsEditable) === 1
      ) {
        userfeedback.IsEditable = 2;
      }

      if (
        agreeData &&
        agreeData.length > 0 &&
        users === loginUser &&
        parseInt(agreeData[0]?.IsEditable)
      ) {
        userfeedback.IsEditable = agreeData[0]?.IsEditable;
      }

      // if (
      //   agreeData &&
      //   agreeData.length > 0 &&
      //   REVIEWER_MANAGER.includes(loginUser)
      // ) {

      //   userfeedback.IsEditable = agreeData[0]?.IsEditable;
      // }

      let allFeedbackData = [feedback];
      let allScopeData = [scope];
      let allUserfeedback = [userfeedback];

      // thirdTable.map((val, ind) => {
      //   let allData = {
      //     KpiTitle: "",
      //     KpiDescription: "",
      //     Category: "",
      //     Type: "",
      //     ToUserId: "",
      //     FromUserId: "",
      //     Weightage: 0,
      //     Target: 0,
      //     AppraiseeSelfRating: 0,
      //     AppraiserRating: 0,
      //     ReviewerMarks: 0,
      //     UpdatedDate: "",
      //     IsEditable: REVIEWER_MANAGER.includes(loginUser)
      //       ? 0
      //       : MANAGEMENt_ID.includes(loginUser)
      //         ? 0
      //         : 1,
      //     IsReviewKey: REVIEWER_MANAGER.includes(loginUser) ? 0 : 1,
      //     isExactData:
      //       newwDiffMonthhs === 3
      //         ? REVIEWER_MANAGER.includes(loginUser)
      //           ? 3
      //           : MANAGEMENt_ID.includes(loginUser) && IsExactDataExist === 0
      //             ? 1
      //             : 2
      //         : 0,
      //     ToDate: "",
      //     FromDate: "",
      //     ShowDevOpsData: 0,
      //   };
      //   switch (ind) {
      //     case (ind = 0):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.actualDelivery
      //         ? parentTarget?.actualDelivery
      //         : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customActualdeliveryMarks || 0;
      //       allData.AppraiserRating =
      //         parentAppraise?.customActualdeliveryMarksAr || 0;
      //       allData.ReviewerMarks =
      //         parentReviewerMarks?.customActualdeliveryMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     case (ind = 1):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.onTime ? parentTarget?.onTime : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customOnTimeMarks || 0;
      //       allData.AppraiserRating = parentAppraise?.customOnTimeMarksAr || 0;
      //       allData.ReviewerMarks =
      //         parentReviewerMarks?.customOnTimeMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     case (ind = 2):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.standards
      //         ? parentTarget?.standards
      //         : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customAvgCodeMarks || 0;
      //       allData.AppraiserRating = parentAppraise?.customAvgCodeMarksAr || 0;
      //       allData.ReviewerMarks =
      //         parentReviewerMarks?.customAvgCodeMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     case (ind = 3):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.usuaibility
      //         ? parentTarget?.usuaibility
      //         : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customReDoMarks || 0;
      //       allData.AppraiserRating = parentAppraise?.customReDoMarksAr || 0;
      //       allData.ReviewerMarks = parentReviewerMarks?.customReDoMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     case (ind = 4):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.redo ? parentTarget?.redo : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customBugsReportedMarks || 0;
      //       allData.AppraiserRating =
      //         parentAppraise?.customBugsReportedMarksAr || 0;
      //       allData.ReviewerMarks =
      //         parentReviewerMarks?.customBugsReportedMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     case (ind = 5):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.critical
      //         ? parentTarget?.critical
      //         : 0;
      //       allData.Target = parentTarget?.critical
      //         ? parentTarget?.critical
      //         : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customCriticalIssuesMarks || 0;
      //       allData.AppraiserRating =
      //         parentAppraise?.customCriticalIssuesMarksAr || 0;
      //       allData.ReviewerMarks =
      //         parentReviewerMarks?.customCriticalIssuesMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     case (ind = 6):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.satisfaction
      //         ? parentTarget?.satisfaction
      //         : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customCustomerSatisfactionMarks || 0;
      //       allData.AppraiserRating =
      //         parentAppraise?.customCustomerSatisfactionMarksAr || 0;
      //       allData.ReviewerMarks =
      //         parentReviewerMarks?.customCustomerSatisfactionMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     case (ind = 7):
      //       allData.KpiTitle = val.C || "";
      //       allData.KpiDescription = val.D || "";
      //       allData.Category = val.B || "";
      //       allData.Type = val.F || "";
      //       allData.ToUserId = email || "";
      //       allData.FromUserId = loginUser || "";
      //       allData.Weightage = val.H || 0;
      //       allData.Target = parentTarget?.upskilling
      //         ? parentTarget?.upskilling
      //         : 0;
      //       allData.AppraiseeSelfRating =
      //         parentSelfAppraise?.customUpskillingMarks || 0;
      //       allData.AppraiserRating =
      //         parentAppraise?.customUpskillingMarksAr || 0;
      //       allData.ReviewerMarks =
      //         parentReviewerMarks?.customUpskillingMarksRM || 0;
      //       allData.UpdatedDate = dateTime1 || "";
      //       // allData.IsEditable = 1;
      //       allData.ToDate = fileData[0].E || "";
      //       allData.FromDate = fileData[1].E || "";
      //       return allFinalData.push(allData);
      //     default:
      //       return allFinalData;
      //   }
      // });

      // forthTable.map((val, ind) => {
      //   let allBehaviourKpiDatamap = {
      //     BehaviouralKPIs: "",
      //     LowPotential: "",
      //     GoodPotential: "",
      //     HighPotential: "",
      //     ToUserId: "",
      //     FromUserId: "",
      //     ToDate: "",
      //     FromDate: "",
      //     UpdatedDate: "",
      //   };

      //   if (designation.includes("Sr.")) {
      //     switch (ind) {
      //       case (ind = 0):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.attendencelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.attendencegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.attendencehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 1):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.lessDDependabilitylp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.lessDDependabilitygp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.lessDDependabilityhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 2):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.groupWorkinglp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.groupWorkinggp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.groupWorkinghp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 3):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.positiveAttitudelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.positiveAttitudegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.positiveAttitudehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 4):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.intelligencelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.intelligencegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.intelligencehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 5):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.imaginationlp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.imaginationgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.imaginationhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 6):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.improvementlp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.improvementgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.improvementhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 7):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.disciplinelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.disciplinegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.disciplinehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 8):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.qualitylp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.qualitygp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.qualityhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 9):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.responsibilitylp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.responsibilitygp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.responsibilityhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 10):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.multiSkillslp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.multiSkillsgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.multiSkillshp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 11):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.maturitylp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.maturitygp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.maturityhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 12):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.approachlp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.approachgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.approachhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 13):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.teamworklp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.teamworkgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.teamworkhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       default:
      //         return allBehaviourKpiData;
      //     }
      //   } else {
      //     switch (ind) {
      //       case (ind = 0):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.attendencelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.attendencegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.attendencehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 1):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.lessDDependabilitylp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.lessDDependabilitygp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.lessDDependabilityhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 2):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.groupWorkinglp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.groupWorkinggp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.groupWorkinghp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 3):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.positiveAttitudelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.positiveAttitudegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.positiveAttitudehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 4):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.intelligencelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.intelligencegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.intelligencehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 5):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.imaginationlp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.imaginationgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.imaginationhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 6):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.improvementlp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.improvementgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.improvementhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 7):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.disciplinelp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.disciplinegp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.disciplinehp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 8):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.qualitylp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.qualitygp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.qualityhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 9):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.responsibilitylp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.responsibilitygp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.responsibilityhp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);

      //       case (ind = 10):
      //         allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
      //         allBehaviourKpiDatamap.LowPotential =
      //           lowPotential?.multiSkillslp || 0;
      //         allBehaviourKpiDatamap.GoodPotential =
      //           goodPotential?.multiSkillsgp || 0;
      //         allBehaviourKpiDatamap.HighPotential =
      //           highPotential?.multiSkillshp || 0;
      //         allBehaviourKpiDatamap.ToUserId = email || "";
      //         allBehaviourKpiDatamap.FromUserId = loginUser || "";
      //         allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
      //         allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
      //         allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
      //         return allBehaviourKpiData.push(allBehaviourKpiDatamap);
      //       default:
      //         return allBehaviourKpiData;
      //     }
      //   }
      // });

      if (newwDiffMonthhs === 1 && REVIEWER_MANAGER.includes(users)) {
        allFinalData.IsReviewKey = 0;
      } else if (newwDiffMonthhs === 3 && REVIEWER_MANAGER.includes(users)) {
        allFinalData.IsReviewKey = 2;
      }

      // api hit for user only for a month

      if (
        newwDiffMonthhs === 1 &&
        users === loginUser &&
        !MANAGEMENt_ID.includes(loginUser)
      ) {
        // let indicesToCheck = [0, 1, 2, 3, 4, 6];

        // let hasAppraiseeselfZero = false;
        // if (!MANAGEMENt_ID.includes(loginUser)) {
        //   for (let index of indicesToCheck) {
        //     if (parseInt(allFinalData[index].AppraiseeSelfRating) === 0) {
        //       hasAppraiseeselfZero = true;
        //       setLoader(false);
        //       break;
        //     }
        //   }
        //   if (hasAppraiseeselfZero) {
        //     // show_error1("Appraisee Self Rating not filled properly");
        //     // return;
        //   }
        // }

        let data = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/marks`,
          url: `http://localhost:8080/kpi/marks`,
          data: {
            headerTable: headerTable,
            columnDataArray: columnDataArray,
            ToUserId: email,
            FromUserId: loginUser,
            ToDate: fileData[0]?.E,
            FromDate: fileData[1]?.E,
            UpdatedDate: dateTime1,
            ShowDevOpsData: 0,

            IsEditable: REVIEWER_MANAGER.includes(loginUser)
              ? 0
              : MANAGEMENt_ID.includes(loginUser)
              ? 0
              : 1,
            IsReviewKey: REVIEWER_MANAGER.includes(loginUser) ? 0 : 1,
            isExactData:
              newwDiffMonthhs === 3
                ? REVIEWER_MANAGER.includes(loginUser)
                  ? 3
                  : MANAGEMENt_ID.includes(loginUser) && IsExactDataExist === 0
                  ? 1
                  : 2
                : 0,
          },
          headers: { Accept: "application/json" },
        });

        if (email && EmpName) {
          let data = axios({
            method: "post",
            // url: `${BACKEND_URL}/kpi/sendkpisubmitemail`,
            url: `http://localhost:8080/kpi/sendkpisubmitemail`,
            data: [
              {
                email: email,
                name: EmpName,
                toSend: "to_management_for_month",
                message: `KPI Sheet has been submitted by ${EmpName} for ${dateForEmail}`,
              },
            ],
            headers: { Accept: "application/json" },
          });
        } else {
          alert("something went wrong please try again");
        }
      }

      //Api hit for user for 3 months

      if (
        newwDiffMonthhs === 3 &&
        users === loginUser &&
        !MANAGEMENt_ID.includes(loginUser)
      ) {
        if (!MANAGEMENt_ID.includes(loginUser)) {
          if (
            userfeedback.Userfeedback === undefined ||
            userfeedback.Userfeedback === ""
          ) {
            setLoader(false);
            // show_error1("User feedback not filled properly");
            // return;
          }
        }

        let uData = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/userfeedback`,
          url: `http://localhost:8080/kpi/userfeedback`,
          data: allUserfeedback,
          headers: { Accept: "application/json" },
        });

        if (email && EmpName) {
          let data = axios({
            method: "post",
            // url: `${BACKEND_URL}/kpi/sendkpisubmitemail`,
            url: `http://localhost:8080/kpi/sendkpisubmitemail`,
            data: [
              {
                email: email,
                name: EmpName,
                toSend: "to_management_for_three_month",
                message: `KPI Sheet has been submitted by ${EmpName} for ${dateForEmail}`,
              },
            ],
            headers: { Accept: "application/json" },
          });
        } else {
          alert("something went wrong please try again");
        }
      }

      // api hit for manager only for a month

      if (newwDiffMonthhs === 1 && MANAGEMENt_ID.includes(loginUser)) {
        // let indicesToCheck = [0, 1, 2, 3, 4, 6];
        // let hasAppraiseeZero = false;
        // if (MANAGEMENt_ID.includes(loginUser)) {
        //   for (let index of indicesToCheck) {
        //     if (parseInt(allFinalData[index].AppraiserRating) === 0) {
        //       hasAppraiseeZero = true;
        //       setLoader(false);
        //       break;
        //     }
        //   }

        //   if (hasAppraiseeZero) {
        //     // show_error1("Appraiser Rating not filled properly");
        //     // return;
        //   }
        // }

        // let hasAppraiseeselfZero = false;
        // if (!MANAGEMENt_ID.includes(loginUser)) {
        //   for (let index of indicesToCheck) {
        //     if (parseInt(allFinalData[index].AppraiseeSelfRating) === 0) {
        //       hasAppraiseeselfZero = true;
        //       setLoader(false);
        //       break;
        //     }
        //   }
        //   if (hasAppraiseeselfZero) {
        //     // show_error1("Appraisee Self Rating not filled properly");
        //     // return;
        //   }
        // }

        // let reviewMarksZero = false;
        // if (REVIEWER_MANAGER.includes(loginUser)) {
        //   for (let index of indicesToCheck) {
        //     if (parseInt(allFinalData[index].ReviewerMarks) === 0) {
        //       reviewMarksZero = true;
        //       setLoader(false);
        //       break;
        //     }
        //   }
        //   if (reviewMarksZero) {
        //     // show_error1("Reviewer Marks not filled properly");
        //     // return;
        //   }
        // }

        // let hasZeroValue = false;
        // if (MANAGEMENt_ID.includes(loginUser)) {
        //   if (designation.includes("Sr.")) {
        //     for (let i = 0; i < 14; i++) {
        //       if (parseInt(rowTotal[i]) === 0) {
        //         setLoader(false);
        //         hasZeroValue = true;
        //         break;
        //       }
        //     }
        //   } else {
        //     for (let i = 0; i < 11; i++) {
        //       if (parseInt(rowTotal[i]) === 0) {
        //         hasZeroValue = true;
        //         break;
        //       }
        //     }
        //   }
        //   if (hasZeroValue) {
        //     setLoader(false);
        //     // show_error1("Behavioural KPIs not filled properly");
        //     // return;
        //   }
        // }

        let data = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/marks`,
          url: `http://localhost:8080/kpi/marks`,
          data: {
            headerTable: headerTable,
            columnDataArray: columnDataArray,
            ToUserId: email,
            FromUserId: loginUser,
            ToDate: fileData[0]?.E,
            FromDate: fileData[1]?.E,
            UpdatedDate: dateTime1,
            ShowDevOpsData: 0,

            IsEditable: REVIEWER_MANAGER.includes(loginUser)
              ? 0
              : MANAGEMENt_ID.includes(loginUser)
              ? 0
              : 1,
            IsReviewKey: REVIEWER_MANAGER.includes(loginUser) ? 0 : 1,
            isExactData:
              newwDiffMonthhs === 3
                ? REVIEWER_MANAGER.includes(loginUser)
                  ? 3
                  : MANAGEMENt_ID.includes(loginUser) && IsExactDataExist === 0
                  ? 1
                  : 2
                : 0,
          },
          headers: { Accept: "application/json" },
        });

        let bData = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/behavioural`,
          url: `http://localhost:8080/kpi/behavioural`,
          data: allBehaviourKpiData,
          headers: { Accept: "application/json" },
        });

        if (email && EmpName) {
          let data = axios({
            method: "post",
            // url: `${BACKEND_URL}/kpi/sendkpisubmitemail`,
            url: `http://localhost:8080/kpi/sendkpisubmitemail`,
            data: [
              {
                email: email,
                name: EmpName,
                toSend: "to_user_for_month",
                message: `The project manager has provided the KPI feedback for ${EmpName} on ${dateForEmail}.`,
              },
            ],
            headers: { Accept: "application/json" },
          });
        } else {
          alert("something went wrong please try again");
        }
      }

      //Api hit for manager for 3 months

      if (newwDiffMonthhs === 3 && MANAGEMENt_ID.includes(loginUser)) {
        let indicesToCheck = [0, 1, 2, 3, 4, 6];
        let hasAppraiseeZero = false;
        if (MANAGEMENt_ID.includes(loginUser)) {
          for (let index of indicesToCheck) {
            if (parseInt(allFinalData[index].AppraiserRating) === 0) {
              hasAppraiseeZero = true;
              setLoader(false);
              break;
            }
          }

          if (hasAppraiseeZero) {
            // show_error1("Appraiser Rating not filled properly");
            // return;
          }
        }

        let hasAppraiseeselfZero = false;
        if (!MANAGEMENt_ID.includes(loginUser)) {
          for (let index of indicesToCheck) {
            if (parseInt(allFinalData[index].AppraiseeSelfRating) === 0) {
              hasAppraiseeselfZero = true;
              setLoader(false);
              break;
            }
          }
          if (hasAppraiseeselfZero) {
            // show_error1("Appraisee Self Rating not filled properly");
            // return;
          }
        }

        let reviewMarksZero = false;
        if (REVIEWER_MANAGER.includes(loginUser)) {
          for (let index of indicesToCheck) {
            if (parseInt(allFinalData[index].ReviewerMarks) === 0) {
              reviewMarksZero = true;
              setLoader(false);
              break;
            }
          }
          if (reviewMarksZero) {
            // show_error1("Reviewer Marks not filled properly");
            // return;
          }
        }

        let hasZeroValue = false;
        if (MANAGEMENt_ID.includes(loginUser)) {
          if (designation.includes("Sr.")) {
            for (let i = 0; i < 14; i++) {
              if (parseInt(rowTotal[i]) === 0) {
                setLoader(false);
                hasZeroValue = true;
                break;
              }
            }
          } else {
            for (let i = 0; i < 11; i++) {
              if (parseInt(rowTotal[i]) === 0) {
                hasZeroValue = true;
                break;
              }
            }
          }
          if (hasZeroValue) {
            setLoader(false);
            // show_error1("Behavioural KPIs not filled properly");
            // return;
          }
        }

        if (MANAGEMENt_ID.includes(loginUser)) {
          if (
            feedback.PositivePoint === undefined ||
            scope.ScopeOfImprovement === undefined ||
            feedback.PositivePoint === "" ||
            scope.ScopeOfImprovement === ""
          ) {
            setLoader(false);
            // show_error1(
            //   "Neither Feedback nor Scope Of Improvement should be empty"
            // );
            // return;
          }
        }

        if (!MANAGEMENt_ID.includes(loginUser)) {
          if (
            userfeedback.Userfeedback === undefined ||
            userfeedback.Userfeedback === ""
          ) {
            setLoader(false);
            // show_error1("User feedback not filled properly");
            // return;
          }
        }

        let data = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/marks`,
          url: `http://localhost:8080/kpi/marks`,
          data: {
            headerTable: headerTable,
            columnDataArray: columnDataArray,
            ToUserId: email,
            FromUserId: loginUser,
            ToDate: fileData[0]?.E,
            FromDate: fileData[1]?.E,
            UpdatedDate: dateTime1,
            ShowDevOpsData: 0,

            IsEditable: REVIEWER_MANAGER.includes(loginUser)
              ? 0
              : MANAGEMENt_ID.includes(loginUser)
              ? 0
              : 1,
            IsReviewKey: REVIEWER_MANAGER.includes(loginUser) ? 0 : 1,
            isExactData:
              newwDiffMonthhs === 3
                ? REVIEWER_MANAGER.includes(loginUser)
                  ? 3
                  : MANAGEMENt_ID.includes(loginUser) && IsExactDataExist === 0
                  ? 1
                  : 2
                : 0,
          },
          headers: { Accept: "application/json" },
        });

        let bData = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/behavioural`,
          url: `http://localhost:8080/kpi/behavioural`,
          data: allBehaviourKpiData,
          headers: { Accept: "application/json" },
        });

        let pData = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/positivepoint`,
          url: `http://localhost:8080/kpi/positivepoint`,
          data: allFeedbackData,
          headers: { Accept: "application/json" },
        });

        let sData = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/scopeofimprovement`,
          url: `http://localhost:8080/kpi/scopeofimprovement`,
          data: allScopeData,
          headers: { Accept: "application/json" },
        });

        // if (state !== undefined && state.length > 0) {
        let uData = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/userfeedback`,
          url: `http://localhost:8080/kpi/userfeedback`,
          data: allUserfeedback,
          headers: { Accept: "application/json" },
        });

        if (email && EmpName) {
          let data = axios({
            method: "post",
            // url: `${BACKEND_URL}/kpi/sendkpisubmitemail`,
            url: `http://localhost:8080/kpi/sendkpisubmitemail`,
            data: [
              {
                email: email,
                name: EmpName,
                toSend: "to_user_for_three_months",
                message: `The project manager has provided the KPI feedback for ${EmpName} on ${dateForEmail}.`,
              },
            ],
            headers: { Accept: "application/json" },
          });
        } else {
          alert("something went wrong please try again");
        }
      }

      // Api hit Rewiewer for 1 and 3 month both

      if (
        (newwDiffMonthhs === 1 && REVIEWER_MANAGER.includes(loginUser)) ||
        (newwDiffMonthhs === 3 && REVIEWER_MANAGER.includes(loginUser))
      ) {
        let indicesToCheck = [0, 1, 2, 3, 4, 6];

        let reviewMarksZero = false;
        if (REVIEWER_MANAGER.includes(loginUser)) {
          for (let index of indicesToCheck) {
            if (parseInt(allFinalData[index].ReviewerMarks) === 0) {
              reviewMarksZero = true;
              setLoader(false);
              break;
            }
          }
          if (reviewMarksZero) {
            // show_error1("Reviewer Marks not filled properly");
            // return;
          }
        }

        let data = axios({
          method: "post",
          // url: `${BACKEND_URL}/kpi/marks`,
          url: `http://localhost:8080/kpi/marks`,
          data: {
            headerTable: headerTable,
            columnDataArray: columnDataArray,
            ToUserId: email,
            FromUserId: loginUser,
            ToDate: fileData[0]?.E,
            FromDate: fileData[1]?.E,
            UpdatedDate: dateTime1,
            ShowDevOpsData: 0,

            IsEditable: REVIEWER_MANAGER.includes(loginUser)
              ? 0
              : MANAGEMENt_ID.includes(loginUser)
              ? 0
              : 1,
            IsReviewKey: REVIEWER_MANAGER.includes(loginUser) ? 0 : 1,
            isExactData:
              newwDiffMonthhs === 3
                ? REVIEWER_MANAGER.includes(loginUser)
                  ? 3
                  : MANAGEMENt_ID.includes(loginUser) && IsExactDataExist === 0
                  ? 1
                  : 2
                : 0,
          },
          headers: { Accept: "application/json" },
        });

        if (email && EmpName) {
          let data = axios({
            method: "post",
            // url: `${BACKEND_URL}/kpi/sendkpisubmitemail`,
            url: `http://localhost:8080/kpi/sendkpisubmitemail`,
            data: [
              {
                email: email,
                name: EmpName,
                toSend: "to_user_for_one_month_or_three_months",
                message: `Your KPI evaluation has been completed by the reviewer for ${dateForEmail}.`,
              },
            ],
            headers: { Accept: "application/json" },
          });
        } else {
          alert("something went wrong please try again");
        }
      }

      setTimeout(() => {
        show_kpi_submit("your kpi submit successfully");
        window.location.reload(false);
        setTimeout(() => {
          setLoader(false);
        }, 5000);
      }, 5000);
    } catch (error) {
      show_kpi_submit("your kpi not submit please try again");
    }
  }

  useEffect(() => {
    let currentDate = new Date();
    let dateTime1 = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");

    if (state !== undefined) {
      setUserfeedback({
        Userfeedback: state || "",
        ToUserId: email || "",
        FromUserId: loginUser || "",
        UpdatedDate: dateTime1 || "",
        ToDate: fileData[0]?.E || "",
        FromDate: fileData[1]?.E || "",
      });
    }
  }, [state]);

  //--------------//
  firstTable.push({
    B: "category",
    C: "T1 R1",
  });

  function conditionTables() {
    if (
      (agreeData &&
        agreeData.length > 0 &&
        MANAGEMENt_ID.includes(loginUser) &&
        parseInt(agreeData[0]?.IsEditable) === 2) ||
      (newwDiffMonthhs === 3 && IsExactDataExist === 3)
    ) {
      return true;
    }

    if (selectedThreeMonths || isThreeMonths) {
      if (MANAGEMENt_ID.includes(loginUser)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  function conditionUserFeddback() {
    if (
      (agreeData &&
        agreeData.length > 0 &&
        users === loginUser &&
        parseInt(agreeData[0]?.IsEditable) === 2) ||
      (agreeData &&
        agreeData.length > 0 &&
        users === loginUser &&
        parseInt(agreeData[0]?.IsEditable) === undefined) ||
      (agreeData &&
        agreeData.length > 0 &&
        users === loginUser &&
        parseInt(agreeData[0]?.IsEditable) === 0) ||
      (agreeData && agreeData.length === 0) ||
      (newwDiffMonthhs === 3 && IsExactDataExist === 3)
    ) {
      return true;
    }

    if (users === loginUser) {
      if (getLocalTImeperiod < 5 || selectedThreeMonths || isThreeMonths) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  function noText() {
    setDisableText(false);
    setIsSubmit(false);
    setIsSubmitDisabled(false);
  }

  function yesText() {
    setIsSubmit(false);
    setIsSubmitDisabled(false);
  }

  const [textError1, setTextError1] = useState({
    customOnTimeMarks: false,
    customAvgCodeMarks: false,
    customReDoMarks: false,
    customCustomerSatisfactionMarks: false,
    customUpskillingMarks: false,
  });

  const [textError2, setTextError2] = useState({
    customOnTimeMarksAr: false,
    customAvgCodeMarksAr: false,
    customReDoMarksAr: false,
    customCustomerSatisfactionMarksAr: false,
    customUpskillingMarksAr: false,
  });

  const [textError3, setTextError3] = useState({
    customOnTimeMarksRM: false,
    customAvgCodeMarksRM: false,
    customReDoMarksRM: false,
    customCustomerSatisfactionMarksRM: false,
    customUpskillingMarksRM: false,
  });

  const [textError1LowPotential, setTextError1LowPotential] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
  });

  const [textError2GoodPotential, setTextError2GoodPotential] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
  });

  const [textError3HighPotential, setTextError3HighPotential] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
  });

  const [isSubmitDisable, setIsSubmitDisabled] = useState(true);

  // Create a state variable to hold an array of column objects
  const [columnDataArray, setColumnDataArray] = useState([]);

  function isButtonShouldDisable() {
    if (
      (parseInt(newwDiffMonthhs) === 1 &&
        updatedData?.data?.data[7]?.IsReviewKey === 0) ||
      (parseInt(newwDiffMonthhs) === 1 &&
        updatedData?.data?.data[7]?.IsReviewKey === 2) ||
      (parseInt(newwDiffMonthhs) === 3 &&
        updatedData?.data?.data[7]?.IsReviewKey === 2) ||
      parseInt(newwDiffMonthhs) === 2 ||
      parseInt(newwDiffMonthhs) > 3 ||
      (agreeData &&
        agreeData.length > 0 &&
        MANAGEMENt_ID.includes(loginUser) &&
        parseInt(agreeData[0]?.IsEditable) === 2) ||
      (agreeData &&
        agreeData.length > 0 &&
        users === loginUser &&
        parseInt(agreeData[0]?.IsEditable) === 2) ||
      (users === loginUser &&
        newwDiffMonthhs == 1 &&
        updatedData?.data?.data[0]?.IsEditable == 0) ||
      (newwDiffMonthhs === 3 &&
        MANAGEMENt_ID.includes(loginUser) &&
        IsExactDataExist > 1) ||
      (newwDiffMonthhs === 3 &&
        REVIEWER_MANAGER.includes(loginUser) &&
        IsExactDataExist === 3)
    ) {
      return true;
    } else {
      if (
        (MANAGEMENt_ID.includes(loginUser) && newwDiffMonthhs === 3) ||
        (REVIEWER_MANAGER.includes(loginUser) && newwDiffMonthhs === 3)
      ) {
        const values = [
          ...Object.values(textError1),
          ...Object.values(textError2),
          ...Object.values(textError3),
          ...Object.values(textError1LowPotential),
          ...Object.values(textError2GoodPotential),
          ...Object.values(textError3HighPotential),
        ];

        return values.includes(true);
      }

      if (getLocalTImeperiod < 5 || isThreeMonths || selectedThreeMonths) {
        if (users === loginUser) {
          if (isSubmitDisable === false) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        const values = [
          ...Object.values(textError1),
          ...Object.values(textError2),
          ...Object.values(textError3),
          ...Object.values(textError1LowPotential),
          ...Object.values(textError2GoodPotential),
          ...Object.values(textError3HighPotential),
        ];

        return values.includes(true);
      }
    }
  }

  useEffect(() => {
    setColumnDataArray(thirdTable);
  }, []);

  const [dynamicLowpotential, setDynamicLowPotential] = useState({});
  const [dynamicGoodpotential, setDynamicGoodPotential] = useState({});
  const [dynamicHighpotential, setDynamicHighPotential] = useState({});

  useEffect(() => {
    const initialValues = {};
    for (let i = 0; i < forthTable.length - 1; i++) {
      initialValues[i] = 0;
    }
    setDynamicLowPotential(initialValues);
    setDynamicGoodPotential(initialValues);
    setDynamicHighPotential(initialValues);
  }, [designation]);

  // Initialize variables to store information about the array with the most keys
  let largestArray = [];
  let maxKeys = 0;

  // Iterate through the arrays in the data
  for (const array of thirdTable) {
    // Get the number of keys in the current array
    const numKeys = Object.keys(array).length;

    // Check if the current array has more keys than the current maximum
    if (numKeys > maxKeys) {
      maxKeys = numKeys;
      largestArray = array;
    }
  }

  // Extract all keys from the largestArray
  const allKeys = Object.keys(largestArray);

  // Ensure the keys start with "B" and include all keys in sequence
  const startKey = "B";

  // Dynamically set the endKey based on the last key of largestArray
  const endKey = allKeys.reduce((max, key) => (key > max ? key : max), "B");

  const fullKeys = [];
  let currentKey = startKey;

  while (currentKey <= endKey) {
    fullKeys.push(currentKey);
    currentKey = String.fromCharCode(currentKey.charCodeAt(0) + 1);
  }

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
            {firstTable.map((val, index) => {
              return (
                <>
                  <Renderfirsttable key={index} val={val} />
                </>
              );
            })}
            <tr
              style={{
                height: "100px",
              }}
            ></tr>
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

            {updatedData?.data?.data[0]?.ShowDevOpsData === 1 ||
            updatedData?.data?.data[0]?.ShowDevOpsData === undefined ||
            updatedData?.data?.data[0]?.ShowDevOpsData === null ? (
              <tr>
                {headerTable.map((row, index) => (
                  <React.Fragment key={index}>
                    {Object.values(row).map((value, colIndex) => (
                      <th
                        key={colIndex}
                        style={{
                          backgroundColor: "#00b0f0",
                        }}
                      >
                        {value}
                      </th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            ) : (
              <tr>
                {headerTestTable.map((colLabel, colIndex) => (
                  <th
                    key={colIndex}
                    style={{
                      backgroundColor: "#00b0f0",
                    }}
                  >
                    {colLabel}
                  </th>
                ))}
              </tr>
            )}

            {updatedData?.data?.data[0]?.ShowDevOpsData === 1 ||
            updatedData?.data?.data[0]?.ShowDevOpsData === undefined ||
            updatedData?.data?.data[0]?.ShowDevOpsData === null
              ? thirdTable?.map((val, ind) => {
                  return (
                    <>
                      <Renderthirdtable
                        setTextError1={setTextError1}
                        textError1={textError1}
                        setTextError2={setTextError2}
                        textError2={textError2}
                        setTextError3={setTextError3}
                        textError3={textError3}
                        thirdTable={thirdTable}
                        ind={ind}
                        val={val}
                        fullKeys={fullKeys}
                        headerTable={headerTable}
                        IsExactDataExist={IsExactDataExist}
                        setColumnDataArray={setColumnDataArray}
                        columnDataArray={columnDataArray}
                        setIsSubmit={setIsSubmit}
                        division={division}
                        avgQuaterlyData={avgQuaterlyData}
                        isThreeMonths={isThreeMonths}
                        selectedThreeMonths={selectedThreeMonths}
                        setParentAppraise={setParentAppraise}
                        parentAppraise={parentAppraise}
                        setParentSelfAppraise={setParentSelfAppraise}
                        parentSelfAppraise={parentSelfAppraise}
                        setParentReviewerMarks={setParentReviewerMarks}
                        parentReviewerMarks={parentReviewerMarks}
                        setParentTarget={setParentTarget}
                        parentTarget={parentTarget}
                        setAppraiseMarksAvg={setAppraiseMarksAvg}
                        finalAppraiseAvg={finalAppraiseAvg}
                        setAppraiserAvg={setAppraiserAvg}
                        finalAppraiserAvg={finalAppraiserAvg}
                        setDivision={setDivision}
                        codeReviewRating={codeReviewRating}
                        updatedData={updatedData}
                      />
                    </>
                  );
                })
              : columnDataArray?.map((val, ind) => {
                  return (
                    <>
                      <RenderTestTable
                        fullKeys={fullKeys}
                        ind={ind}
                        results={results}
                        val={val}
                        com={thirdTable}
                        setIsSubmit={setIsSubmit}
                        isThreeMonths={isThreeMonths}
                        selectedThreeMonths={selectedThreeMonths}
                        renderTestTable={thirdTable}
                        setParentAppraise={setParentAppraise}
                        parentAppraise={parentAppraise}
                        setParentSelfAppraise={setParentSelfAppraise}
                        parentSelfAppraise={parentSelfAppraise}
                        setParentTarget={setParentTarget}
                        setParentReviewerMarks={setParentReviewerMarks}
                        parentReviewerMarks={parentReviewerMarks}
                        parentTarget={parentTarget}
                        updatedData={updatedData}
                        setAppraiseMarksAvg={setAppraiseMarksAvg}
                        finalAppraiseAvg={finalAppraiseAvg}
                        setAppraiserAvg={setAppraiserAvg}
                        finalAppraiserAvg={finalAppraiserAvg}
                        avgQuaterlyData={avgQuaterlyData}
                        setTextError1={setTextError1}
                        textError1={textError1}
                        setTextError2={setTextError2}
                        textError2={textError2}
                        setTextError3={setTextError3}
                        textError3={textError3}
                        division={division}
                        headerTestTable={headerTestTable}
                        dynamicData={dynamicData}
                        testTbaleData={testTbaleData}
                        setTestTableData={setTestTableData}
                        setColumnDataArray={setColumnDataArray}
                        columnDataArray={columnDataArray}
                      />
                    </>
                  );
                })}

            {/* {columnDataArray?.map((val, ind) => {
              return (
                <RenderTestTable
                  fullKeys={fullKeys}
                  ind={ind}
                  results={results}
                  val={val}
                  com={thirdTable}
                  setIsSubmit={setIsSubmit}
                  isThreeMonths={isThreeMonths}
                  selectedThreeMonths={selectedThreeMonths}
                  renderTestTable={thirdTable}
                  setParentAppraise={setParentAppraise}
                  parentAppraise={parentAppraise}
                  setParentSelfAppraise={setParentSelfAppraise}
                  parentSelfAppraise={parentSelfAppraise}
                  setParentTarget={setParentTarget}
                  setParentReviewerMarks={setParentReviewerMarks}
                  parentReviewerMarks={parentReviewerMarks}
                  parentTarget={parentTarget}
                  updatedData={updatedData}
                  setAppraiseMarksAvg={setAppraiseMarksAvg}
                  finalAppraiseAvg={finalAppraiseAvg}
                  setAppraiserAvg={setAppraiserAvg}
                  finalAppraiserAvg={finalAppraiserAvg}
                  avgQuaterlyData={avgQuaterlyData}
                  setTextError1={setTextError1}
                  textError1={textError1}
                  setTextError2={setTextError2}
                  textError2={textError2}
                  setTextError3={setTextError3}
                  textError3={textError3}
                  division={division}
                  headerTestTable={headerTestTable}
                  dynamicData={dynamicData}
                  testTbaleData={testTbaleData}
                  setTestTableData={setTestTableData}
                  setColumnDataArray={setColumnDataArray}
                      columnDataArray={columnDataArray}
                />
              );
            })} */}

            <td
              style={{
                backgroundColor: "#f4b084",
                textAlign: "left",
              }}
              colSpan="14"
            ></td>

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
                  backgroundColor: "#f4b084",
                  textAlign: "center",
                }}
                colSpan="5"
              >
                {designation === "Project Manager"
                  ? fileData[15].B
                  : fileData[14].B}
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
                {designation === "Project Manager"
                  ? fileData[16].B
                  : fileData[15].B}
              </td>
              <td
                style={{
                  backgroundColor: "#92d050",
                }}
              >
                {designation === "Project Manager"
                  ? fileData[16].C
                  : fileData[15].C}
              </td>
              <td
                style={{
                  backgroundColor: "#92d050",
                }}
              >
                {designation === "Project Manager"
                  ? fileData[16].D
                  : fileData[15].D}
              </td>
              <td
                style={{
                  backgroundColor: "#92d050",
                }}
              >
                {designation === "Project Manager"
                  ? fileData[16].E
                  : fileData[15].E}
              </td>
              <td
                style={{
                  backgroundColor: "#92d050",
                }}
                rowSpan="2"
              >
                {designation === "Project Manager"
                  ? fileData[16].F
                  : fileData[15].F}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  backgroundColor: "#92d050",
                }}
              >
                {designation === "Project Manager"
                  ? fileData[17].C
                  : fileData[16].C}
              </td>
              <td
                style={{
                  backgroundColor: "#92d050",
                }}
              >
                {designation === "Project Manager"
                  ? fileData[17].D
                  : fileData[16].D}
              </td>
              <td
                style={{
                  backgroundColor: "#92d050",
                }}
              >
                {designation === "Project Manager"
                  ? fileData[17].E
                  : fileData[16].E}
              </td>
            </tr>
            {forthTable.map((val, index) => {
              return (
                <>
                  <Renderforthtable
                    key={index}
                    val={val}
                    ind={index}
                    forthTable={forthTable}
                    setIsSubmit={setIsSubmit}
                    selectedThreeMonths={selectedThreeMonths}
                    isThreeMonths={isThreeMonths}
                    lowPotential={lowPotential}
                    setLowPotential={setLowPotential}
                    goodPotential={goodPotential}
                    setGoodPotential={setGoodPotential}
                    highPotential={highPotential}
                    setHighPotential={setHighPotential}
                    updatedBehaviourData={updatedBehaviourData}
                    designation={designation}
                    totalMarksInputs={totalMarksInputs}
                    setTotalMarksInputs={setTotalMarksInputs}
                    setRowTotal={setRowTotal}
                    rowTotal={rowTotal}
                    setTextError1LowPotential={setTextError1LowPotential}
                    textError1LowPotential={textError1LowPotential}
                    setTextError2GoodPotential={setTextError2GoodPotential}
                    textError2GoodPotential={textError2GoodPotential}
                    setTextError3HighPotential={setTextError3HighPotential}
                    textError3HighPotential={textError3HighPotential}
                    quarterlyBehavioural={quarterlyBehavioural}
                    behviouralDivision={behviouralDivision}
                    updatedData={updatedData}
                    dynamicLowpotential={dynamicLowpotential}
                    dynamicGoodpotential={dynamicGoodpotential}
                    dynamicHighpotential={dynamicHighpotential}
                    setDynamicLowPotential={setDynamicLowPotential}
                    setDynamicGoodPotential={setDynamicGoodPotential}
                    setDynamicHighPotential={setDynamicHighPotential}
                  />
                </>
              );
            })}
            <td
              style={{
                backgroundColor: "#f4b084",
                textAlign: "left",
              }}
              colSpan="5"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    marginLeft: "53px",
                  }}
                >
                  Average
                </div>
                <div>
                  <input
                    disabled={true}
                    value={
                      finalTotal === NaN || finalTotal === null
                        ? 0
                        : finalTotal.toFixed(2)
                    }
                    style={{
                      outline: "none",
                      border: "0px",
                      backgroundColor: "#f4b084",
                      textAlign: "center",
                    }}
                    type="number"
                  />
                </div>
              </div>
            </td>

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
                  backgroundColor: "#f4b084",
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
                  backgroundColor: "#92d050",
                }}
                colSpan="5"
              >
                <span
                  style={{
                    margin: " 0px 25px",
                  }}
                >
                  Positive point
                </span>
              </td>
            </tr>
            <td
              style={{
                // background: "lightgrey",
                position: "relative",
                height: "9rem",
                // display: "flex",
                border: "none",
              }}
              colSpan="5"
            >
              <textarea
                rows="10"
                cols="117"
                disabled={conditionTables()}
                type="text"
                placeholder="positive point should fill quaterly by manager"
                style={{
                  outline: "none",
                  position: "relative",
                  background: "rgb(227, 226, 226)",
                  border: "none",
                  // width: " 590px",
                  padding: "10px 29px",
                  height: "145px",
                  resize: "none",
                }}
                value={feedback?.PositivePoint}
                onChange={(e) => handleFeedback(e)}
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
                  backgroundColor: "#92d050",
                }}
                colSpan="5"
              >
                <span
                  style={{
                    margin: " 0px 25px",
                  }}
                >
                  Scope of improvement
                </span>
              </td>
            </tr>
            <td
              style={{
                // background: "lightgrey",
                position: "relative",
                height: "9rem",
                // display: "flex",
                border: "none",
              }}
              colSpan="5"
            >
              <textarea
                rows="10"
                cols="117"
                type="text"
                disabled={conditionTables()}
                placeholder="scope of improvement should fill quaterly by manager"
                style={{
                  outline: "none",
                  position: "relative",
                  background: "rgb(227, 226, 226)",
                  border: "none",
                  // width: " 590px",
                  padding: "10px 29px",
                  height: "145px",
                  resize: "none",
                }}
                onChange={(e) => handleScope(e)}
                value={scope?.ScopeOfImprovement}
              />
            </td>
            <tr
              style={{
                height: "30px",
              }}
            ></tr>
            <td
              style={{
                backgroundColor: "#92d050",
              }}
              colSpan="5"
            >
              <span
                style={{
                  margin: " 0px 25px",
                }}
              >
                Do you agree with this feedback ?{" "}
              </span>
            </td>
            <tr
              style={
                {
                  // height: "15px",
                }
              }
            ></tr>
            <td
              style={{
                // background: "lightgrey",
                position: "relative",
                height: "9rem",
                // display: "flex",
                border: "none",
              }}
              colSpan="5"
            >
              <textarea
                rows="10"
                cols="117"
                disabled={disableText}
                type="text"
                placeholder="Press No buttton and enter your msg if you are not agree with this feedback"
                style={{
                  outline: "none",
                  position: "relative",
                  background: "rgb(227, 226, 226)",
                  border: "none",
                  // width: " 590px",
                  padding: "10px 29px",
                  height: "145px",
                  resize: "none",
                }}
                value={state}
                onChange={(e) => handleAgree(e)}
              />
            </td>
            <tr>
              <td
                style={{
                  display: "flex",
                  border: "none",
                  marginTop: "20px",
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
                      justifyContent: "center",
                      margin: "0px 10px",
                    }}
                    disabled={conditionUserFeddback()}
                    onClick={yesText}
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

                      background: "#b0afaf",
                      color: "black",
                      fontWeight: "600",
                      display: "flex",
                      justifyContent: "center",
                      margin: "0px 10px",
                    }}
                    disabled={conditionUserFeddback()}
                    onClick={noText}
                  >
                    <span>No</span>
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

              <div></div>

              <div className="text-end">
                <Button
                  variant="contained"
                  style={{
                    minWidth: "130px",
                  }}
                  onClick={() => KpiMarks()}
                  disabled={isButtonShouldDisable()}
                >
                  Submit KPI
                </Button>
              </div>

              <tr
                style={{
                  height: "100px",
                }}
              ></tr>
            </tr>

            {fifthTable.map((val, index) => {
              return (
                <>
                  <Renderfifthtable key={index} val={val} />
                </>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default Tableviewnew;
