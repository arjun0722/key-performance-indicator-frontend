import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ACCESS_TOKEN } from "../../Config/Constant";
import { MANAGEMENt_ID } from "../../Config/ManagementEmail";
import { useLocation } from "react-router-dom";

import { REVIEWER_MANAGER } from "../../Config/ManagementEmail";
import { results } from "./fakedata";

const Renderthirdtable = ({
  val,
  fullKeys,
  headerTable,
  thirdTable,
  ind,
  setIsSubmit,
  setColumnDataArray,
  columnDataArray,
  division,
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
  setAppraiseMarksAvg,
  finalAppraiseAvg,
  setAppraiserAvg,
  finalAppraiserAvg,
  setTextError1,
  textError1,
  setTextError2,
  textError2,
  setTextError3,
  textError3,
  codeReviewRating,
  updatedData,
  IsExactDataExist,
}) => {
  // all user and login user
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

  //UseEffect for the Appraisee Self Rating , Appraiser Rating and target

  //state to maintain target values

  const [actualDelivery, setActualDelivery] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.Target[0]
      : ind === 0
      ? val.I
      : 0
  );
  const [onTime, setOnTime] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.Target[1]
      : ind === 1
      ? val.I
      : 0
  );
  const [critical, setCritical] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.Target[5]
      : ind === 5
      ? val.I
      : 0
  );

  //  this state use for Appraisee Self Rating
  const [customActualdeliveryMarks, setCustomActualdelivery] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[0]
      : ind === 0
      ? val.J
      : 0
  );
  const [customOnTimeMarks, setCustomOnTimeMarks] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[1]
      : ind === 1
      ? val.J
      : 0
  );
  const [customAvgCodeMarks, setCustomAvgCodeMarks] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[2]
      : ind === 2
      ? codeReviewRating === undefined || "" || "NaN"
        ? 0
        : codeReviewRating
      : 0
  );
  const [customReDoMarks, setCustomCustomReDoMarks] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[3]
      : ind === 3
      ? val.J
      : 0
  );
  const [customBugsReportedMarks, setCustomBugsReportedMarks] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[4]
      : ind === 4
      ? val.J
      : 0
  );
  const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[5]
      : ind === 5
      ? val.J
      : 0
  );
  const [customCustomerSatisfactionMarks, setCustomCustomerSatisfactionMarks] =
    useState(
      newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
        ? avgQuaterlyData?.AppraiseeSelfRating[6]
        : ind === 6
        ? val.J
        : 0
    );
  const [customUpskillingMarks, setCustomUpskillingMarks] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiseeSelfRating[7]
      : ind === 7
      ? val.J === undefined || "" || "NaN"
        ? 0
        : val.J
      : 0
  );

  // this states use for Appraiser Rating
  const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[0]
      : 0
  );
  const [customOnTimeMarksAr, setCustomOnTimeMarksAr] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[1]
      : 0
  );
  const [customAvgCodeMarksAr, setCustomAvgCodeMarksAr] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[2]
      : 0
  );
  const [customReDoMarksAr, setCustomCustomReDoMarksAr] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[3]
      : 0
  );
  const [customBugsReportedMarksAr, setCustomBugsReportedMarksAr] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[4]
      : 0
  );
  const [customCriticalIssuesMarksAr, setCustomCriticalIssuesMarksAr] =
    useState(
      newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
        ? avgQuaterlyData?.AppraiserRating[5]
        : 0
    );
  const [
    customCustomerSatisfactionMarksAr,
    setCustomCustomerSatisfactionMarksAr,
  ] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[6]
      : 0
  );
  const [customUpskillingMarksAr, setCustomUpskillingMarksAr] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.AppraiserRating[7]
      : 0
  );

  // this states use for Reviewer Marks
  const [customActualdeliveryMarksRM, setCustomActualdeliveryRM] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[0]
      : 0
  );
  const [customOnTimeMarksRM, setCustomOnTimeMarksRM] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[1]
      : 0
  );
  const [customAvgCodeMarksRM, setCustomAvgCodeMarksRM] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[2]
      : 0
  );
  const [customReDoMarksRM, setCustomCustomReDoMarksRM] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[3]
      : 0
  );
  const [customBugsReportedMarksRM, setCustomBugsReportedMarksRM] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[4]
      : 0
  );
  const [customCriticalIssuesMarksRM, setCustomCriticalIssuesMarksRM] =
    useState(
      newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
        ? avgQuaterlyData?.ReviewerMarks[5]
        : 0
    );
  const [
    customCustomerSatisfactionMarksRM,
    setCustomCustomerSatisfactionMarksRM,
  ] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[6]
      : 0
  );
  const [customUpskillingMarksRM, setCustomUpskillingMarksRM] = useState(
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? avgQuaterlyData?.ReviewerMarks[7]
      : 0
  );

  //................. this states use for input validations ...............//

  //--------------------//

  //--------------------//

  useEffect(() => {
    if (parseInt(newwDiffMonthhs) > 1 || division * 8 > 8) {
      //state to maintain target values
      setActualDelivery(avgQuaterlyData?.Target[0]);

      setOnTime(avgQuaterlyData?.Target[1]);

      setCritical(avgQuaterlyData?.Target[5]);

      //  this state use for Appraisee Self Rating
      setCustomActualdelivery(avgQuaterlyData?.AppraiseeSelfRating[0]);
      setCustomOnTimeMarks(avgQuaterlyData?.AppraiseeSelfRating[1]);
      setCustomAvgCodeMarks(avgQuaterlyData?.AppraiseeSelfRating[2] / division);
      setCustomCustomReDoMarks(
        avgQuaterlyData?.AppraiseeSelfRating[3] / division
      );
      setCustomBugsReportedMarks(
        avgQuaterlyData?.AppraiseeSelfRating[4] / division
      );
      setCustomCriticalIssuesMarks(avgQuaterlyData?.AppraiseeSelfRating[5]);
      setCustomCustomerSatisfactionMarks(
        avgQuaterlyData?.AppraiseeSelfRating[6] / division
      );
      setCustomUpskillingMarks(
        avgQuaterlyData?.AppraiseeSelfRating[7] / division
      );

      // this states use for Appraiser Rating

      setCustomActualdeliveryAr(
        avgQuaterlyData?.AppraiserRating[0]?.toFixed(2)
      );
      setCustomOnTimeMarksAr(avgQuaterlyData?.AppraiserRating[1]?.toFixed(2));
      setCustomAvgCodeMarksAr(
        (avgQuaterlyData?.AppraiserRating[2] / division)?.toFixed(2)
      );
      setCustomCustomReDoMarksAr(
        (avgQuaterlyData?.AppraiserRating[3] / division)?.toFixed(2)
      );
      setCustomBugsReportedMarksAr(
        (avgQuaterlyData?.AppraiserRating[4] / division)?.toFixed(2)
      );
      setCustomCriticalIssuesMarksAr(
        avgQuaterlyData?.AppraiserRating[5]?.toFixed(2)
      );
      setCustomCustomerSatisfactionMarksAr(
        (avgQuaterlyData?.AppraiserRating[6] / division)?.toFixed(2)
      );
      setCustomUpskillingMarksAr(
        (avgQuaterlyData?.AppraiserRating[7] / division)?.toFixed(2)
      );

      // this states use for Reviewer Marks
      setCustomActualdeliveryRM(avgQuaterlyData?.ReviewerMarks[0]?.toFixed(2));
      setCustomOnTimeMarksRM(avgQuaterlyData?.ReviewerMarks[1]?.toFixed(2));
      setCustomAvgCodeMarksRM(
        (avgQuaterlyData?.ReviewerMarks[2] / division)?.toFixed(2)
      );
      setCustomCustomReDoMarksRM(
        (avgQuaterlyData?.ReviewerMarks[3] / division)?.toFixed(2)
      );
      setCustomBugsReportedMarksRM(
        (avgQuaterlyData?.ReviewerMarks[4] / division)?.toFixed(2)
      );
      setCustomCriticalIssuesMarksRM(
        avgQuaterlyData?.ReviewerMarks[5]?.toFixed(2)
      );
      setCustomCustomerSatisfactionMarksRM(
        (avgQuaterlyData?.ReviewerMarks[6] / division)?.toFixed(2)
      );
      setCustomUpskillingMarksRM(
        (avgQuaterlyData?.ReviewerMarks[7] / division)?.toFixed(2)
      );
    }
  }, [
    newwDiffMonthhs,
    avgQuaterlyData,
    isThreeMonths,
    selectedThreeMonths,
    division,
  ]);

  const [indError1, setIndError1] = useState();

  const [indError2, setIndError2] = useState();

  const [indError3, setIndError3] = useState();

  useEffect(() => {
    if (parseInt(newwDiffMonthhs) > 1 || division * 8 > 8) {
      setParentSelfAppraise({
        customActualdeliveryMarks: avgQuaterlyData?.AppraiseeSelfRating[0],
        customOnTimeMarks: avgQuaterlyData?.AppraiseeSelfRating[1],
        customAvgCodeMarks: avgQuaterlyData?.AppraiseeSelfRating[2] / division,

        customReDoMarks: avgQuaterlyData?.AppraiseeSelfRating[3] / division,

        customBugsReportedMarks:
          avgQuaterlyData?.AppraiseeSelfRating[4] / division,

        customCriticalIssuesMarks: avgQuaterlyData?.AppraiseeSelfRating[5],

        customCustomerSatisfactionMarks:
          avgQuaterlyData?.AppraiseeSelfRating[6] / division,

        customUpskillingMarks:
          avgQuaterlyData?.AppraiseeSelfRating[7] / division,
      });
    }
    if (parseInt(newwDiffMonthhs) > 1 || division * 8 > 8) {
      setParentAppraise({
        customActualdeliveryMarksAr: avgQuaterlyData?.AppraiserRating[0],
        customOnTimeMarksAr: avgQuaterlyData?.AppraiserRating[1],
        customAvgCodeMarksAr: avgQuaterlyData?.AppraiserRating[2] / division,
        customReDoMarksAr: avgQuaterlyData?.AppraiserRating[3] / division,
        customBugsReportedMarksAr:
          avgQuaterlyData?.AppraiserRating[4] / division,
        customCriticalIssuesMarksAr: avgQuaterlyData?.AppraiserRating[5],
        customCustomerSatisfactionMarksAr:
          avgQuaterlyData?.AppraiserRating[6] / division,
        customUpskillingMarksAr: avgQuaterlyData?.AppraiserRating[7] / division,
      });
    }
    if (parseInt(newwDiffMonthhs) > 1 || division * 8 > 8) {
      setParentReviewerMarks({
        customActualdeliveryMarksRM: avgQuaterlyData?.ReviewerMarks[0],
        customOnTimeMarksRM: avgQuaterlyData?.ReviewerMarks[1],
        customAvgCodeMarksRM: avgQuaterlyData?.ReviewerMarks[2] / division,
        customReDoMarksRM: avgQuaterlyData?.ReviewerMarks[3] / division,
        customBugsReportedMarksRM: avgQuaterlyData?.ReviewerMarks[4] / division,
        customCriticalIssuesMarksRM: avgQuaterlyData?.ReviewerMarks[5],
        customCustomerSatisfactionMarksRM:
          avgQuaterlyData?.ReviewerMarks[6] / division,
        customUpskillingMarksRM: avgQuaterlyData?.ReviewerMarks[7] / division,
      });
    }

    if (parseInt(newwDiffMonthhs) > 1 || division * 8 > 8) {
      setParentTarget({
        actualDelivery: avgQuaterlyData?.Target[0],
        onTime: avgQuaterlyData?.Target[1],
        standards: avgQuaterlyData?.Target[2] / division,
        usuaibility: avgQuaterlyData?.Target[3] / division,
        redo: avgQuaterlyData?.Target[4] / division,
        critical: avgQuaterlyData?.Target[5],
        satisfaction: avgQuaterlyData?.Target[6] / division,
        upskilling: avgQuaterlyData?.Target[7] / division,
      });
    }
  }, [avgQuaterlyData]);

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
        // setTextError1({
        //   ...textError1,
        //   customOnTimeMarks: true,
        // });

        // setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);

        // setIndError1();
        // setTextError1({
        //   ...textError1,
        //   customOnTimeMarks: false,
        // });
        return;
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customAvgCodeMarks: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError1({
        //   ...textError1,
        //   customAvgCodeMarks: true,
        // });

        // setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        // setTextError1({
        //   ...textError1,
        //   customAvgCodeMarks: false,
        // });

        // setIndError1();
        return;
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customReDoMarks: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError1({
        //   ...textError1,
        //   customReDoMarks: true,
        // });

        // setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        // setTextError1({
        //   ...textError1,
        //   customReDoMarks: false,
        // });

        // setIndError1();
        return;
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
        // setTextError1({
        //   ...textError1,
        //   customCustomerSatisfactionMarks: true,
        // });

        // setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        // setTextError1({
        //   ...textError1,
        //   customCustomerSatisfactionMarks: false,
        // });

        // setIndError1();
        return;
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customUpskillingMarks: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError1({
        //   ...textError1,
        //   customUpskillingMarks: true,
        // });

        // setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        // setTextError1({
        //   ...textError1,
        //   customUpskillingMarks: false,
        // });

        // setIndError1();
        return;
      }
    }
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
        // setTextError2({
        //   ...textError2,
        //   customOnTimeMarksAr: true,
        // });
        // setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2({
        //   ...textError2,
        //   customOnTimeMarksAr: false,
        // });
        // setIndError2();
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customAvgCodeMarksAr: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError2({
        //   ...textError2,
        //   customAvgCodeMarksAr: true,
        // });
        // setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2({
        //   ...textError2,
        //   customAvgCodeMarksAr: false,
        // });
        // setIndError2();
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customReDoMarksAr: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError2({
        //   ...textError2,
        //   customReDoMarksAr: true,
        // });
        // setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2({
        //   ...textError2,
        //   customReDoMarksAr: false,
        // });
        // setIndError2();
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
        // setTextError2({
        //   ...textError2,
        //   customCustomerSatisfactionMarksAr: true,
        // });
        // setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2({
        //   ...textError2,
        //   customCustomerSatisfactionMarksAr: false,
        // });
        // setIndError2();
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customUpskillingMarksAr: e.target.value,
      });

      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError2({
        //   ...textError2,
        //   customUpskillingMarksAr: true,
        // });
        // setIndError2(ind);
      } else {
        setIsSubmit(false);
        // setTextError2({
        //   ...textError2,
        //   customUpskillingMarksAr: false,
        // });
        // setIndError2();
      }
    }
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
        // setTextError3({
        //   ...textError3,
        //   customOnTimeMarksRM: true,
        // });
        // setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3({
        //   ...textError3,
        //   customOnTimeMarksRM: false,
        // });
        // setIndError3();
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customAvgCodeMarksRM: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError3({
        //   ...textError3,
        //   customAvgCodeMarksRM: true,
        // });
        // setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3({
        //   ...textError3,
        //   customAvgCodeMarksRM: false,
        // });
        // setIndError3();
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customReDoMarksRM: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError3({
        //   ...textError3,
        //   customReDoMarksRM: true,
        // });
        // setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3({
        //   ...textError3,
        //   customReDoMarksRM: false,
        // });
        // setIndError3();
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
        // setTextError3({
        //   ...textError3,
        //   customCustomerSatisfactionMarksRM: true,
        // });
        // setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3({
        //   ...textError3,
        //   customCustomerSatisfactionMarksRM: false,
        // });
        // setIndError3();
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customUpskillingMarksRM: e.target.value,
      });
      if (e.target.value > val.I) {
        setIsSubmit(true);
        // setTextError3({
        //   ...textError3,
        //   customUpskillingMarksRM: true,
        // });
        // setIndError3(ind);
      } else {
        setIsSubmit(false);
        // setTextError3({
        //   ...textError3,
        //   customUpskillingMarksRM: false,
        // });
        // setIndError3();
      }
    }
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

  useEffect(() => {
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
  }, []);

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
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? actualDelivery
      : val.I === 0
      ? actualDelivery
      : val.I,
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? onTime
      : val.I === 0
      ? onTime
      : val.I,
    val.I,
    val.I,
    val.I,
    newwDiffMonthhs === 3 || isThreeMonths || selectedThreeMonths
      ? critical
      : val.I === 0
      ? critical
      : val.I,
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
    appraiseSelfRating[ind] !== undefined ? appraiseSelfRating[ind] : 0;

  // ....................formula for first input.....................//
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
  // ....................formula for second input.....................//
  const formulaA = (a, b, c) => {
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
    formula(actualDelivery, customActualdeliveryMarks, val.H) || 0,

    formula1(onTime, customOnTimeMarks, val.H) || 0,
    formula2(val.I, customAvgCodeMarks, val.H) || 0,

    formula3(val.I, customReDoMarks, val.H) || 0,

    formula4(val.I, customBugsReportedMarks, val.H) || 0,

    formula5(critical, customCriticalIssuesMarks, val.H) || 0,

    formula6(val.I, customCustomerSatisfactionMarks, val.H) || 0,

    formula7(val.I, customUpskillingMarks, val.H) || 0,
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
    formulaA(actualDelivery, customActualdeliveryMarksAr, val.H) || 0,

    formulaA1(onTime, customOnTimeMarksAr, val.H) || 0,

    formulaA2(val.I, customAvgCodeMarksAr, val.H) || 0,

    formulaA3(val.I, customReDoMarksAr, val.H) || 0,

    formulaA4(val.I, customBugsReportedMarksAr, val.H) || 0,

    formulaA5(critical, customCriticalIssuesMarksAr, val.H) || 0,

    formulaA6(val.I, customCustomerSatisfactionMarksAr, val.H) || 0,

    formulaA7(val.I, customUpskillingMarksAr, val.H) || 0,
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

  const matchingValues = ["Appraisee Marks", "Appraiser Marks"];

  // ****************************************************************************************************//

  // Initialize the column data array with values from val
  useEffect(() => {
    if (val) {
      setColumnDataArray((prevColumnDataArray) => {
        const newColumnDataArray = [...prevColumnDataArray];

        const rowDataObject = {};
        fullKeys.forEach((colLabel) => {
          const headerItem = headerTable.find(
            (headerObj) => Object.keys(headerObj)[0] === colLabel
          );
          const headerKey = headerItem ? Object.keys(headerItem)[0] : colLabel;
          const columnData = val[colLabel] !== undefined ? val[colLabel] : "";
          rowDataObject[headerKey] = columnData;
        });

        newColumnDataArray.push({ ...rowDataObject });

        // Initialize inputValues with values from columnDataArray
        setInputValues(newColumnDataArray);

        return newColumnDataArray;
      });
    }
  }, []);

  // Create a state array for input values and initialize it with columnDataArray
  const [inputValues, setInputValues] = useState(columnDataArray);

  const handleInputChange = (e, rowIndex, colLabel, ind) => {
    const newValue = e.target.value;
    setColumnDataArray(() => {
      const updatedInputValues = [...columnDataArray];
      // Update the specific column within the same row
      updatedInputValues[ind][colLabel] = newValue;

      return updatedInputValues;
    });
  };

  return (
    <>
      <tr>
        {fullKeys.map((colLabel, index) => {
          const data = val && val[colLabel] !== undefined ? val[colLabel] : "";

          let isMatchingColumn = false;
          let objColumnLabel = "";

          headerTable.some((obj) => {
            objColumnLabel = obj[colLabel];

            isMatchingColumn = matchingValues.includes(objColumnLabel);
            return isMatchingColumn;
          });

          let columnStyle;

          if (isMatchingColumn) {
            columnStyle =
              objColumnLabel === "Appraisee Marks"
                ? { backgroundColor: "#bf8f00" }
                : { backgroundColor: "#70ad47" };
          }

          const isSpecialColumn = [
            "Target",
            "Appraisee Self Rating",
            "Appraiser Rating",
            "Reviewer Marks",
          ].includes(objColumnLabel);

          return (
            <td
              key={index}
              style={{
                ...columnStyle,
                width: "100px",
                height: "100px",
                padding: "0",
                margin: "0",
                position: "relative",
              }}
            >
              {isSpecialColumn ? (
                <input
                  type="text"
                  value={inputValues[ind]?.[colLabel] || data}
                  onChange={(e) => handleInputChange(e, index, colLabel, ind)}
                  style={{
                    height: "100%",
                    position: "initial",
                    top: "0",
                    bottom: "0",
                    outline: "none",
                    border: "none",
                    backgroundColor: "#ecf0f1",
                    width: "100%",
                    fontSize: "17px",
                  }}
                  disabled={objColumnLabel === "Target" && +data > 0}
                />
              ) : (
                data
              )}
            </td>
          );
        })}
      </tr>
    </>
  );
};

export default Renderthirdtable;
