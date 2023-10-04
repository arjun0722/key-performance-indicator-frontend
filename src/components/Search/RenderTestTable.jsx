import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ACCESS_TOKEN } from "../../Config/Constant";
import { MANAGEMENt_ID } from "../../Config/ManagementEmail";
import { useLocation } from "react-router-dom";
import { REVIEWER_MANAGER } from "../../Config/ManagementEmail";

const RenderTestTable = ({
  val,
  thirdTable,
  results,
  ind,
  com,
  setIsSubmit,
  isThreeMonths,
  selectedThreeMonths,
  setParentAppraise,
  parentAppraise,
  avgQuaterlyData,
  setParentSelfAppraise,
  parentSelfAppraise,
  setParentReviewerMarks,
  parentReviewerMarks,
  parentTarget,
  setParentTarget,
  updatedData,
  setAppraiseMarksAvg,
  finalAppraiseAvg,
  setAppraiserAvg,
  setTextError1,
  textError1,
  setTextError2,
  textError2,
  setTextError3,
  textError3,
  division,
  dynamicKpiTestTable,
  setdynamicKpiTestTable,
  headerTable,

  headerTestTable,
  dynamicData,
  fullKeys,
  testTbaleData,
  setTestTableData,
  columnDataArray,
  setColumnDataArray
}) => {
  //state to maintain target values


  const getLocalTImeperiod = localStorage.getItem("timperiod");

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

  const localStartDate = localStorage.getItem("startDate");
  const localEndDate = localStorage.getItem("endDate");

  const date1 = new Date(localStartDate);
  const date2 = new Date(localEndDate);

  const diffInMonths =
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    (date2.getMonth() - date1.getMonth());

  let newwDiffMonthhs = diffInMonths + 1;

  // const [dynamicData, setDynamicData] = useState([]);

  // useEffect(() => {
  //   if (updatedData.data.data.length > 0) {
  //     const data = updatedData.data.data;

  //     const newData = data.map((item) => ({
  //       AppraiseeSelfRating: item.AppraiseeSelfRating,
  //       AppraiserRating: item.AppraiserRating,
  //       Target: item.Target,
  //       ReviewerMarks: item.ReviewerMarks,
  //     }));

  //     setDynamicData(newData);
  //   }
  // }, [updatedData]);

  // useEffect(() => {
  //   if (dynamicData.length > 0) {
  //     setdynamicKpiTestTable(dynamicData);
  //   }
  // }, [dynamicData]);

  //  updatedData?.data?.data[5]?.Target;

  const [actualDelivery, setActualDelivery] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.Target[0]
      : updatedData?.data?.data[0]?.Target
  );
  const [onTime, setOnTime] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.Target[1]
      : updatedData?.data?.data[1]?.Target
  );
  const [critical, setCritical] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.Target[5]
      : updatedData?.data?.data[5]?.Target
  );

  //  this state use for Appraisee Self Rating
  const [customActualdeliveryMarks, setCustomActualdelivery] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[0]
      : updatedData?.data?.data[0]?.AppraiseeSelfRating
  );
  const [customOnTimeMarks, setCustomOnTimeMarks] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[1]
      : updatedData?.data?.data[1]?.AppraiseeSelfRating
  );
  const [customAvgCodeMarks, setCustomAvgCodeMarks] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[2]
      : updatedData?.data?.data[2]?.AppraiseeSelfRating
  );
  const [customReDoMarks, setCustomCustomReDoMarks] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[3]
      : updatedData?.data?.data[3]?.AppraiseeSelfRating
  );
  const [customBugsReportedMarks, setCustomBugsReportedMarks] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[4]
      : updatedData?.data?.data[4]?.AppraiseeSelfRating
  );
  const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[5]
      : updatedData?.data?.data[5]?.AppraiseeSelfRating
  );
  const [customCustomerSatisfactionMarks, setCustomCustomerSatisfactionMarks] =
    useState(
      isThreeMonths || selectedThreeMonths
        ? avgQuaterlyData?.AppraiseeSelfRating[6]
        : updatedData?.data?.data[6]?.AppraiseeSelfRating
    );
  const [customUpskillingMarks, setCustomUpskillingMarks] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[7]
      : updatedData?.data?.data[7]?.AppraiseeSelfRating
  );

  // this states use for Appraiser Rating
  const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[0]
      : updatedData?.data?.data[0]?.AppraiserRating
  );
  const [customOnTimeMarksAr, setCustomOnTimeMarksAr] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[1]
      : updatedData?.data?.data[1]?.AppraiserRating
  );
  const [customAvgCodeMarksAr, setCustomAvgCodeMarksAr] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[2]
      : updatedData?.data?.data[2]?.AppraiserRating
  );
  const [customReDoMarksAr, setCustomCustomReDoMarksAr] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[3]
      : updatedData?.data?.data[3]?.AppraiserRating
  );
  const [customBugsReportedMarksAr, setCustomBugsReportedMarksAr] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[4]
      : updatedData?.data?.data[4]?.AppraiserRating
  );
  const [customCriticalIssuesMarksAr, setCustomCriticalIssuesMarksAr] =
    useState(
      isThreeMonths || selectedThreeMonths
        ? avgQuaterlyData?.AppraiserRating[5]
        : updatedData?.data?.data[5]?.AppraiserRating
    );

  const [
    customCustomerSatisfactionMarksAr,
    setCustomCustomerSatisfactionMarksAr,
  ] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[6]
      : updatedData?.data?.data[6]?.AppraiserRating
  );

  const [customUpskillingMarksAr, setCustomUpskillingMarksAr] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[7]
      : updatedData?.data?.data[7]?.AppraiserRating
  );

  const [customActualdeliveryMarksRM, setCustomActualdeliveryRM] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[0]
      : updatedData?.data?.data[0]?.ReviewerMarks
  );
  const [customOnTimeMarksRM, setCustomOnTimeMarksRM] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[1]
      : updatedData?.data?.data[1]?.ReviewerMarks
  );
  const [customAvgCodeMarksRM, setCustomAvgCodeMarksRM] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[2]
      : updatedData?.data?.data[2]?.ReviewerMarks
  );
  const [customReDoMarksRM, setCustomCustomReDoMarksRM] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[3]
      : updatedData?.data?.data[3]?.ReviewerMarks
  );
  const [customBugsReportedMarksRM, setCustomBugsReportedMarksRM] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[4]
      : updatedData?.data?.data[4]?.ReviewerMarks
  );
  const [customCriticalIssuesMarksRM, setCustomCriticalIssuesMarksRM] =
    useState(
      isThreeMonths || selectedThreeMonths
        ? avgQuaterlyData?.ReviewerMarks[5]
        : updatedData?.data?.data[5]?.ReviewerMarks
    );
  const [
    customCustomerSatisfactionMarksRM,
    setCustomCustomerSatisfactionMarksRM,
  ] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[6]
      : updatedData?.data?.data[6]?.ReviewerMarks
  );
  const [customUpskillingMarksRM, setCustomUpskillingMarksRM] = useState(
    isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[7]
      : updatedData?.data?.data[7]?.ReviewerMarks
  );

  //................. this states use for input validations ...............//

  const [indError1, setIndError1] = useState();

  const [indError2, setIndError2] = useState();

  const [indError3, setIndError3] = useState();

  // useEffect(() => {
  //   if (updatedData && updatedData.data) {
  //     setParentSelfAppraise({
  //       customActualdeliveryMarks:
  //         updatedData?.data?.data[0]?.AppraiseeSelfRating,
  //       customOnTimeMarks: updatedData?.data?.data[1]?.AppraiseeSelfRating,
  //       customAvgCodeMarks: updatedData?.data?.data[2]?.AppraiseeSelfRating,

  //       customReDoMarks: updatedData?.data?.data[3]?.AppraiseeSelfRating,

  //       customBugsReportedMarks:
  //         updatedData?.data?.data[4]?.AppraiseeSelfRating,

  //       customCriticalIssuesMarks:
  //         updatedData?.data?.data[5]?.AppraiseeSelfRating,

  //       customCustomerSatisfactionMarks:
  //         updatedData?.data?.data[6]?.AppraiseeSelfRating,

  //       customUpskillingMarks: updatedData?.data?.data[7]?.AppraiseeSelfRating,
  //     });
  //   }
  //   if (updatedData && updatedData.data) {
  //     setParentAppraise({
  //       customActualdeliveryMarksAr:
  //         updatedData?.data?.data[0]?.AppraiserRating,
  //       customOnTimeMarksAr: updatedData?.data?.data[1]?.AppraiserRating,
  //       customAvgCodeMarksAr: updatedData?.data?.data[2]?.AppraiserRating,
  //       customReDoMarksAr: updatedData?.data?.data[3]?.AppraiserRating,
  //       customBugsReportedMarksAr: updatedData?.data?.data[4]?.AppraiserRating,
  //       customCriticalIssuesMarksAr:
  //         updatedData?.data?.data[5]?.AppraiserRating,
  //       customCustomerSatisfactionMarksAr:
  //         updatedData?.data?.data[6]?.AppraiserRating,
  //       customUpskillingMarksAr: updatedData?.data?.data[7]?.AppraiserRating,
  //     });
  //   }
  //   if (updatedData && updatedData.data) {
  //     setParentReviewerMarks({
  //       customActualdeliveryMarksRM: updatedData?.data?.data[0]?.ReviewerMarks,
  //       customOnTimeMarksRM: updatedData?.data?.data[1]?.ReviewerMarks,
  //       customAvgCodeMarksRM: updatedData?.data?.data[2]?.ReviewerMarks,
  //       customReDoMarksRM: updatedData?.data?.data[3]?.ReviewerMarks,
  //       customBugsReportedMarksRM: updatedData?.data?.data[4]?.ReviewerMarks,
  //       customCriticalIssuesMarksRM: updatedData?.data?.data[5]?.ReviewerMarks,
  //       customCustomerSatisfactionMarksRM:
  //         updatedData?.data?.data[6]?.ReviewerMarks,
  //       customUpskillingMarksRM: updatedData?.data?.data[7]?.ReviewerMarks,
  //     });
  //   }

  //   if (updatedData && updatedData.data) {
  //     setParentTarget({
  //       actualDelivery: updatedData?.data?.data[0]?.Target,
  //       onTime: updatedData?.data?.data[1]?.Target,
  //       standards: updatedData?.data?.data[2]?.Target,
  //       usuaibility: updatedData?.data?.data[3]?.Target,
  //       redo: updatedData?.data?.data[4]?.Target,
  //       critical: updatedData?.data?.data[5]?.Target,
  //       satisfaction: updatedData?.data?.data[6]?.Target,
  //       upskilling: updatedData?.data?.data[7]?.Target,
  //     });
  //   }
  // }, [updatedData]);

  function handleOnChange(e) {
    if (ind == 0) {
      setCustomActualdelivery(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customActualdeliveryMarks: e.target.value,
      });
    }
    if (ind == 1) {
      setCustomOnTimeMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customOnTimeMarks: e.target.value,
      });
      if (e.target.value > onTime) {
        setIsSubmit(true);
        // setTextError1(true);
        setTextError1({
          ...textError1,
          customOnTimeMarks: true,
        });
        setIndError1(ind);
      } else {
        setIsSubmit(false);
        // setTextError1(false);
        setTextError1({
          ...textError1,
          customOnTimeMarks: false,
        });
        setIndError1();
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customAvgCodeMarks: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        setTextError1(true);
        setTextError1({
          ...textError1,
          customAvgCodeMarks: true,
        });
        setIndError1(ind);
      } else {
        setIsSubmit(false);
        // setTextError1(false);
        setTextError1({
          ...textError1,
          customAvgCodeMarks: false,
        });
        setIndError1();
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customReDoMarks: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError1(true);
        setTextError1({
          ...textError1,
          customReDoMarks: true,
        });
        setIndError1(ind);
      } else {
        setIsSubmit(false);
        // setTextError1(false);
        setTextError1({
          ...textError1,
          customReDoMarks: false,
        });
        setIndError1();
      }
    }
    if (ind == 4) {
      setCustomBugsReportedMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customBugsReportedMarks: e.target.value,
      });
    }
    if (ind == 5) {
      setCustomCriticalIssuesMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customCriticalIssuesMarks: e.target.value,
      });
    }
    if (ind == 6) {
      setCustomCustomerSatisfactionMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customCustomerSatisfactionMarks: e.target.value,
      });
      if (e.target.value > 5) {
        setIsSubmit(true);
        // setTextError1(true);
        setTextError1({
          ...textError1,
          customCustomerSatisfactionMarks: true,
        });
        setIndError1(ind);
      } else {
        setIsSubmit(false);
        // setTextError1(false);
        setTextError1({
          ...textError1,
          customCustomerSatisfactionMarks: false,
        });

        setIndError1();
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customUpskillingMarks: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError1(true);
        setTextError1({
          ...textError1,
          customUpskillingMarks: true,
        });
        setIndError1(ind);
      } else {
        setIsSubmit(false);
        // setTextError1(false);
        setTextError1({
          ...textError1,
          customUpskillingMarks: false,
        });
        setIndError1();
      }
    }

    // newcod

    let updatedTable = [...dynamicKpiTestTable];

    updatedTable[ind].AppraiseeSelfRating = e.target.value;
    setdynamicKpiTestTable(updatedTable);
  }

  function handleOnChange1(e) {
    if (ind == 0) {
      setCustomActualdeliveryAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customActualdeliveryMarksAr: e.target.value,
      });
    }
    if (ind == 1) {
      setCustomOnTimeMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customOnTimeMarksAr: e.target.value,
      });
      if (e.target.value > onTime) {
        setIsSubmit(true);
        // setTextError2(true);
        setTextError2({
          ...textError2,
          customOnTimeMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2(false);
        setTextError2({
          ...textError2,
          customOnTimeMarksAr: false,
        });
        setIndError2();
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customAvgCodeMarksAr: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError2(true);
        setTextError2({
          ...textError2,
          customAvgCodeMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2(false);
        setTextError2({
          ...textError2,
          customAvgCodeMarksAr: false,
        });
        setIndError2();
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customReDoMarksAr: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError2(true);
        setTextError2({
          ...textError2,
          customReDoMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2(false);
        setTextError2({
          ...textError2,
          customReDoMarksAr: false,
        });
        setIndError2();
      }
    }
    if (ind == 4) {
      setCustomBugsReportedMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customBugsReportedMarksAr: e.target.value,
      });
    }
    if (ind == 5) {
      setCustomCriticalIssuesMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customCriticalIssuesMarksAr: e.target.value,
      });
    }
    if (ind == 6) {
      setCustomCustomerSatisfactionMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customCustomerSatisfactionMarksAr: e.target.value,
      });
      if (e.target.value > 5) {
        setIsSubmit(true);
        // setTextError2(true);
        setTextError2({
          ...textError2,
          customCustomerSatisfactionMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2(false);
        setTextError2({
          ...textError2,
          customCustomerSatisfactionMarksAr: false,
        });
        setIndError2();
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customUpskillingMarksAr: e.target.value,
      });

      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError2(true);
        setTextError2({
          ...textError2,
          customUpskillingMarksAr: true,
        });

        setIndError2(ind);
      } else {
        setIsSubmit(false);

        // setTextError2(false);
        setTextError2({
          ...textError2,
          customUpskillingMarksAr: false,
        });

        setIndError2();
      }
    }

    let updatedTable = [...dynamicKpiTestTable];

    updatedTable[ind].AppraiserRating = e.target.value;
    setdynamicKpiTestTable(updatedTable);
  }

  function handleOnChange2(e) {
    if (ind == 0) {
      setCustomActualdeliveryRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customActualdeliveryMarksRM: e.target.value,
      });
    }
    if (ind == 1) {
      setCustomOnTimeMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customOnTimeMarksRM: e.target.value,
      });
      if (e.target.value > onTime) {
        setIsSubmit(true);
        // setTextError3(true);
        setTextError3({
          ...textError3,
          customOnTimeMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3(false);
        setTextError3({
          ...textError3,
          customOnTimeMarksRM: false,
        });
        setIndError3();
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customAvgCodeMarksRM: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError3(true);
        setTextError3({
          ...textError3,
          customAvgCodeMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3(false);
        setTextError3({
          ...textError3,
          customAvgCodeMarksRM: false,
        });
        setIndError3();
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customReDoMarksRM: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError3(true);
        setTextError3({
          ...textError3,
          customReDoMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3(false);
        setTextError3({
          ...textError3,
          customReDoMarksRM: false,
        });
        setIndError3();
      }
    }
    if (ind == 4) {
      setCustomBugsReportedMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customBugsReportedMarksRM: e.target.value,
      });
    }
    if (ind == 5) {
      setCustomCriticalIssuesMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customCriticalIssuesMarksRM: e.target.value,
      });
    }
    if (ind == 6) {
      setCustomCustomerSatisfactionMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customCustomerSatisfactionMarksRM: e.target.value,
      });
      if (e.target.value > 5) {
        setIsSubmit(true);
        // setTextError3(true);
        setTextError3({
          ...textError3,
          customCustomerSatisfactionMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3(false);
        setTextError3({
          ...textError3,
          customCustomerSatisfactionMarksRM: false,
        });
        setIndError3();
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customUpskillingMarksRM: e.target.value,
      });
      if (e.target.value > com[ind].I) {
        setIsSubmit(true);
        // setTextError3(true);
        setTextError3({
          ...textError3,
          customUpskillingMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3(false);
        setTextError3({
          ...textError3,
          customUpskillingMarksRM: false,
        });
        setIndError3();
      }
    }

    //newcod

    let updatedTable = [...dynamicKpiTestTable];

    updatedTable[ind].ReviewerMarks = e.target.value;
    setdynamicKpiTestTable(updatedTable);
  }

  function showTextError1() {
    if (ind == 1) {
      return textError1.customOnTimeMarks;
    }
    if (ind == 2) {
      return textError1.customAvgCodeMarks;
    }
    if (ind == 3) {
      return textError1.customReDoMarks;
    }
    if (ind == 6) {
      return textError1.customCustomerSatisfactionMarks;
    }
    if (ind == 7) {
      return textError1.customUpskillingMarks;
    }
  }

  function showTextError2() {
    if (ind == 1) {
      return textError2.customOnTimeMarksAr;
    }
    if (ind == 2) {
      return textError2.customAvgCodeMarksAr;
    }
    if (ind == 3) {
      return textError2.customReDoMarksAr;
    }
    if (ind == 6) {
      return textError2.customCustomerSatisfactionMarksAr;
    }
    if (ind == 7) {
      return textError2.customUpskillingMarksAr;
    }
  }

  function showTextError3() {
    if (ind == 1) {
      return textError3.customOnTimeMarksRM;
    }
    if (ind == 2) {
      return textError3.customAvgCodeMarksRM;
    }
    if (ind == 3) {
      return textError3.customReDoMarksRM;
    }
    if (ind == 6) {
      return textError3.customCustomerSatisfactionMarksRM;
    }
    if (ind == 1) {
      return textError3.customUpskillingMarksRM;
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

    let updatedTable = [...dynamicKpiTestTable];

    updatedTable[ind].Target = e.target.value;
    setdynamicKpiTestTable(updatedTable);
  }

  // const valueMap = [
  //   com[ind]?.I === 0 ? actualDelivery : com[ind]?.I,
  //   com[ind]?.I === 0 ? onTime : com[ind]?.I,
  //   com[ind]?.I,
  //   com[ind]?.I,
  //   com[ind]?.I,
  //   com[ind]?.I === 0 ? critical : com[ind]?.I,
  //   com[ind]?.I,
  //   com[ind]?.I,
  // ];

  const [] = useState([]);
  // useEffect(()=>{
  //   if(dynamicData.length > 0){
  //     const valueMapxxx = dynamicData?.map((item)=>Number(item.Target))

  //     settargetState(valueMapxxx)
  //   }
  // },[dynamicData])

  const [appraiseSelfRatingState, setappraiseSelfRatingState] = useState();
  const [appraiseRatingState, setappraiseRatingState] = useState();
  const [targetState, setTargetState] = useState();
  const [reviewState, setReviewState] = useState();

  useEffect(() => {
    if (dynamicKpiTestTable !== undefined) {
      // .................target..........//
      const valueMap = dynamicKpiTestTable.map((item) => Number(item.Target));
      const value = valueMap[ind] !== undefined ? valueMap[ind] : 0;
      setTargetState(value);

      // .................appraiseselfrating..........//
      const appraiseSelfMap = dynamicKpiTestTable.map(
        (item) => item.AppraiseeSelfRating
      );
      const appriaseSelfvalue =
        appraiseSelfMap[ind] !== undefined ? appraiseSelfMap[ind] : 0;
      setappraiseSelfRatingState(appriaseSelfvalue);

      // .................appraiserating..........//
      const appraiseRatigMap = dynamicKpiTestTable.map(
        (item) => item.AppraiserRating
      );
      const appriaseRatingvalue =
        appraiseRatigMap[ind] !== undefined ? appraiseRatigMap[ind] : 0;

      setappraiseRatingState(appriaseRatingvalue);

      // .................Reviewmanager rating..........//

      const reviewMap = dynamicKpiTestTable.map((item) => item.ReviewerMarks);
      const reviewValue = reviewMap[ind] !== undefined ? reviewMap[ind] : 0;
      setReviewState(reviewValue);
    }
  }, [dynamicKpiTestTable]);

  // .................formulas for first input..........//

  const formula = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formula1 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((b - a) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formula2 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number((b / a) * c).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formula3 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formula4 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formula5 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number((b / a) * c).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formula6 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 - ((a - b) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formula7 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };

  //.............formulas for second table...........//
  const formulaA = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formulaA1 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((b - a) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formulaA2 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number((b / a) * c).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formulaA3 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formulaA4 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formulaA5 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number((b / a) * c).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formulaA6 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 - ((a - b) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };
  const formulaA7 = (a, b, c) => {
    if (b == 0 || b == undefined) {
      return 0;
    } else {
      const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

      if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
        return value;
      } else {
        return 0;
      }
    }
  };

  const appraiseeMarks = [
    formula(actualDelivery, customActualdeliveryMarks, val.Weightage) || 0,

    formula1(onTime, customOnTimeMarks, val.Weightage) || 0,

    formula2(com[ind].I, customAvgCodeMarks, val.Weightage) || 0,

    formula3(com[ind].I, customReDoMarks, val.Weightage) || 0,

    formula4(com[ind].I, customBugsReportedMarks, val.Weightage) || 0,

    formula5(critical, customCriticalIssuesMarks, val.Weightage) || 0,

    formula6(com[ind].I, customCustomerSatisfactionMarks, val.Weightage) || 0,
    formula7(com[ind].I, customUpskillingMarks, val.Weightage) || 0,
  ];
  const valueAppraiseAMrks =
    appraiseeMarks[ind] !== undefined ? appraiseeMarks[ind] : 0;

  useEffect(() => {
    setAppraiseMarksAvg((marks) => ({
      ...marks,
      [ind]: valueAppraiseAMrks,
    }));
  }, [
    actualDelivery,
    customActualdeliveryMarks,
    customOnTimeMarks,
    customAvgCodeMarks,
    customReDoMarks,
    customBugsReportedMarks,
    customCriticalIssuesMarks,
    customCustomerSatisfactionMarks,
    customUpskillingMarks,
    critical,
    onTime,
  ]);

  const appraiserMarks = [
    formulaA(actualDelivery, customActualdeliveryMarksAr, val.Weightage) || 0,

    formulaA1(onTime, customOnTimeMarksAr, val.Weightage) || 0,

    formulaA2(com[ind].I, customAvgCodeMarksAr, val.Weightage) || 0,

    formulaA3(com[ind].I, customReDoMarksAr, val.Weightage) || 0,

    formulaA4(com[ind].I, customBugsReportedMarksAr, val.Weightage) || 0,

    formulaA5(critical, customCriticalIssuesMarksAr, val.Weightage) || 0,

    formulaA6(com[ind].I, customCustomerSatisfactionMarksAr, val.Weightage) ||
      0,

    formulaA7(com[ind].I, customUpskillingMarksAr, val.Weightage) || 0,
  ];
  const valueAppraiserMarks =
    appraiserMarks[ind] !== undefined ? appraiserMarks[ind] : 0;

  useEffect(() => {
    setAppraiserAvg((marks) => ({
      ...marks,
      [ind]: valueAppraiserMarks,
    }));
  }, [
    actualDelivery,
    customActualdeliveryMarksAr,
    onTime,
    customOnTimeMarksAr,
    customAvgCodeMarksAr,
    customReDoMarksAr,
    customBugsReportedMarksAr,
    customCriticalIssuesMarksAr,
    critical,
    customCustomerSatisfactionMarksAr,
    customUpskillingMarksAr,
  ]);

  const matchingValues = ["Appraisee_Marks", "Appraiser_Marks"];
  const specialColumn = [
    "Target",
    "Appraisee_Self_Rating",
    "Appraiser_Rating",
    "Reviewer_Marks",
  ];

  const handleInputChangesTestTable = (e, colindex, colLabel, ind) => {
    const updatedTestValueData = [...columnDataArray];
    updatedTestValueData[ind][colLabel] = e.target.value;
    setColumnDataArray(updatedTestValueData);
  };

  return (
    <>
      <tr>
        {Object.keys(val).map((colLabel, colIndex) => {
          // const isSpecialColumn = specialColumn.includes(colLabel);

          const value = val[colLabel];

          let isSpecialColumn;
          let keyValue;
          let coulmnStyle ; 
          let isMatchingColumn = false;

          isSpecialColumn = specialColumn.includes(colLabel);

          isMatchingColumn = matchingValues.includes(colLabel);
          if(isMatchingColumn){
            coulmnStyle = colLabel ===
            'Appraisee_Marks' ? { backgroundColor: '#bf8f00' } : { backgroundColor: '#70ad47' };
          }
       
        
          

         

          return (
            <td
              key={colIndex}
              style={{
                ...coulmnStyle,
                width: '100px',
                height: '100px',
                padding: '0',
                margin: '0',
                position: 'relative',
              }}
            >
              {isSpecialColumn ? (
                <input
                  type="text"
                  value={columnDataArray[ind]?.[colLabel] || 0}
                  onChange={(e) =>
                    handleInputChangesTestTable(e, colIndex, colLabel, ind)
                  }
                  style={{
                    height: '100%',
                    position: 'initial',
                    top: '0',
                    bottom: '0',
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#ecf0f1',
                    width: '100%',
                    fontSize: '17px',
                  }}
                />
              ) : (
                value
              )}
            </td>
          );
        })}
      </tr>
    </>
  );
};

export default RenderTestTable;

// {results.map((row, rowIndex) => (
//   <tr key={rowIndex}>
//     {Object.keys(row).map((colLabel, colIndex) => {
//       const isSpecialColumn = specialColumn.includes(colLabel);
//       const value = row[colLabel];

//       return (
//         <td
//           key={colIndex}
//           style={{
//             backgroundColor: isSpecialColumn
//               ? colLabel === 'Appraisee_Marks'
//                 ? '#bf8f00'
//                 : '#70ad47'
//               : 'transparent',
//           }}
//         >
//           {isSpecialColumn ? (
//             <input
//               type="text"
//               value={value}
//               onChange={(e) =>
//                 handleInputChangesTestTable(e, rowIndex, colLabel)
//               }
//               style={{
//                 backgroundColor: '#ecf0f1',
//                 width: '100%',
//                 fontSize: '17px',
//               }}
//             />
//           ) : (
//             value
//           )}
//         </td>
//       );
//     })}
//   </tr>
// ))}
