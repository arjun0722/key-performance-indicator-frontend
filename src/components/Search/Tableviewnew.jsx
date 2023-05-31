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
  setIsSubmit,
  isThreeMonths,
  selectedThreeMonths,
  setParentAppraise,
  parentAppraise,
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

  //UseEffect for the Appraisee Self Rating , Appraiser Rating and target

  //state to maintain target values

  const [actualDelivery, setActualDelivery] = useState(ind === 0 ? val.I : 0);
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
  const [customBugsReportedMarks, setCustomBugsReportedMarks] = useState(
    ind === 4 ? val.J : 0
  );
  const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] = useState(
    ind === 5 ? val.J : 0
  );
  const [customCustomerSatisfactionMarks, setCustomCustomerSatisfactionMarks] =
    useState(ind === 6 ? val.J : 0);
  const [customUpskillingMarks, setCustomUpskillingMarks] = useState(
    ind === 7 ? val.J : 0
  );

  // this states use for Appraiser Rating
  const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] = useState(
    ind === 0 ? val.L : 0
  );
  const [customOnTimeMarksAr, setCustomOnTimeMarksAr] = useState(
    ind === 1 ? val.L : 0
  );
  const [customAvgCodeMarksAr, setCustomAvgCodeMarksAr] = useState(
    ind === 2 ? val.L : 0
  );
  const [customReDoMarksAr, setCustomCustomReDoMarksAr] = useState(
    ind === 3 ? val.L : 0
  );
  const [customBugsReportedMarksAr, setCustomBugsReportedMarksAr] = useState(
    ind === 4 ? val.L : 0
  );
  const [customCriticalIssuesMarksAr, setCustomCriticalIssuesMarksAr] =
    useState(ind === 5 ? val.L : 0);
  const [
    customCustomerSatisfactionMarksAr,
    setCustomCustomerSatisfactionMarksAr,
  ] = useState(ind === 6 ? val.L : 0);
  const [customUpskillingMarksAr, setCustomUpskillingMarksAr] = useState(
    ind === 7 ? val.L : 0
  );

  // this states use for Reviewer Marks
  const [customActualdeliveryMarksRM, setCustomActualdeliveryRM] = useState(0);
  const [customOnTimeMarksRM, setCustomOnTimeMarksRM] = useState(0);
  const [customAvgCodeMarksRM, setCustomAvgCodeMarksRM] = useState(0);
  const [customReDoMarksRM, setCustomCustomReDoMarksRM] = useState(0);
  const [customBugsReportedMarksRM, setCustomBugsReportedMarksRM] = useState(0);
  const [customCriticalIssuesMarksRM, setCustomCriticalIssuesMarksRM] =
    useState(0);
  const [
    customCustomerSatisfactionMarksRM,
    setCustomCustomerSatisfactionMarksRM,
  ] = useState(0);
  const [customUpskillingMarksRM, setCustomUpskillingMarksRM] = useState(0);

  //................. this states use for input validations ...............//

  //--------------------//

  //--------------------//

  const [indError1, setIndError1] = useState();

  const [indError2, setIndError2] = useState();

  const [indError3, setIndError3] = useState();

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
        setTextError1({
          ...textError1,
          customOnTimeMarks: true,
        });

        setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);

        setIndError1(ind);
        setTextError1({
          ...textError1,
          customOnTimeMarks: false,
        });
        return;
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customAvgCodeMarks: e.target.value,
      });
      if (e.target.value > 5) {
        setIsSubmit(true);
        setTextError1({
          ...textError1,
          customAvgCodeMarks: true,
        });

        setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        setTextError1({
          ...textError1,
          customAvgCodeMarks: false,
        });

        setIndError1(ind);
        return;
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customReDoMarks: e.target.value,
      });
      if (e.target.value > 2) {
        setIsSubmit(true);
        setTextError1({
          ...textError1,
          customReDoMarks: true,
        });

        setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        setTextError1({
          ...textError1,
          customReDoMarks: false,
        });

        setIndError1(ind);
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
        setTextError1({
          ...textError1,
          customCustomerSatisfactionMarks: true,
        });

        setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        setTextError1({
          ...textError1,
          customCustomerSatisfactionMarks: false,
        });

        setIndError1(ind);
        return;
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarks(e.target.value);
      setParentSelfAppraise({
        ...parentSelfAppraise,
        customUpskillingMarks: e.target.value,
      });
      if (e.target.value > 1) {
        setIsSubmit(true);
        setTextError1({
          ...textError1,
          customUpskillingMarks: true,
        });

        setIndError1(ind);
        return;
      } else {
        setIsSubmit(false);
        setTextError1({
          ...textError1,
          customUpskillingMarks: false,
        });

        setIndError1(ind);
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
        setTextError2({
          ...textError2,
          customOnTimeMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        setTextError2({
          ...textError2,
          customOnTimeMarksAr: false,
        });
        setIndError2(ind);
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customAvgCodeMarksAr: e.target.value,
      });
      if (e.target.value > 5) {
        setIsSubmit(true);
        setTextError2({
          ...textError2,
          customAvgCodeMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        setTextError2({
          ...textError2,
          customAvgCodeMarksAr: false,
        });
        setIndError2(ind);
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customReDoMarksAr: e.target.value,
      });
      if (e.target.value > 2) {
        setIsSubmit(true);
        setTextError2({
          ...textError2,
          customReDoMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        setTextError2({
          ...textError2,
          customReDoMarksAr: false,
        });
        setIndError2(ind);
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
        setTextError2({
          ...textError2,
          customCustomerSatisfactionMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        setTextError2({
          ...textError2,
          customCustomerSatisfactionMarksAr: false,
        });
        setIndError2(ind);
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarksAr(e.target.value);
      setParentAppraise({
        ...parentAppraise,
        customUpskillingMarksAr: e.target.value,
      });
      if (e.target.value > 1) {
        setIsSubmit(true);
        setTextError2({
          ...textError2,
          customUpskillingMarksAr: true,
        });
        setIndError2(ind);
      } else {
        setIsSubmit(false);
        setTextError2({
          ...textError2,
          customUpskillingMarksAr: false,
        });
        setIndError2(ind);
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
        setTextError3({
          ...textError3,
          customOnTimeMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        setTextError3({
          ...textError3,
          customOnTimeMarksRM: false,
        });
        setIndError3(ind);
      }
    }
    if (ind == 2) {
      setCustomAvgCodeMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customAvgCodeMarksRM: e.target.value,
      });
      if (e.target.value > 5) {
        setIsSubmit(true);
        setTextError3({
          ...textError3,
          customAvgCodeMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        setTextError3({
          ...textError3,
          customAvgCodeMarksRM: false,
        });
        setIndError3(ind);
      }
    }
    if (ind == 3) {
      setCustomCustomReDoMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customReDoMarksRM: e.target.value,
      });
      if (e.target.value > 2) {
        setIsSubmit(true);
        setTextError3({
          ...textError3,
          customReDoMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        setTextError3({
          ...textError3,
          customReDoMarksRM: false,
        });
        setIndError3(ind);
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
        setTextError3({
          ...textError3,
          customCustomerSatisfactionMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        setTextError3({
          ...textError3,
          customCustomerSatisfactionMarksRM: false,
        });
        setIndError3(ind);
      }
    }
    if (ind == 7) {
      setCustomUpskillingMarksRM(e.target.value);
      setParentReviewerMarks({
        ...parentReviewerMarks,
        customUpskillingMarksRM: e.target.value,
      });
      if (e.target.value > 1) {
        setIsSubmit(true);
        setTextError3({
          ...textError3,
          customUpskillingMarksRM: true,
        });
        setIndError3(ind);
      } else {
        setIsSubmit(false);
        setTextError3({
          ...textError3,
          customUpskillingMarksRM: false,
        });
        setIndError3(ind);
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
      critical: thirdTable[5]?.I,
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
    val.I === 0 ? actualDelivery : val.I,
    val.I === 0 ? onTime : val.I,
    val.I,
    val.I,
    val.I,
    val.I === 0 ? critical : val.I,
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
    const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula1 = (a, b, c) => {
    const value = Number(((100 + ((b - a) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula2 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula3 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula4 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula5 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula6 = (a, b, c) => {
    const value = Number(((100 - ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
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
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA1 = (a, b, c) => {
    const value = Number(((100 + ((b - a) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA2 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA3 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA4 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA5 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA6 = (a, b, c) => {
    const value = Number(((100 - ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA7 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
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
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : val.I > 0
                ? true
                : false
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              backgroundColor: "#ecf0f1",
              outline: "none",
              border: "none",
              width: "100%",
              fontSize: "17px",
            }}
            onChange={(e) => handleTarget(e)}
          />
        </td>
        <td style={{ position: "relative" }}>
          <TextField
            error={showTextError1()}
            helperText={indError1 === ind ? "error" : ""}
            color=""
            InputProps={{
              inputProps: {
                max:
                  ind === 2
                    ? 5
                    : ind === 1
                    ? onTime
                    : ind === 3
                    ? 2
                    : ind === 6
                    ? 5
                    : ind === 7
                    ? 1
                    : "",
                min: 0,
              },
            }}
            type="number"
            // min={0}
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : loginUser === email
                ? false
                : true
            }
            // max={
            //           ind === 2
            //                     ? 5
            //                     : ind ===
            //                       1
            //                     ? onTime
            //                     : ""
            // }
            value={
              loginUser === email
                ? ind === 0
                  ? customActualdeliveryMarks
                  : ind === 1
                  ? customOnTimeMarks
                  : ind === 2
                  ? customAvgCodeMarks
                  : ind === 3
                  ? customReDoMarks
                  : ind === 4
                  ? customBugsReportedMarks
                  : ind === 5
                  ? customCriticalIssuesMarks
                  : ind === 6
                  ? customCustomerSatisfactionMarks
                  : ind === 7
                  ? customUpskillingMarks
                  : val.J
                : val.J
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              outline: "none",
              border: "none",
              backgroundColor: "#ecf0f1",
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
          {/* {val.K} */}
          {valueAppraiseAMrks}
        </td>
        <td style={{ position: "relative" }}>
          <TextField
            error={showTextError2()}
            helperText={indError2 === ind ? "error" : ""}
            color=""
            InputProps={{
              inputProps: {
                max:
                  ind === 2
                    ? 5
                    : ind === 1
                    ? onTime
                    : ind === 3
                    ? 2
                    : ind === 6
                    ? 5
                    : ind === 7
                    ? 1
                    : "",
                min: 0,
              },
            }}
            type="number"
            // min="0"
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : MANAGEMENt_ID.includes(loginUser)
                ? false
                : true
            }
            // max={
            //           ind === 2
            //                     ? 5
            //                     : "" ||
            //                       ind ===
            //                                 1
            //                     ? onTime
            //                     : ""
            // }
            value={
              MANAGEMENt_ID.includes(loginUser)
                ? ind === 0
                  ? customActualdeliveryMarksAr
                  : 0 || ind === 1
                  ? customOnTimeMarksAr
                  : 0 || ind === 2
                  ? customAvgCodeMarksAr
                  : 0 || ind === 3
                  ? customReDoMarksAr
                  : 0 || ind === 4
                  ? customBugsReportedMarksAr
                  : 0 || ind === 5
                  ? customCriticalIssuesMarksAr
                  : 0 || ind === 6
                  ? customCustomerSatisfactionMarksAr
                  : 0 || ind === 7
                  ? customUpskillingMarksAr
                  : 0
                : val.L
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              outline: "none",
              border: "none",
              backgroundColor: "#ecf0f1",
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
          {/* {val.M} */}
          {valueAppraiserMarks}
        </td>
        <td style={{ position: "relative" }}>
          <TextField
            error={showTextError3()}
            helperText={indError3 === ind ? "error" : ""}
            color=""
            InputProps={{
              inputProps: {
                max:
                  ind === 2
                    ? 5
                    : ind === 1
                    ? onTime
                    : ind === 3
                    ? 2
                    : ind === 6
                    ? 5
                    : ind === 7
                    ? 1
                    : "",
                min: 0,
              },
            }}
            type="number"
            // min="0"
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : REVIEWER_MANAGER.includes(loginUser)
                ? false
                : true
            }
            // max={
            //           ind === 2
            //                     ? 5
            //                     : "" ||
            //                       ind ===
            //                                 1
            //                     ? onTime
            //                     : ""
            // }
            value={
              REVIEWER_MANAGER.includes(loginUser)
                ? ind === 0
                  ? customActualdeliveryMarksRM
                  : 0 || ind === 1
                  ? customOnTimeMarksRM
                  : 0 || ind === 2
                  ? customAvgCodeMarksRM
                  : 0 || ind === 3
                  ? customReDoMarksRM
                  : 0 || ind === 4
                  ? customBugsReportedMarksRM
                  : 0 || ind === 5
                  ? customCriticalIssuesMarksRM
                  : 0 || ind === 6
                  ? customCustomerSatisfactionMarksRM
                  : 0 || ind === 7
                  ? customUpskillingMarksRM
                  : 0
                : 0
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              outline: "none",
              border: "none",
              backgroundColor: "#ecf0f1",
              width: "100%",
              fontSize: "17px",
            }}
            onChange={(e) => {
              handleOnChange2(e);
            }}
          />
          {/* {val.N} */}
        </td>
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
  setIsSubmit,
  isThreeMonths,
  selectedThreeMonths,
  setParentAppraise,
  parentAppraise,
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
}) => {
  //state to maintain target values
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

  //  updatedData?.data?.data[5]?.Target;

  const [actualDelivery, setActualDelivery] = useState(
    updatedData?.data?.data[0]?.Target
  );
  const [onTime, setOnTime] = useState(updatedData?.data?.data[1]?.Target);
  const [critical, setCritical] = useState(updatedData?.data?.data[5]?.Target);

  //  this state use for Appraisee Self Rating
  const [customActualdeliveryMarks, setCustomActualdelivery] = useState(
    updatedData?.data?.data[0]?.AppraiseeSelfRating
  );
  const [customOnTimeMarks, setCustomOnTimeMarks] = useState(
    updatedData?.data?.data[1]?.AppraiseeSelfRating
  );
  const [customAvgCodeMarks, setCustomAvgCodeMarks] = useState(
    updatedData?.data?.data[2]?.AppraiseeSelfRating
  );
  const [customReDoMarks, setCustomCustomReDoMarks] = useState(
    updatedData?.data?.data[3]?.AppraiseeSelfRating
  );
  const [customBugsReportedMarks, setCustomBugsReportedMarks] = useState(
    updatedData?.data?.data[4]?.AppraiseeSelfRating
  );
  const [customCriticalIssuesMarks, setCustomCriticalIssuesMarks] = useState(
    updatedData?.data?.data[5]?.AppraiseeSelfRating
  );
  const [customCustomerSatisfactionMarks, setCustomCustomerSatisfactionMarks] =
    useState(updatedData?.data?.data[6]?.AppraiseeSelfRating);
  const [customUpskillingMarks, setCustomUpskillingMarks] = useState(
    updatedData?.data?.data[7]?.AppraiseeSelfRating
  );

  // this states use for Appraiser Rating
  const [customActualdeliveryMarksAr, setCustomActualdeliveryAr] = useState(
    updatedData?.data?.data[0]?.AppraiserRating
  );
  const [customOnTimeMarksAr, setCustomOnTimeMarksAr] = useState(
    updatedData?.data?.data[1]?.AppraiserRating
  );
  const [customAvgCodeMarksAr, setCustomAvgCodeMarksAr] = useState(
    updatedData?.data?.data[2]?.AppraiserRating
  );
  const [customReDoMarksAr, setCustomCustomReDoMarksAr] = useState(
    updatedData?.data?.data[3]?.AppraiserRating
  );
  const [customBugsReportedMarksAr, setCustomBugsReportedMarksAr] = useState(
    updatedData?.data?.data[4]?.AppraiserRating
  );
  const [customCriticalIssuesMarksAr, setCustomCriticalIssuesMarksAr] =
    useState(updatedData?.data?.data[5]?.AppraiserRating);
  const [
    customCustomerSatisfactionMarksAr,
    setCustomCustomerSatisfactionMarksAr,
  ] = useState(updatedData?.data?.data[6]?.AppraiserRating);
  const [customUpskillingMarksAr, setCustomUpskillingMarksAr] = useState(
    updatedData?.data?.data[7]?.AppraiserRating
  );

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

  // this states use for Reviewer Marks
  const [customActualdeliveryMarksRM, setCustomActualdeliveryRM] = useState(
    updatedData?.data?.data[0]?.ReviewerMarks
  );
  const [customOnTimeMarksRM, setCustomOnTimeMarksRM] = useState(
    updatedData?.data?.data[1]?.ReviewerMarks
  );
  const [customAvgCodeMarksRM, setCustomAvgCodeMarksRM] = useState(
    updatedData?.data?.data[2]?.ReviewerMarks
  );
  const [customReDoMarksRM, setCustomCustomReDoMarksRM] = useState(
    updatedData?.data?.data[3]?.ReviewerMarks
  );
  const [customBugsReportedMarksRM, setCustomBugsReportedMarksRM] = useState(
    updatedData?.data?.data[4]?.ReviewerMarks
  );
  const [customCriticalIssuesMarksRM, setCustomCriticalIssuesMarksRM] =
    useState(updatedData?.data?.data[5]?.ReviewerMarks);
  const [
    customCustomerSatisfactionMarksRM,
    setCustomCustomerSatisfactionMarksRM,
  ] = useState(updatedData?.data?.data[6]?.ReviewerMarks);
  const [customUpskillingMarksRM, setCustomUpskillingMarksRM] = useState(
    updatedData?.data?.data[7]?.ReviewerMarks
  );

  //................. this states use for input validations ...............//
  const [textError1, setTextError1] = useState({
    customOnTimeMarks: false,
    customAvgCodeMarks: false,
    customReDoMarks: false,
    customCustomerSatisfactionMarks: false,
    customUpskillingMarks: false,
  });
  const [indError1, setIndError1] = useState();
  const [textError2, setTextError2] = useState({
    customOnTimeMarksAr: false,
    customAvgCodeMarksAr: false,
    customReDoMarksAr: false,
    customCustomerSatisfactionMarksAr: false,
    customUpskillingMarksAr: false,
  });
  const [indError2, setIndError2] = useState();
  const [textError3, setTextError3] = useState({
    customOnTimeMarksRM: false,
    customAvgCodeMarksRM: false,
    customReDoMarksRM: false,
    customCustomerSatisfactionMarksRM: false,
    customUpskillingMarksRM: false,
  });
  const [indError3, setIndError3] = useState();

  useEffect(() => {
    if (updatedData && updatedData.data) {
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
    }
    if (updatedData && updatedData.data) {
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
    if (updatedData && updatedData.data) {
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

    if (updatedData && updatedData.data) {
      setParentTarget({
        actualDelivery: updatedData?.data?.data[0]?.Target,
        onTime: updatedData?.data?.data[1]?.Target,

        critical: updatedData?.data?.data[5]?.Target,
      });
    }
  }, [updatedData]);
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
      if (e.target.value > 5) {
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
      if (e.target.value > 2) {
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
      if (e.target.value > 1) {
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
      if (e.target.value > 5) {
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
      if (e.target.value > 2) {
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
      if (e.target.value > 1) {
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
      if (e.target.value > 5) {
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
      if (e.target.value > 2) {
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
      if (e.target.value > 1) {
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
  }

  const valueMap = [
    com[ind].I === 0 ? actualDelivery : com[ind].I,
    com[ind].I === 0 ? onTime : com[ind].I,
    com[ind].I,
    com[ind].I,
    com[ind].I,
    com[ind].I === 0 ? critical : com[ind].I,
    com[ind].I,
    com[ind].I,
  ];
  const value = valueMap[ind] !== undefined ? valueMap[ind] : "";

  // .................formulas for first input..........//
  const formula = (a, b, c) => {
    const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula1 = (a, b, c) => {
    const value = Number(((100 + ((b - a) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula2 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula3 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula4 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula5 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula6 = (a, b, c) => {
    const value = Number(((100 - ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formula7 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };

  //.............formulas for second table...........//
  const formulaA = (a, b, c) => {
    const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA1 = (a, b, c) => {
    const value = Number(((100 + ((b - a) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA2 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA3 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA4 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / b) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA5 = (a, b, c) => {
    const value = Number((b / a) * c).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA6 = (a, b, c) => {
    const value = Number(((100 - ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
    }
  };
  const formulaA7 = (a, b, c) => {
    const value = Number(((100 + ((a - b) / a) * 100) * c) / 100).toFixed(2);

    if (value !== "-Infinity" && value !== "Infinity" && value !== "NaN") {
      return value;
    } else {
      return 0;
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
            max={ind === 5 ? "5" : ""}
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : value > 0
                ? true
                : false
            }
            value={value}
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              outline: "none",
              border: "none",
              backgroundColor: "#ecf0f1",

              width: "100%",
              fontSize: "17px",
            }}
            onChange={(e) => handleTarget(e)}
          />
        </td>
        <td style={{ position: "relative" }}>
          {/* {val.J} */}
          <TextField
            error={showTextError1()}
            helperText={indError1 === ind ? "error" : ""}
            color=""
            InputProps={{
              inputProps: {
                max:
                  ind === 2
                    ? 5
                    : ind === 1
                    ? onTime
                    : ind === 3
                    ? 2
                    : ind === 6
                    ? 5
                    : ind === 7
                    ? 1
                    : "",
                min: 0,
              },
            }}
            type="number"
            // min="0"
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : loginUser === email
                ? false
                : true
            }
            // max={
            //           ind === 2
            //                     ? 5
            //                     : "" ||
            //                       ind ===
            //                                 1
            //                     ? onTime
            //                     : ""
            // }
            value={
              loginUser === users
                ? ind === 0
                  ? customActualdeliveryMarks
                  : 0 || ind === 1
                  ? customOnTimeMarks
                  : 0 || ind === 2
                  ? customAvgCodeMarks
                  : 0 || ind === 3
                  ? customReDoMarks
                  : 0 || ind === 4
                  ? customBugsReportedMarks
                  : 0 || ind === 5
                  ? customCriticalIssuesMarks
                  : 0 || ind === 6
                  ? customCustomerSatisfactionMarks
                  : 0 || ind === 7
                  ? customUpskillingMarks
                  : 0
                : val.AppraiseeSelfRating
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              outline: "none",
              border: "none",
              backgroundColor: "#ecf0f1",
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
          {valueAppraiseAMrks}
        </td>
        <td style={{ position: "relative" }}>
          {/* {val.L} */}
          <TextField
            error={showTextError2()}
            helperText={indError2 === ind ? "error" : ""}
            color=""
            InputProps={{
              inputProps: {
                max:
                  ind === 2
                    ? 5
                    : ind === 1
                    ? onTime
                    : ind === 3
                    ? 2
                    : ind === 6
                    ? 5
                    : ind === 7
                    ? 1
                    : "",
                min: 0,
              },
            }}
            type="number"
            min="0"
            max={ind === 2 ? 5 : "" || ind === 1 ? onTime : ""}
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : MANAGEMENt_ID.includes(loginUser)
                ? false
                : true
            }
            value={
              MANAGEMENt_ID.includes(loginUser)
                ? ind === 0
                  ? customActualdeliveryMarksAr
                  : 0 || ind === 1
                  ? customOnTimeMarksAr
                  : 0 || ind === 2
                  ? customAvgCodeMarksAr
                  : 0 || ind === 3
                  ? customReDoMarksAr
                  : 0 || ind === 4
                  ? customBugsReportedMarksAr
                  : 0 || ind === 5
                  ? customCriticalIssuesMarksAr
                  : 0 || ind === 6
                  ? customCustomerSatisfactionMarksAr
                  : 0 || ind === 7
                  ? customUpskillingMarksAr
                  : 0
                : val.AppraiserRating
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              outline: "none",
              border: "none",
              backgroundColor: "#ecf0f1",
              width: "100%",
              fontSize: "17px",
            }}
            // value={val.L}
            onChange={(e) => {
              handleOnChange1(e);
            }}
          />
        </td>
        <td
          style={{
            backgroundColor: "#70ad47",
          }}
        >
          {/* {com[ind].M} */}
          {valueAppraiserMarks}
        </td>
        <td style={{ position: "relative" }}>
          <TextField
            error={showTextError3()}
            helperText={indError3 === ind ? "error" : ""}
            color=""
            InputProps={{
              inputProps: {
                max:
                  ind === 2
                    ? 5
                    : ind === 1
                    ? onTime
                    : ind === 3
                    ? 2
                    : ind === 6
                    ? 5
                    : ind === 7
                    ? 1
                    : "",
                min: 0,
              },
            }}
            type="number"
            min="0"
            max={ind === 2 ? 5 : "" || ind === 1 ? onTime : ""}
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : REVIEWER_MANAGER.includes(loginUser)
                ? false
                : true
            }
            value={
              REVIEWER_MANAGER.includes(loginUser)
                ? ind === 0
                  ? customActualdeliveryMarksRM
                  : 0 || ind === 1
                  ? customOnTimeMarksRM
                  : 0 || ind === 2
                  ? customAvgCodeMarksRM
                  : 0 || ind === 3
                  ? customReDoMarksRM
                  : 0 || ind === 4
                  ? customBugsReportedMarksRM
                  : 0 || ind === 5
                  ? customCriticalIssuesMarksRM
                  : 0 || ind === 6
                  ? customCustomerSatisfactionMarksRM
                  : 0 || ind === 7
                  ? customUpskillingMarksRM
                  : 0
                : val.ReviewerMarks
            }
            style={{
              height: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              outline: "none",
              border: "none",
              backgroundColor: "#ecf0f1",
              width: "100%",
              fontSize: "17px",
            }}
            // value={val.L}
            onChange={(e) => {
              handleOnChange2(e);
            }}
          />
          {/* {com[ind].N} */}
        </td>
        <td>{com[ind].O}</td>
      </tr>
    </>
  );
};

const Renderforthtable = ({
  val,
  ind,
  setIsSubmit,
  selectedThreeMonths,
  isThreeMonths,
  lowPotential,
  setLowPotential,
  goodPotential,
  setGoodPotential,
  highPotential,
  setHighPotential,
  updatedBehaviourData,
  designation,
  rowTotal,
  setRowTotal,
  setTextError1LowPotential,
  textError1LowPotential,
  setTextError2GoodPotential,
  textError2GoodPotential,
  setTextError3HighPotential,
  textError3HighPotential,
}) => {
  // const [avg,setAvg] = useState(0)

  const [isDisable, setIsDisable] = useState({
    LowPotential: false,
    GoodPotential: false,
    HighPotential: false,
  });

  const [loginUser, setLoginUser] = useState(
    localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
  );

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
  const [maturitylp, setMaturitylp] = useState(0);
  const [approachlp, setApproachlp] = useState(0);
  const [teamworklp, setTeamworklp] = useState(0);

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
  const [maturitygp, setMaturitygp] = useState(0);
  const [approachgp, setApproachgp] = useState(0);
  const [teamworkgp, setTeamworkgp] = useState(0);

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
  const [maturityhp, setMaturityhp] = useState(0);
  const [approachhp, setApproachhp] = useState(0);
  const [teamworkhp, setTeamworkhp] = useState(0);

  //.................this states use for input validations...............//
  const [overallTotal, setOverallTotal] = useState(0);
  const [textError1, setTextError1] = useState(false);
  const [indError1, setIndError1] = useState();
  const [textError2, setTextError2] = useState(false);
  const [indError2, setIndError2] = useState();
  const [textError3, setTextError3] = useState(false);
  const [indError3, setIndError3] = useState();

  //------------------------------------------------------------------//
  //useEffect for the intital value which will set in table//
  //------------------------------------------------------------------//

  useEffect(() => {
    //=============lowpotential states================//

    setAttendencelp(
      updatedBehaviourData[0]?.LowPotential
        ? updatedBehaviourData[0]?.LowPotential
        : 0
    );
    setLessDDependabilitylp(
      updatedBehaviourData[1]?.LowPotential
        ? updatedBehaviourData[1]?.LowPotential
        : 0
    );
    setGroupWorkinglp(
      updatedBehaviourData[2]?.LowPotential
        ? updatedBehaviourData[2]?.LowPotential
        : 0
    );
    setPositiveAttitudelp(
      updatedBehaviourData[3]?.LowPotential
        ? updatedBehaviourData[3]?.LowPotential
        : 0
    );
    setIntelligencelp(
      updatedBehaviourData[4]?.LowPotential
        ? updatedBehaviourData[4]?.LowPotential
        : 0
    );
    setImaginationlp(
      updatedBehaviourData[5]?.LowPotential
        ? updatedBehaviourData[5]?.LowPotential
        : 0
    );
    setImprovementlp(
      updatedBehaviourData[6]?.LowPotential
        ? updatedBehaviourData[6]?.LowPotential
        : 0
    );
    setDisciplinelp(
      updatedBehaviourData[7]?.LowPotential
        ? updatedBehaviourData[7]?.LowPotential
        : 0
    );
    setQualitylp(
      updatedBehaviourData[8]?.LowPotential
        ? updatedBehaviourData[8]?.LowPotential
        : 0
    );
    setResponsibilitylp(
      updatedBehaviourData[9]?.LowPotential
        ? updatedBehaviourData[9]?.LowPotential
        : 0
    );
    setMultiSkillslp(
      updatedBehaviourData[10]?.LowPotential
        ? updatedBehaviourData[10]?.LowPotential
        : 0
    );
    setMaturitylp(
      updatedBehaviourData[11]?.LowPotential
        ? updatedBehaviourData[11]?.LowPotential
        : 0
    );
    setApproachlp(
      updatedBehaviourData[12]?.LowPotential
        ? updatedBehaviourData[12]?.LowPotential
        : 0
    );
    setTeamworklp(
      updatedBehaviourData[13]?.LowPotential
        ? updatedBehaviourData[13]?.LowPotential
        : 0
    );

    //=============goodpotential states================//
    setAttendencegp(
      updatedBehaviourData[0]?.GoodPotential
        ? updatedBehaviourData[0]?.GoodPotential
        : 0
    );
    setLessDDependabilitygp(
      updatedBehaviourData[1]?.GoodPotential
        ? updatedBehaviourData[1]?.GoodPotential
        : 0
    );
    setGroupWorkinggp(
      updatedBehaviourData[2]?.GoodPotential
        ? updatedBehaviourData[2]?.GoodPotential
        : 0
    );
    setPositiveAttitudegp(
      updatedBehaviourData[3]?.GoodPotential
        ? updatedBehaviourData[3]?.GoodPotential
        : 0
    );
    setIntelligencegp(
      updatedBehaviourData[4]?.GoodPotential
        ? updatedBehaviourData[4]?.GoodPotential
        : 0
    );
    setImaginationgp(
      updatedBehaviourData[5]?.GoodPotential
        ? updatedBehaviourData[5]?.GoodPotential
        : 0
    );
    setImprovementgp(
      updatedBehaviourData[6]?.GoodPotential
        ? updatedBehaviourData[6]?.GoodPotential
        : 0
    );
    setDisciplinegp(
      updatedBehaviourData[7]?.GoodPotential
        ? updatedBehaviourData[7]?.GoodPotential
        : 0
    );
    setQualitygp(
      updatedBehaviourData[8]?.GoodPotential
        ? updatedBehaviourData[8]?.GoodPotential
        : 0
    );
    setResponsibilitygp(
      updatedBehaviourData[9]?.GoodPotential
        ? updatedBehaviourData[9]?.GoodPotential
        : 0
    );
    setMultiSkillsgp(
      updatedBehaviourData[10]?.GoodPotential
        ? updatedBehaviourData[10]?.GoodPotential
        : 0
    );
    setMaturitygp(
      updatedBehaviourData[11]?.GoodPotential
        ? updatedBehaviourData[11]?.GoodPotential
        : 0
    );
    setApproachgp(
      updatedBehaviourData[12]?.GoodPotential
        ? updatedBehaviourData[12]?.GoodPotential
        : 0
    );
    setTeamworkgp(
      updatedBehaviourData[13]?.GoodPotential
        ? updatedBehaviourData[13]?.GoodPotential
        : 0
    );

    //=============highpotential states================//
    setAttendencehp(
      updatedBehaviourData[0]?.HighPotential
        ? updatedBehaviourData[0]?.HighPotential
        : 0
    );
    setLessDDependabilityhp(
      updatedBehaviourData[1]?.HighPotential
        ? updatedBehaviourData[1]?.HighPotential
        : 0
    );
    setGroupWorkinghp(
      updatedBehaviourData[2]?.HighPotential
        ? updatedBehaviourData[2]?.HighPotential
        : 0
    );
    setPositiveAttitudehp(
      updatedBehaviourData[3]?.HighPotential
        ? updatedBehaviourData[3]?.HighPotential
        : 0
    );
    setIntelligencehp(
      updatedBehaviourData[4]?.HighPotential
        ? updatedBehaviourData[4]?.HighPotential
        : 0
    );
    setImaginationhp(
      updatedBehaviourData[5]?.HighPotential
        ? updatedBehaviourData[5]?.HighPotential
        : 0
    );
    setImprovementhp(
      updatedBehaviourData[6]?.HighPotential
        ? updatedBehaviourData[6]?.HighPotential
        : 0
    );
    setDisciplinehp(
      updatedBehaviourData[7]?.HighPotential
        ? updatedBehaviourData[7]?.HighPotential
        : 0
    );
    setQualityhp(
      updatedBehaviourData[8]?.HighPotential
        ? updatedBehaviourData[8]?.HighPotential
        : 0
    );
    setResponsibilityhp(
      updatedBehaviourData[9]?.HighPotential
        ? updatedBehaviourData[9]?.HighPotential
        : 0
    );
    setMultiSkillshp(
      updatedBehaviourData[10]?.HighPotential
        ? updatedBehaviourData[10]?.HighPotential
        : 0
    );
    setMaturityhp(
      updatedBehaviourData[11]?.HighPotential
        ? updatedBehaviourData[11]?.HighPotential
        : 0
    );
    setApproachhp(
      updatedBehaviourData[12]?.HighPotential
        ? updatedBehaviourData[12]?.HighPotential
        : 0
    );
    setTeamworkhp(
      updatedBehaviourData[13]?.HighPotential
        ? updatedBehaviourData[13]?.HighPotential
        : 0
    );
  }, [updatedBehaviourData]);

  //------------------------------------------------------------------//
  //OnChnage//
  //------------------------------------------------------------------//

  function handleOnChange1(e) {
   
    if (MANAGEMENt_ID.includes(loginUser)) {
      if (e.target.value > 5) {
        setTextError1(true);
        setTextError1LowPotential({
          ...textError1LowPotential,
          [ind]: true,
        });
        setIndError1(ind);
        setIsSubmit(true);
      } else {
        setIsSubmit(false);
        setTextError1LowPotential({
          ...textError1LowPotential,
          [ind]: false,
        });
        setTextError1(false);
        setIndError1();
        setTextError2(false);
        setIndError2();
        setTextError3(false);
        setIndError3();
      }

      if (e.target.value === "0" || e.target.value === undefined) {
        setTextError1LowPotential({
          ...textError1LowPotential,
          [ind]: false,
        });

        setTextError1(false);
      }
      if (e.target.value && e.target.value > 0) {
        setIsDisable({
          LowPotential: false,
          GoodPotential: true,
          HighPotential: true,
        });
      } else {
        setIsDisable({
          LowPotential: false,
          GoodPotential: false,
          HighPotential: false,
        });
      }

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
          improvementlp: e.target.value,
        });
      }
      if (ind === 7) {
        setDisciplinelp(e.target.value);
        setLowPotential({
          ...lowPotential,
          disciplinelp: e.target.value,
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
      if (ind === 11) {
        setMaturitylp(e.target.value);
        setLowPotential({
          ...lowPotential,
          maturitylp: e.target.value,
        });
      }
      if (ind === 12) {
        setApproachlp(e.target.value);
        setLowPotential({
          ...lowPotential,
          approachlp: e.target.value,
        });
      }
      if (ind === 13) {
        setTeamworklp(e.target.value);
        setLowPotential({
          ...lowPotential,
          teamworklp: e.target.value,
        });
      }
    } else {
      return console.error("error");
    }
  }
 

  function handleOnChange2(e) {

    if (MANAGEMENt_ID.includes(loginUser)) {
      if (e.target.value < 6 || e.target.value > 8) {
        setTextError2(true);
        setTextError2GoodPotential({
          ...textError2GoodPotential,
          [ind]: true,
        });
        setIndError2(ind);
        setIsSubmit(true);
      } else {
        setIsSubmit(false);
        setTextError1(false);
        setTextError2GoodPotential({
          ...textError2GoodPotential,
          [ind]: false,
        });
        setIndError1();
        setTextError2(false);
        setIndError2();
        setTextError3(false);
        setIndError3();
      }

      if (e.target.value === "0" || e.target.value === undefined) {
        setTextError2GoodPotential({
          ...textError2GoodPotential,
          [ind]: false,
        });

        setTextError2(false);
      }
      if (e.target.value && e.target.value > 0) {
        setIsDisable({
          LowPotential: true,
          GoodPotential: false,
          HighPotential: true,
        });
      } else {
        setIsDisable({
          LowPotential: false,
          GoodPotential: false,
          HighPotential: false,
        });
      }
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
      if (ind === 11) {
        setMaturitygp(e.target.value);
        setGoodPotential({
          ...goodPotential,
          maturitygp: e.target.value,
        });
      }
      if (ind === 12) {
        setApproachgp(e.target.value);
        setGoodPotential({
          ...goodPotential,
          approachgp: e.target.value,
        });
      }
      if (ind === 13) {
        setTeamworkgp(e.target.value);
        setGoodPotential({
          ...goodPotential,
          teamworkgp: e.target.value,
        });
      }
    } else {
      return console.error("error");
    }
  }

  function handleOnChange3(e) {
    if (MANAGEMENt_ID.includes(loginUser)) {
      if (e.target.value < 9 || e.target.value > 10) {
        setTextError3(true);
        setIndError3(ind);
        setIsSubmit(true);
        setTextError3HighPotential({
          ...textError3HighPotential,
          [ind]: true,
        });
      } else {
        setIsSubmit(false);
        setTextError1(false);
        setIndError1();
        setTextError3HighPotential({
          ...textError3HighPotential,
          [ind]: false,
        });
        setTextError2(false);
        setIndError2();
        setTextError3(false);
        setIndError3();
      }

      if (e.target.value === "0" || e.target.value === undefined) {
        setTextError3HighPotential({
          ...textError3HighPotential,
          [ind]: false,
        });

        setTextError3(false);
      }

      if (e.target.value && e.target.value > 0) {
        setIsDisable({
          LowPotential: true,
          GoodPotential: true,
          HighPotential: false,
        });
      } else {
        setIsDisable({
          LowPotential: false,
          GoodPotential: false,
          HighPotential: false,
        });
      }
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
      if (ind === 11) {
        setMaturityhp(e.target.value);
        setHighPotential({
          ...highPotential,
          maturityhp: e.target.value,
        });
      }
      if (ind === 12) {
        setApproachhp(e.target.value);
        setHighPotential({
          ...highPotential,
          approachhp: e.target.value,
        });
      }
      if (ind === 13) {
        setTeamworkhp(e.target.value);
        setHighPotential({
          ...highPotential,
          teamworkhp: e.target.value,
        });
      }
    } else {
      return console.error("error");
    }
  }

  //------------------------------------------------------------------//
  //values//
  //------------------------------------------------------------------//

  const lowPotentialValues = designation?.includes("Senior")
    ? [
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
        maturitylp,
        approachlp,
        teamworklp,
      ]
    : [
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

  const goodPotentialValues = designation.includes("Senior")
    ? [
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
        maturitygp,
        approachgp,
        teamworkgp,
      ]
    : [
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

  const highPotentialValues = designation.includes("Senior")
    ? [
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
        maturityhp,
        approachhp,
        teamworkhp,
      ]
    : [
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

  useEffect(() => {
    if (updatedBehaviourData.length > 0) {
      if (
        lowPotentialInputValues > 0 ||
        lowPotentialInputValues === undefined
      ) {
        setIsDisable({
          LowPotential: false,
          GoodPotential: true,
          HighPotential: true,
        });
      }
      if (
        goodPotentialInputValues > 0 ||
        goodPotentialInputValues === undefined
      ) {
        setIsDisable({
          LowPotential: true,
          GoodPotential: false,
          HighPotential: true,
        });
      }
      if (
        highPotentialInputValues > 0 ||
        highPotentialInputValues === undefined
      ) {
        setIsDisable({
          LowPotential: true,
          GoodPotential: true,
          HighPotential: false,
        });
      }
    }
  }, [
    lowPotentialInputValues,
    highPotentialInputValues,
    goodPotentialInputValues,
  ]);

  // if (
  //           ind === 0 &&
  //           updatedBehaviourData[0]?.LowPotential &&
  //           updatedBehaviourData[0]?.LowPotential > 0
  // ) {
  //           setIsDisable({
  //                     LowPotential: false,
  //                     GoodPotential: true,
  //                     HighPotential: true,
  //           });
  // }

  useEffect(() => {
    const calculatedValues = {
      totalAttendence:
        Number(attendencelp) + Number(attendencegp) + Number(attendencehp),

      totalDependablity:
        Number(lessDDependabilitylp) +
        Number(lessDDependabilitygp) +
        Number(lessDDependabilityhp),

      tatalGroupWorking:
        Number(groupWorkinglp) +
        Number(groupWorkinggp) +
        Number(groupWorkinghp),

      totalPositiveAttitude:
        Number(positiveAttitudelp) +
        Number(positiveAttitudegp) +
        Number(positiveAttitudehp),

      totalInteligence:
        Number(intelligencelp) +
        Number(intelligencegp) +
        Number(intelligencehp),

      totalImagination:
        Number(imaginationlp) + Number(imaginationgp) + Number(imaginationhp),

      totalImprovement:
        Number(improvementlp) + Number(improvementgp) + Number(improvementhp),

      totalDiscipline:
        Number(disciplinelp) + Number(disciplinegp) + Number(disciplinehp),

      totalQuality: Number(qualitylp) + Number(qualitygp) + Number(qualityhp),

      totalRespnsibility:
        Number(responsibilitylp) +
        Number(responsibilitygp) +
        Number(responsibilityhp),

      totalMultiSkill:
        Number(multiSkillslp) + Number(multiSkillsgp) + Number(multiSkillshp),

      totalMaturity:
        Number(maturitylp) + Number(maturitygp) + Number(maturityhp),
      totalApproach:
        Number(approachlp) + Number(approachgp) + Number(approachhp),
      totalTeamwork:
        Number(teamworklp) + Number(teamworkgp) + Number(teamworkhp),
    };
    const totalMarks = designation.includes("Senior")
      ? [
          calculatedValues.totalAttendence,
          calculatedValues.totalDependablity,
          calculatedValues.tatalGroupWorking,
          calculatedValues.totalPositiveAttitude,
          calculatedValues.totalInteligence,
          calculatedValues.totalImagination,
          calculatedValues.totalImprovement,
          calculatedValues.totalDiscipline,
          calculatedValues.totalQuality,
          calculatedValues.totalRespnsibility,
          calculatedValues.totalMultiSkill,
          calculatedValues.totalMaturity,
          calculatedValues.totalApproach,
          calculatedValues.totalTeamwork,
        ]
      : [
          calculatedValues.totalAttendence,
          calculatedValues.totalDependablity,
          calculatedValues.tatalGroupWorking,
          calculatedValues.totalPositiveAttitude,
          calculatedValues.totalInteligence,
          calculatedValues.totalImagination,
          calculatedValues.totalImprovement,
          calculatedValues.totalDiscipline,
          calculatedValues.totalQuality,
          calculatedValues.totalRespnsibility,
          calculatedValues.totalMultiSkill,
          0,
          0,
          0,
        ];

    const calculatedMarks = totalMarks[ind] !== undefined ? totalMarks[ind] : 0;

    setRowTotal((marks) => ({
      ...marks,
      [ind]: calculatedMarks,
    }));
  }, [lowPotential, highPotential, goodPotential]);

  return (
    <>
      {/* The field must be required less than or equal to 5 */}
      <tr style={{ textAlign: "center" }}>
        <td style={{ fontSize: "14px" }}>{val.B}</td>
        <td
          style={{
            position: "relative",
            // height: "60px",
            lineHeight: "16px",
          }}
        >
          <TextField
            error={textError1}
            helperText={indError1 === ind ? "error" : ""}
            color=""
            InputProps={{
              inputProps: {
                max: 5,
                min: 0,
              },
            }}
            type="number"
            value={lowPotentialInputValues}
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : MANAGEMENt_ID.includes(loginUser)
                ? isDisable.LowPotential
                : true
            }
            onChange={(e) => handleOnChange1(e)}
            style={{
              outline: "0",
              height: " 100%",
              width: "100%",
              position: " relative",
              top: " 0",
              left: "0",
              border: " none",
              backgroundColor: "white",
            }}
          />
        </td>
        <td
          style={{
            position: "relative",
            // height: "60px",
          }}
        >
          <TextField
            error={textError2}
            helperText={indError2 === ind ? "error" : ""}
            type="number"
            InputProps={{
              inputProps: {
                max: 8,
                min: 6,
              },
            }}
            value={goodPotentialInputValues}
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : MANAGEMENt_ID.includes(loginUser)
                ? isDisable.GoodPotential
                : true
            }
            onChange={(e) => handleOnChange2(e)}
            style={{
              outline: "0",
              height: " 100%",
              width: "100%",
              position: " relative",
              top: " 0",
              left: "0",
              border: "none",
              backgroundColor: "white",
            }}
          />
        </td>
        <td
          style={{
            position: "relative",
            // height: "60px",
          }}
        >
          <TextField
            error={textError3}
            helperText={indError3 === ind ? "error" : ""}
            InputProps={{
              inputProps: {
                max: 10,
                min: 9,
              },
            }}
            type="number"
            value={highPotentialInputValues}
            onChange={(e) => handleOnChange3(e)}
            disabled={
              isThreeMonths || selectedThreeMonths
                ? true
                : MANAGEMENt_ID.includes(loginUser)
                ? isDisable.HighPotential
                : true
            }
            style={{
              outline: "0",
              height: " 100%",
              width: "100%",
              position: " relative",
              top: " 0",
              left: "0",
              border: "none",
              backgroundColor: "white",
            }}
          />
        </td>
        <td
          style={{
            position: "relative",
            // height: "60px",
          }}
        >
          <input
            disabled={true}
            type="number"
            value={rowTotal[ind]}
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

const Tableviewnew = ({
  fileData,
  TaskwiseMarks,
  email,
  handleexceldropdown,
  selectedThreeMonths,
  isThreeMonths,
}) => {
  const [loader, setLoader] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [userfeedback, setUserfeedback] = useState({});
  const [appraiseMarksAvg, setAppraiseMarksAvg] = useState({});
  const [appraiserAvg, setAppraiserAvg] = useState({});

  const [updatedBehaviourData, setUpdatedBehaviourData] = useState({});
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
  const emails = useEmailExtractor();

  useEffect(() => {
    setusers(emails);
  }, [emails]);

  let firstTable = fileData.slice(0, 4);
  let secondTable = fileData.slice(4, 5);
  let thirdTable = fileData.slice(6, 14);
  let forthTable = fileData.slice(17, 31);
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
  const [disableText, setDisableText] = useState(true);

  useEffect(() => {
    setState(dataAgree[0]?.Userfeedback ? dataAgree[0]?.Userfeedback : "");
  }, [dataAgree]);

  // useEffect(()=>{

  //   if(isThreeMonths !== undefined && selectedThreeMonths !== undefined){
  //     setFilterDate(isThreeMonths)
  //     setCustomDate(selectedThreeMonths)
  //   }

  // },[selectedThreeMonths,isThreeMonths])

  //------------------------------------------------------------------//
  //feedback//
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
  //scope of improvement//
  //------------------------------------------------------------------//
  const handleScope = (e) => {
    let currentDate = new Date();
    let dateTime1 = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
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
      url: `http://localhost:8080/kpi/behavioural/data`,
      method: "POST",
      headers: headersList,
      data: data,
    };
    let resData = await axios.request(reqOptions);
    return setUpdatedBehaviourData(resData.data.data);
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

        critical: updatedData?.data?.data[5]?.Target,
      });
    }
  }, [updatedData]);

  const [parentTarget, setParentTarget] = useState({});
  const [parentAppraise, setParentAppraise] = useState({});
  const [parentSelfAppraise, setParentSelfAppraise] = useState({});
  const [parentReviewerMarks, setParentReviewerMarks] = useState({});

  //------------------------------------------------------------------//
  //Behavioural KPI Table//
  //------------------------------------------------------------------//

  useEffect(() => {
    if (designation.includes("Senior")) {
      if (updatedBehaviourData && updatedBehaviourData.length > 0) {
        setLowPotential({
          attendencelp: updatedBehaviourData[0]?.LowPotential,
          lessDDependabilitylp: updatedBehaviourData[1]?.LowPotential,
          groupWorkinglp: updatedBehaviourData[2]?.LowPotential,
          positiveAttitudelp: updatedBehaviourData[3]?.LowPotential,
          intelligencelp: updatedBehaviourData[4]?.LowPotential,
          imaginationlp: updatedBehaviourData[5]?.LowPotential,
          improvementlp: updatedBehaviourData[6]?.LowPotential,
          disciplinelp: updatedBehaviourData[7]?.LowPotential,
          qualitylp: updatedBehaviourData[8]?.LowPotential,
          responsibilitylp: updatedBehaviourData[9]?.LowPotential,
          multiSkillslp: updatedBehaviourData[10]?.LowPotential,
          maturitylp: updatedBehaviourData[11]?.LowPotential,
          approachlp: updatedBehaviourData[12]?.LowPotential,
          teamworklp: updatedBehaviourData[13]?.LowPotential,
        });
        setGoodPotential({
          attendencegp: updatedBehaviourData[0]?.GoodPotential,
          lessDDependabilitygp: updatedBehaviourData[1]?.GoodPotential,
          groupWorkinggp: updatedBehaviourData[2]?.GoodPotential,
          positiveAttitudegp: updatedBehaviourData[3]?.GoodPotential,
          intelligencegp: updatedBehaviourData[4]?.GoodPotential,
          imaginationgp: updatedBehaviourData[5]?.GoodPotential,
          improvementgp: updatedBehaviourData[6]?.GoodPotential,
          disciplinegp: updatedBehaviourData[7]?.GoodPotential,
          qualitygp: updatedBehaviourData[8]?.GoodPotential,
          responsibilitygp: updatedBehaviourData[9]?.GoodPotential,
          multiSkillsgp: updatedBehaviourData[10]?.GoodPotential,
          maturitygp: updatedBehaviourData[11]?.GoodPotential,
          approachgp: updatedBehaviourData[12]?.GoodPotential,
          teamworkgp: updatedBehaviourData[13]?.GoodPotential,
        });
        setHighPotential({
          attendencehp: updatedBehaviourData[0]?.HighPotential,
          lessDDependabilityhp: updatedBehaviourData[1]?.HighPotential,
          groupWorkinghp: updatedBehaviourData[2]?.HighPotential,
          positiveAttitudehp: updatedBehaviourData[3]?.HighPotential,
          intelligencehp: updatedBehaviourData[4]?.HighPotential,
          imaginationhp: updatedBehaviourData[5]?.HighPotential,
          improvementhp: updatedBehaviourData[6]?.HighPotential,
          disciplinehp: updatedBehaviourData[7]?.HighPotential,
          qualityhp: updatedBehaviourData[8]?.HighPotential,
          responsibilityhp: updatedBehaviourData[9]?.HighPotential,
          multiSkillshp: updatedBehaviourData[10]?.HighPotential,
          maturityhp: updatedBehaviourData[11]?.HighPotential,
          approachhp: updatedBehaviourData[12]?.HighPotential,
          teamworkhp: updatedBehaviourData[13]?.HighPotential,
        });
      }
    } else {
      if (updatedBehaviourData && updatedBehaviourData.length > 0) {
        setLowPotential({
          attendencelp: updatedBehaviourData[0]?.LowPotential,
          lessDDependabilitylp: updatedBehaviourData[1]?.LowPotential,
          groupWorkinglp: updatedBehaviourData[2]?.LowPotential,
          positiveAttitudelp: updatedBehaviourData[3]?.LowPotential,
          intelligencelp: updatedBehaviourData[4]?.LowPotential,
          imaginationlp: updatedBehaviourData[5]?.LowPotential,
          improvementlp: updatedBehaviourData[6]?.LowPotential,
          disciplinelp: updatedBehaviourData[7]?.LowPotential,
          qualitylp: updatedBehaviourData[8]?.LowPotential,
          responsibilitylp: updatedBehaviourData[9]?.LowPotential,
          multiSkillslp: updatedBehaviourData[10]?.LowPotential,
        });
        setGoodPotential({
          attendencegp: updatedBehaviourData[0]?.GoodPotential,
          lessDDependabilitygp: updatedBehaviourData[1]?.GoodPotential,
          groupWorkinggp: updatedBehaviourData[2]?.GoodPotential,
          positiveAttitudegp: updatedBehaviourData[3]?.GoodPotential,
          intelligencegp: updatedBehaviourData[4]?.GoodPotential,
          imaginationgp: updatedBehaviourData[5]?.GoodPotential,
          improvementgp: updatedBehaviourData[6]?.GoodPotential,
          disciplinegp: updatedBehaviourData[7]?.GoodPotential,
          qualitygp: updatedBehaviourData[8]?.GoodPotential,
          responsibilitygp: updatedBehaviourData[9]?.GoodPotential,
          multiSkillsgp: updatedBehaviourData[10]?.GoodPotential,
        });
        setHighPotential({
          attendencehp: updatedBehaviourData[0]?.HighPotential,
          lessDDependabilityhp: updatedBehaviourData[1]?.HighPotential,
          groupWorkinghp: updatedBehaviourData[2]?.HighPotential,
          positiveAttitudehp: updatedBehaviourData[3]?.HighPotential,
          intelligencehp: updatedBehaviourData[4]?.HighPotential,
          imaginationhp: updatedBehaviourData[5]?.HighPotential,
          improvementhp: updatedBehaviourData[6]?.HighPotential,
          disciplinehp: updatedBehaviourData[7]?.HighPotential,
          qualityhp: updatedBehaviourData[8]?.HighPotential,
          responsibilityhp: updatedBehaviourData[9]?.HighPotential,
          multiSkillshp: updatedBehaviourData[10]?.HighPotential,
        });
      }
    }
  }, [updatedBehaviourData]);

  const [lowPotential, setLowPotential] = useState({});
  const [goodPotential, setGoodPotential] = useState({});
  const [highPotential, setHighPotential] = useState({});
  const [rowTotal, setRowTotal] = useState({});
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalAppraiseAvg, setFinalAppraiseAvg] = useState(0);
  const [finalAppraiserAvg, setFinalAppraiserAvg] = useState(0);

  function checkArr() {
    const rawTotalArr = Object.values(rowTotal);
    if (rawTotalArr !== null && rawTotalArr.length !== 0) {
      const total = rawTotalArr?.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      if (designation.includes("Senior")) {
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

  async function KpiMarks() {
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
    userfeedback.IsEditable = 1;

    let allFeedbackData = [feedback];
    let allScopeData = [scope];
    let allUserfeedback = [userfeedback];

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
        ReviewerMarks: 0,
        UpdatedDate: "",
        IsEditable: 1,
        ToDate: "",
        FromDate: "",
        ShowDevOpsData: 0,
      };
      switch (ind) {
        case (ind = 0):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.Target = parentTarget?.actualDelivery
            ? parentTarget?.actualDelivery
            : 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customActualdeliveryMarks || 0;
          allData.AppraiserRating =
            parentAppraise?.customActualdeliveryMarksAr || 0;
          allData.ReviewerMarks =
            parentReviewerMarks?.customActualdeliveryMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        case (ind = 1):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.Target = parentTarget?.onTime ? parentTarget?.onTime : 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customOnTimeMarks || 0;
          allData.AppraiserRating = parentAppraise?.customOnTimeMarksAr || 0;
          allData.ReviewerMarks = parentReviewerMarks?.customOnTimeMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        case (ind = 2):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customAvgCodeMarks || 0;
          allData.AppraiserRating = parentAppraise?.customAvgCodeMarksAr || 0;
          allData.ReviewerMarks =
            parentReviewerMarks?.customAvgCodeMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        case (ind = 3):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customReDoMarks || 0;
          allData.AppraiserRating = parentAppraise?.customReDoMarksAr || 0;
          allData.ReviewerMarks = parentReviewerMarks?.customReDoMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        case (ind = 4):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customBugsReportedMarks || 0;
          allData.AppraiserRating =
            parentAppraise?.customBugsReportedMarksAr || 0;
          allData.ReviewerMarks =
            parentReviewerMarks?.customBugsReportedMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        case (ind = 5):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.Target = parentTarget?.critical ? parentTarget?.critical : 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customCriticalIssuesMarks || 0;
          allData.AppraiserRating =
            parentAppraise?.customCriticalIssuesMarksAr || 0;
          allData.ReviewerMarks =
            parentReviewerMarks?.customCriticalIssuesMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        case (ind = 6):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customCustomerSatisfactionMarks || 0;
          allData.AppraiserRating =
            parentAppraise?.customCustomerSatisfactionMarksAr || 0;
          allData.ReviewerMarks =
            parentReviewerMarks?.customCustomerSatisfactionMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        case (ind = 7):
          allData.KpiTitle = val.C || "";
          allData.KpiDescription = val.D || "";
          allData.Category = val.B || "";
          allData.Type = val.F || "";
          allData.ToUserId = email || "";
          allData.FromUserId = loginUser || "";
          allData.Weightage = val.H || 0;
          allData.AppraiseeSelfRating =
            parentSelfAppraise?.customUpskillingMarks || 0;
          allData.AppraiserRating =
            parentAppraise?.customUpskillingMarksAr || 0;
          allData.ReviewerMarks =
            parentReviewerMarks?.customUpskillingMarksRM || 0;
          allData.UpdatedDate = dateTime1 || "";
          allData.IsEditable = 1;
          allData.ToDate = fileData[0].E || "";
          allData.FromDate = fileData[1].E || "";
          return allFinalData.push(allData);
        default:
          return allFinalData;
      }
    });
    forthTable.map((val, ind) => {
      let allBehaviourKpiDatamap = {
        BehaviouralKPIs: "",
        LowPotential: "",
        GoodPotential: "",
        HighPotential: "",
        ToUserId: "",
        FromUserId: "",
        ToDate: "",
        FromDate: "",
        UpdatedDate: "",
      };

      switch (ind) {
        case (ind = 0):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential = lowPotential?.attendencelp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.attendencegp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.attendencehp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 1):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.lessDDependabilitylp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.lessDDependabilitygp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.lessDDependabilityhp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 2):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.groupWorkinglp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.groupWorkinggp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.groupWorkinghp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 3):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.positiveAttitudelp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.positiveAttitudegp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.positiveAttitudehp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 4):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.intelligencelp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.intelligencegp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.intelligencehp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 5):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.imaginationlp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.imaginationgp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.imaginationhp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 6):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.improvementlp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.improvementgp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.improvementhp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 7):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential = lowPotential?.disciplinelp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.disciplinegp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.attendencehp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 8):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential = lowPotential?.qualitylp || 0;
          allBehaviourKpiDatamap.GoodPotential = goodPotential?.qualitygp || 0;
          allBehaviourKpiDatamap.HighPotential = highPotential?.qualityhp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 9):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.responsibilitylp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.responsibilitygp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.responsibilityhp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);

        case (ind = 10):
          allBehaviourKpiDatamap.BehaviouralKPIs = val.B || "";
          allBehaviourKpiDatamap.LowPotential =
            lowPotential?.multiSkillslp || 0;
          allBehaviourKpiDatamap.GoodPotential =
            goodPotential?.multiSkillsgp || 0;
          allBehaviourKpiDatamap.HighPotential =
            highPotential?.multiSkillshp || 0;
          allBehaviourKpiDatamap.ToUserId = email || "";
          allBehaviourKpiDatamap.FromUserId = loginUser || "";
          allBehaviourKpiDatamap.ToDate = fileData[0].E || "";
          allBehaviourKpiDatamap.FromDate = fileData[1].E || "";
          allBehaviourKpiDatamap.UpdatedDate = dateTime1 || "";
          return allBehaviourKpiData.push(allBehaviourKpiDatamap);
        default:
          return allBehaviourKpiData;
      }
    });

    let data = axios({
      method: "post",
      url: `http://localhost:8080/kpi/marks`,
      data: allFinalData,
      headers: { Accept: "application/json" },
    });
    let bData = axios({
      method: "post",
      url: `http://localhost:8080/kpi/behavioural`,
      data: allBehaviourKpiData,
      headers: { Accept: "application/json" },
    });
    let pData = axios({
      method: "post",
      url: `http://localhost:8080/kpi/positivepoint`,
      data: allFeedbackData,
      headers: { Accept: "application/json" },
    });

    let sData = axios({
      method: "post",
      url: `http://localhost:8080/kpi/scopeofimprovement`,
      data: allScopeData,
      headers: { Accept: "application/json" },
    });

    // if (state !== undefined && state.length > 0) {
    let uData = axios({
      method: "post",
      url: `http://localhost:8080/kpi/userfeedback`,
      data: allUserfeedback,
      headers: { Accept: "application/json" },
    });
    // }

    setTimeout(() => {
      window.location.reload(false);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }, 1000);
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
    if (users === loginUser) {
      if (selectedThreeMonths || isThreeMonths) {
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
  }
  function yesText() {
    setIsSubmit(false);
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



  function isButtonShouldDisable(){
    const values = [
      ...Object.values(textError1),
      ...Object.values(textError2),
      ...Object.values(textError3),
      ...Object.values(textError1LowPotential),
      ...Object.values(textError2GoodPotential),
      ...Object.values(textError3HighPotential),

    ]
    return values.includes(true);
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

            {updatedData?.data?.data[0]?.ShowDevOpsData === 1 ||
            updatedData?.data?.data[0]?.ShowDevOpsData === undefined
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
                        setIsSubmit={setIsSubmit}
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
                      />
                    </>
                  );
                })
              : updatedData?.data?.data?.map((val, ind) => {
                  return (
                    <>
                      <RenderTestTable
                        ind={ind}
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
                      />
                    </>
                  );
                })}
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
                  <Renderforthtable
                    key={index}
                    val={val}
                    ind={index}
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
                background: "lightgrey",
                position: "relative",
                height: "9rem",
                display: "flex",
                border: "none",
              }}
            >
              <textarea
                disabled={conditionTables()}
                type="text"
                placeholder="positive point should fill quaterly by manager"
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
                background: "lightgrey",
                position: "relative",
                height: "9rem",
                display: "flex",
                border: "none",
              }}
            >
              <textarea
                type="text"
                disabled={conditionTables()}
                placeholder="scope of improvement should fill quaterly by manager"
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
                background: "lightgrey",
                position: "relative",
                height: "9rem",
                display: "flex",
                border: "none",
              }}
            >
              <textarea
                disabled={disableText}
                type="text"
                placeholder="Press No buttton and enter your msg if you are not agree with this feedback"
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
                value={state}
                onChange={(e) => handleAgree(e)}
              />
            </td>
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

              {/* <div>
                                                                                <ModalFeedback
                                                                                          // setState={
                                                                                          //           setState
                                                                                          // }
                                                                                          // disabled={conditionUserFeddback()}
                                                                                />
                                                                      </div> */}
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
