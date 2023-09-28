import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

import { ACCESS_TOKEN } from "../../Config/Constant";
import { MANAGEMENt_ID } from "../../Config/ManagementEmail";

const Renderforthtable = ({
  val,
  ind,
  setIsSubmit,
  selectedThreeMonths,
  isThreeMonths,
  // lowPotential,
  // setLowPotential,
  // goodPotential,
  // setGoodPotential,
  // highPotential,
  // setHighPotential,
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
  quarterlyBehavioural,
  behviouralDivision,
  avgQuaterlyData,
  division,
  updatedData,
  forthTable,
  dynamicLowpotential,
  dynamicGoodpotential,
  dynamicHighpotential,
  setDynamicLowPotential,
  setDynamicGoodPotential,
  setDynamicHighPotential,
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

  // const [attendencelp, setAttendencelp] = useState(0);
  // const [lessDDependabilitylp, setLessDDependabilitylp] = useState(0);
  // const [groupWorkinglp, setGroupWorkinglp] = useState(0);
  // const [positiveAttitudelp, setPositiveAttitudelp] = useState(0);
  // const [intelligencelp, setIntelligencelp] = useState(0);
  // const [imaginationlp, setImaginationlp] = useState(0);
  // const [improvementlp, setImprovementlp] = useState(0);
  // const [disciplinelp, setDisciplinelp] = useState(0);
  // const [qualitylp, setQualitylp] = useState(0);
  // const [responsibilitylp, setResponsibilitylp] = useState(0);
  // const [multiSkillslp, setMultiSkillslp] = useState(0);
  // const [maturitylp, setMaturitylp] = useState(0);
  // const [approachlp, setApproachlp] = useState(0);
  // const [teamworklp, setTeamworklp] = useState(0);

  //------------------------------------------------------------------//
  //Good potential states//
  //------------------------------------------------------------------//

  // const [attendencegp, setAttendencegp] = useState(0);
  // const [lessDDependabilitygp, setLessDDependabilitygp] = useState(0);
  // const [groupWorkinggp, setGroupWorkinggp] = useState(0);
  // const [positiveAttitudegp, setPositiveAttitudegp] = useState(0);
  // const [intelligencegp, setIntelligencegp] = useState(0);
  // const [imaginationgp, setImaginationgp] = useState(0);
  // const [improvementgp, setImprovementgp] = useState(0);
  // const [disciplinegp, setDisciplinegp] = useState(0);
  // const [qualitygp, setQualitygp] = useState(0);
  // const [responsibilitygp, setResponsibilitygp] = useState(0);
  // const [multiSkillsgp, setMultiSkillsgp] = useState(0);
  // const [maturitygp, setMaturitygp] = useState(0);
  // const [approachgp, setApproachgp] = useState(0);
  // const [teamworkgp, setTeamworkgp] = useState(0);

  //------------------------------------------------------------------//
  //High potential states//
  //------------------------------------------------------------------//

  // const [attendencehp, setAttendencehp] = useState(0);
  // const [lessDDependabilityhp, setLessDDependabilityhp] = useState(0);
  // const [groupWorkinghp, setGroupWorkinghp] = useState(0);
  // const [positiveAttitudehp, setPositiveAttitudehp] = useState(0);
  // const [intelligencehp, setIntelligencehp] = useState(0);
  // const [imaginationhp, setImaginationhp] = useState(0);
  // const [improvementhp, setImprovementhp] = useState(0);
  // const [disciplinehp, setDisciplinehp] = useState(0);
  // const [qualityhp, setQualityhp] = useState(0);
  // const [responsibilityhp, setResponsibilityhp] = useState(0);
  // const [multiSkillshp, setMultiSkillshp] = useState(0);
  // const [maturityhp, setMaturityhp] = useState(0);
  // const [approachhp, setApproachhp] = useState(0);
  // const [teamworkhp, setTeamworkhp] = useState(0);

  //.................this states use for input validations...............//
  // const [overallTotal, setOverallTotal] = useState(0);
  const [textError1, setTextError1] = useState(false);
  const [indError1, setIndError1] = useState();
  const [textError2, setTextError2] = useState(false);
  const [indError2, setIndError2] = useState();
  const [textError3, setTextError3] = useState(false);
  const [indError3, setIndError3] = useState();

  const localStartDate = localStorage.getItem("startDate");
  const localEndDate = localStorage.getItem("endDate");

  const date1 = new Date(localStartDate);
  const date2 = new Date(localEndDate);

  const diffInMonths =
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    (date2.getMonth() - date1.getMonth());

  let newwDiffMonthhs = diffInMonths + 1;
  //------------------------------------------------------------------//
  //useEffect for the intital value which will set in table//
  //------------------------------------------------------------------//

  // useEffect(() => {
  //   //=============lowpotential states================//

  //   if (updatedBehaviourData.length === undefined) {
  //     setAttendencelp(
  //       quarterlyBehavioural?.LowPotential[0]
  //         ? quarterlyBehavioural?.LowPotential[0]
  //         : 0
  //     );
  //     setLessDDependabilitylp(
  //       quarterlyBehavioural?.LowPotential[1]
  //         ? quarterlyBehavioural?.LowPotential[1]
  //         : 0
  //     );
  //     setGroupWorkinglp(
  //       quarterlyBehavioural?.LowPotential[2]
  //         ? quarterlyBehavioural?.LowPotential[2]
  //         : 0
  //     );
  //     setPositiveAttitudelp(
  //       quarterlyBehavioural?.LowPotential[3]
  //         ? quarterlyBehavioural?.LowPotential[3]
  //         : 0
  //     );
  //     setIntelligencelp(
  //       quarterlyBehavioural?.LowPotential[4]
  //         ? quarterlyBehavioural?.LowPotential[4]
  //         : 0
  //     );
  //     setImaginationlp(
  //       quarterlyBehavioural?.LowPotential[5]
  //         ? quarterlyBehavioural?.LowPotential[5]
  //         : 0
  //     );
  //     setImprovementlp(
  //       quarterlyBehavioural?.LowPotential[6]
  //         ? quarterlyBehavioural?.LowPotential[6]
  //         : 0
  //     );
  //     setDisciplinelp(
  //       quarterlyBehavioural?.LowPotential[7]
  //         ? quarterlyBehavioural?.LowPotential[7]
  //         : 0
  //     );
  //     setQualitylp(
  //       quarterlyBehavioural?.LowPotential[8]
  //         ? quarterlyBehavioural?.LowPotential[8]
  //         : 0
  //     );
  //     setResponsibilitylp(
  //       quarterlyBehavioural?.LowPotential[9]
  //         ? quarterlyBehavioural?.LowPotential[9]
  //         : 0
  //     );
  //     setMultiSkillslp(
  //       quarterlyBehavioural?.LowPotential[10]
  //         ? quarterlyBehavioural?.LowPotential[10]
  //         : 0
  //     );
  //     setMaturitylp(
  //       quarterlyBehavioural?.LowPotential[11]
  //         ? quarterlyBehavioural?.LowPotential[11]
  //         : 0
  //     );
  //     setApproachlp(
  //       quarterlyBehavioural?.LowPotential[12]
  //         ? quarterlyBehavioural?.LowPotential[12]
  //         : 0
  //     );
  //     setTeamworklp(
  //       quarterlyBehavioural?.LowPotential[13]
  //         ? quarterlyBehavioural?.LowPotential[13]
  //         : 0
  //     );

  //     //=============goodpotential states================//
  //     setAttendencegp(
  //       quarterlyBehavioural?.GoodPotential[0]
  //         ? quarterlyBehavioural?.GoodPotential[0]
  //         : 0
  //     );
  //     setLessDDependabilitygp(
  //       quarterlyBehavioural?.GoodPotential[1]
  //         ? quarterlyBehavioural?.GoodPotential[1]
  //         : 0
  //     );
  //     setGroupWorkinggp(
  //       quarterlyBehavioural?.GoodPotential[2]
  //         ? quarterlyBehavioural?.GoodPotential[2]
  //         : 0
  //     );
  //     setPositiveAttitudegp(
  //       quarterlyBehavioural?.GoodPotential[3]
  //         ? quarterlyBehavioural?.GoodPotential[3]
  //         : 0
  //     );
  //     setIntelligencegp(
  //       quarterlyBehavioural?.GoodPotential[4]
  //         ? quarterlyBehavioural?.GoodPotential[4]
  //         : 0
  //     );
  //     setImaginationgp(
  //       quarterlyBehavioural?.GoodPotential[5]
  //         ? quarterlyBehavioural?.GoodPotential[5]
  //         : 0
  //     );
  //     setImprovementgp(
  //       quarterlyBehavioural?.GoodPotential[6]
  //         ? quarterlyBehavioural?.GoodPotential[6]
  //         : 0
  //     );
  //     setDisciplinegp(
  //       quarterlyBehavioural?.GoodPotential[7]
  //         ? quarterlyBehavioural?.GoodPotential[7]
  //         : 0
  //     );
  //     setQualitygp(
  //       quarterlyBehavioural?.GoodPotential[8]
  //         ? quarterlyBehavioural?.GoodPotential[8]
  //         : 0
  //     );
  //     setResponsibilitygp(
  //       quarterlyBehavioural?.GoodPotential[9]
  //         ? quarterlyBehavioural?.GoodPotential[9]
  //         : 0
  //     );
  //     setMultiSkillsgp(
  //       quarterlyBehavioural?.GoodPotential[10]
  //         ? quarterlyBehavioural?.GoodPotential[10]
  //         : 0
  //     );
  //     setMaturitygp(
  //       quarterlyBehavioural?.GoodPotential[11]
  //         ? quarterlyBehavioural?.GoodPotential[11]
  //         : 0
  //     );
  //     setApproachgp(
  //       quarterlyBehavioural?.GoodPotential[12]
  //         ? quarterlyBehavioural?.GoodPotential[12]
  //         : 0
  //     );
  //     setTeamworkgp(
  //       quarterlyBehavioural?.GoodPotential[13]
  //         ? quarterlyBehavioural?.GoodPotential[13]
  //         : 0
  //     );

  //     //=============highpotential states================//
  //     setAttendencehp(
  //       quarterlyBehavioural?.HighPotential[0]
  //         ? quarterlyBehavioural?.HighPotential[0]
  //         : 0
  //     );
  //     setLessDDependabilityhp(
  //       quarterlyBehavioural?.HighPotential[1]
  //         ? quarterlyBehavioural?.HighPotential[1]
  //         : 0
  //     );
  //     setGroupWorkinghp(
  //       quarterlyBehavioural?.HighPotential[2]
  //         ? quarterlyBehavioural?.HighPotential[2]
  //         : 0
  //     );
  //     setPositiveAttitudehp(
  //       quarterlyBehavioural?.HighPotential[3]
  //         ? quarterlyBehavioural?.HighPotential[3]
  //         : 0
  //     );
  //     setIntelligencehp(
  //       quarterlyBehavioural?.HighPotential[4]
  //         ? quarterlyBehavioural?.HighPotential[4]
  //         : 0
  //     );
  //     setImaginationhp(
  //       quarterlyBehavioural?.HighPotential[5]
  //         ? quarterlyBehavioural?.HighPotential[5]
  //         : 0
  //     );
  //     setImprovementhp(
  //       quarterlyBehavioural?.HighPotential[6]
  //         ? quarterlyBehavioural?.HighPotential[6]
  //         : 0
  //     );
  //     setDisciplinehp(
  //       quarterlyBehavioural?.HighPotential[7]
  //         ? quarterlyBehavioural?.HighPotential[7]
  //         : 0
  //     );
  //     setQualityhp(
  //       quarterlyBehavioural?.HighPotential[8]
  //         ? quarterlyBehavioural?.HighPotential[8]
  //         : 0
  //     );
  //     setResponsibilityhp(
  //       quarterlyBehavioural?.HighPotential[9]
  //         ? quarterlyBehavioural?.HighPotential[9]
  //         : 0
  //     );
  //     setMultiSkillshp(
  //       quarterlyBehavioural?.HighPotential[10]
  //         ? quarterlyBehavioural?.HighPotential[10]
  //         : 0
  //     );
  //     setMaturityhp(
  //       quarterlyBehavioural?.HighPotential[11]
  //         ? quarterlyBehavioural?.HighPotential[11]
  //         : 0
  //     );
  //     setApproachhp(
  //       quarterlyBehavioural?.HighPotential[12]
  //         ? quarterlyBehavioural?.HighPotential[12]
  //         : 0
  //     );
  //     setTeamworkhp(
  //       quarterlyBehavioural?.HighPotential[13]
  //         ? quarterlyBehavioural?.HighPotential[13]
  //         : 0
  //     );
  //   } else {
  //     setAttendencelp(
  //       updatedBehaviourData[0]?.LowPotential
  //         ? updatedBehaviourData[0]?.LowPotential
  //         : 0
  //     );
  //     setLessDDependabilitylp(
  //       updatedBehaviourData[1]?.LowPotential
  //         ? updatedBehaviourData[1]?.LowPotential
  //         : 0
  //     );
  //     setGroupWorkinglp(
  //       updatedBehaviourData[2]?.LowPotential
  //         ? updatedBehaviourData[2]?.LowPotential
  //         : 0
  //     );
  //     setPositiveAttitudelp(
  //       updatedBehaviourData[3]?.LowPotential
  //         ? updatedBehaviourData[3]?.LowPotential
  //         : 0
  //     );
  //     setIntelligencelp(
  //       updatedBehaviourData[4]?.LowPotential
  //         ? updatedBehaviourData[4]?.LowPotential
  //         : 0
  //     );
  //     setImaginationlp(
  //       updatedBehaviourData[5]?.LowPotential
  //         ? updatedBehaviourData[5]?.LowPotential
  //         : 0
  //     );
  //     setImprovementlp(
  //       updatedBehaviourData[6]?.LowPotential
  //         ? updatedBehaviourData[6]?.LowPotential
  //         : 0
  //     );
  //     setDisciplinelp(
  //       updatedBehaviourData[7]?.LowPotential
  //         ? updatedBehaviourData[7]?.LowPotential
  //         : 0
  //     );
  //     setQualitylp(
  //       updatedBehaviourData[8]?.LowPotential
  //         ? updatedBehaviourData[8]?.LowPotential
  //         : 0
  //     );
  //     setResponsibilitylp(
  //       updatedBehaviourData[9]?.LowPotential
  //         ? updatedBehaviourData[9]?.LowPotential
  //         : 0
  //     );
  //     setMultiSkillslp(
  //       updatedBehaviourData[10]?.LowPotential
  //         ? updatedBehaviourData[10]?.LowPotential
  //         : 0
  //     );
  //     setMaturitylp(
  //       updatedBehaviourData[11]?.LowPotential
  //         ? updatedBehaviourData[11]?.LowPotential
  //         : 0
  //     );
  //     setApproachlp(
  //       updatedBehaviourData[12]?.LowPotential
  //         ? updatedBehaviourData[12]?.LowPotential
  //         : 0
  //     );
  //     setTeamworklp(
  //       updatedBehaviourData[13]?.LowPotential
  //         ? updatedBehaviourData[13]?.LowPotential
  //         : 0
  //     );

  //     //=============goodpotential states================//
  //     setAttendencegp(
  //       updatedBehaviourData[0]?.GoodPotential
  //         ? updatedBehaviourData[0]?.GoodPotential
  //         : 0
  //     );
  //     setLessDDependabilitygp(
  //       updatedBehaviourData[1]?.GoodPotential
  //         ? updatedBehaviourData[1]?.GoodPotential
  //         : 0
  //     );
  //     setGroupWorkinggp(
  //       updatedBehaviourData[2]?.GoodPotential
  //         ? updatedBehaviourData[2]?.GoodPotential
  //         : 0
  //     );
  //     setPositiveAttitudegp(
  //       updatedBehaviourData[3]?.GoodPotential
  //         ? updatedBehaviourData[3]?.GoodPotential
  //         : 0
  //     );
  //     setIntelligencegp(
  //       updatedBehaviourData[4]?.GoodPotential
  //         ? updatedBehaviourData[4]?.GoodPotential
  //         : 0
  //     );
  //     setImaginationgp(
  //       updatedBehaviourData[5]?.GoodPotential
  //         ? updatedBehaviourData[5]?.GoodPotential
  //         : 0
  //     );
  //     setImprovementgp(
  //       updatedBehaviourData[6]?.GoodPotential
  //         ? updatedBehaviourData[6]?.GoodPotential
  //         : 0
  //     );
  //     setDisciplinegp(
  //       updatedBehaviourData[7]?.GoodPotential
  //         ? updatedBehaviourData[7]?.GoodPotential
  //         : 0
  //     );
  //     setQualitygp(
  //       updatedBehaviourData[8]?.GoodPotential
  //         ? updatedBehaviourData[8]?.GoodPotential
  //         : 0
  //     );
  //     setResponsibilitygp(
  //       updatedBehaviourData[9]?.GoodPotential
  //         ? updatedBehaviourData[9]?.GoodPotential
  //         : 0
  //     );
  //     setMultiSkillsgp(
  //       updatedBehaviourData[10]?.GoodPotential
  //         ? updatedBehaviourData[10]?.GoodPotential
  //         : 0
  //     );
  //     setMaturitygp(
  //       updatedBehaviourData[11]?.GoodPotential
  //         ? updatedBehaviourData[11]?.GoodPotential
  //         : 0
  //     );
  //     setApproachgp(
  //       updatedBehaviourData[12]?.GoodPotential
  //         ? updatedBehaviourData[12]?.GoodPotential
  //         : 0
  //     );
  //     setTeamworkgp(
  //       updatedBehaviourData[13]?.GoodPotential
  //         ? updatedBehaviourData[13]?.GoodPotential
  //         : 0
  //     );

  //     //=============highpotential states================//
  //     setAttendencehp(
  //       updatedBehaviourData[0]?.HighPotential
  //         ? updatedBehaviourData[0]?.HighPotential
  //         : 0
  //     );
  //     setLessDDependabilityhp(
  //       updatedBehaviourData[1]?.HighPotential
  //         ? updatedBehaviourData[1]?.HighPotential
  //         : 0
  //     );
  //     setGroupWorkinghp(
  //       updatedBehaviourData[2]?.HighPotential
  //         ? updatedBehaviourData[2]?.HighPotential
  //         : 0
  //     );
  //     setPositiveAttitudehp(
  //       updatedBehaviourData[3]?.HighPotential
  //         ? updatedBehaviourData[3]?.HighPotential
  //         : 0
  //     );
  //     setIntelligencehp(
  //       updatedBehaviourData[4]?.HighPotential
  //         ? updatedBehaviourData[4]?.HighPotential
  //         : 0
  //     );
  //     setImaginationhp(
  //       updatedBehaviourData[5]?.HighPotential
  //         ? updatedBehaviourData[5]?.HighPotential
  //         : 0
  //     );
  //     setImprovementhp(
  //       updatedBehaviourData[6]?.HighPotential
  //         ? updatedBehaviourData[6]?.HighPotential
  //         : 0
  //     );
  //     setDisciplinehp(
  //       updatedBehaviourData[7]?.HighPotential
  //         ? updatedBehaviourData[7]?.HighPotential
  //         : 0
  //     );
  //     setQualityhp(
  //       updatedBehaviourData[8]?.HighPotential
  //         ? updatedBehaviourData[8]?.HighPotential
  //         : 0
  //     );
  //     setResponsibilityhp(
  //       updatedBehaviourData[9]?.HighPotential
  //         ? updatedBehaviourData[9]?.HighPotential
  //         : 0
  //     );
  //     setMultiSkillshp(
  //       updatedBehaviourData[10]?.HighPotential
  //         ? updatedBehaviourData[10]?.HighPotential
  //         : 0
  //     );
  //     setMaturityhp(
  //       updatedBehaviourData[11]?.HighPotential
  //         ? updatedBehaviourData[11]?.HighPotential
  //         : 0
  //     );
  //     setApproachhp(
  //       updatedBehaviourData[12]?.HighPotential
  //         ? updatedBehaviourData[12]?.HighPotential
  //         : 0
  //     );
  //     setTeamworkhp(
  //       updatedBehaviourData[13]?.HighPotential
  //         ? updatedBehaviourData[13]?.HighPotential
  //         : 0
  //     );
  //   }
  // }, [updatedBehaviourData, quarterlyBehavioural]);

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

      if (
        e.target.value === "0" ||
        e.target.value === undefined ||
        e.target.value === ""
      ) {
        setTextError1LowPotential({
          ...textError1LowPotential,
          [ind]: false,
        });
        setIndError1();
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

      setDynamicLowPotential({
        ...dynamicLowpotential,
        [ind]: Number(e.target.value),
      });

      // if (ind === 0) {
      //   setAttendencelp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     attendencelp: e.target.value,
      //   });
      // }
      // if (ind === 1) {
      //   setLessDDependabilitylp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     lessDDependabilitylp: e.target.value,
      //   });
      // }
      // if (ind === 2) {
      //   setGroupWorkinglp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     groupWorkinglp: e.target.value,
      //   });
      // }
      // if (ind === 3) {
      //   setPositiveAttitudelp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     positiveAttitudelp: e.target.value,
      //   });
      // }
      // if (ind === 4) {
      //   setIntelligencelp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     intelligencelp: e.target.value,
      //   });
      // }
      // if (ind === 5) {
      //   setImaginationlp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     imaginationlp: e.target.value,
      //   });
      // }
      // if (ind === 6) {
      //   setImprovementlp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     improvementlp: e.target.value,
      //   });
      // }
      // if (ind === 7) {
      //   setDisciplinelp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     disciplinelp: e.target.value,
      //   });
      // }
      // if (ind === 8) {
      //   setQualitylp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     qualitylp: e.target.value,
      //   });
      // }
      // if (ind === 9) {
      //   setResponsibilitylp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     responsibilitylp: e.target.value,
      //   });
      // }
      // if (ind === 10) {
      //   setMultiSkillslp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     multiSkillslp: e.target.value,
      //   });
      // }
      // if (ind === 11) {
      //   setMaturitylp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     maturitylp: e.target.value,
      //   });
      // }
      // if (ind === 12) {
      //   setApproachlp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     approachlp: e.target.value,
      //   });
      // }
      // if (ind === 13) {
      //   setTeamworklp(e.target.value);
      //   setLowPotential({
      //     ...lowPotential,
      //     teamworklp: e.target.value,
      //   });
      // }
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

      if (
        e.target.value === "0" ||
        e.target.value === undefined ||
        e.target.value === ""
      ) {
        setTextError2GoodPotential({
          ...textError2GoodPotential,
          [ind]: false,
        });
        setIndError2();
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

      setDynamicGoodPotential({
        ...dynamicGoodpotential,
        [ind]: Number(e.target.value),
      });

      // if (ind === 0) {
      //   setAttendencegp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     attendencegp: e.target.value,
      //   });
      // }
      // if (ind === 1) {
      //   setLessDDependabilitygp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     lessDDependabilitygp: e.target.value,
      //   });
      // }
      // if (ind === 2) {
      //   setGroupWorkinggp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     groupWorkinggp: e.target.value,
      //   });
      // }
      // if (ind === 3) {
      //   setPositiveAttitudegp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     positiveAttitudegp: e.target.value,
      //   });
      // }
      // if (ind === 4) {
      //   setIntelligencegp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     intelligencegp: e.target.value,
      //   });
      // }
      // if (ind === 5) {
      //   setImaginationgp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     imaginationgp: e.target.value,
      //   });
      // }
      // if (ind === 6) {
      //   setImprovementgp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     improvementgp: e.target.value,
      //   });
      // }
      // if (ind === 7) {
      //   setDisciplinegp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     disciplinegp: e.target.value,
      //   });
      // }
      // if (ind === 8) {
      //   setQualitygp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     qualitygp: e.target.value,
      //   });
      // }
      // if (ind === 9) {
      //   setResponsibilitygp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     responsibilitygp: e.target.value,
      //   });
      // }
      // if (ind === 10) {
      //   setMultiSkillsgp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     multiSkillsgp: e.target.value,
      //   });
      // }
      // if (ind === 11) {
      //   setMaturitygp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     maturitygp: e.target.value,
      //   });
      // }
      // if (ind === 12) {
      //   setApproachgp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     approachgp: e.target.value,
      //   });
      // }
      // if (ind === 13) {
      //   setTeamworkgp(e.target.value);
      //   setGoodPotential({
      //     ...goodPotential,
      //     teamworkgp: e.target.value,
      //   });
      // }
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

      if (
        e.target.value === "0" ||
        e.target.value === undefined ||
        e.target.value === ""
      ) {
        setTextError3HighPotential({
          ...textError3HighPotential,
          [ind]: false,
        });
        setIndError3();
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

      setDynamicHighPotential({
        ...dynamicHighpotential,
        [ind]: Number(e.target.value),
      });

      // if (ind === 0) {
      //   setAttendencehp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     attendencehp: e.target.value,
      //   });
      // }
      // if (ind === 1) {
      //   setLessDDependabilityhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     lessDDependabilityhp: e.target.value,
      //   });
      // }
      // if (ind === 2) {
      //   setGroupWorkinghp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     groupWorkinghp: e.target.value,
      //   });
      // }
      // if (ind === 3) {
      //   setPositiveAttitudehp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     positiveAttitudehp: e.target.value,
      //   });
      // }
      // if (ind === 4) {
      //   setIntelligencehp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     intelligencehp: e.target.value,
      //   });
      // }
      // if (ind === 5) {
      //   setImaginationhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     imaginationhp: e.target.value,
      //   });
      // }
      // if (ind === 6) {
      //   setImprovementhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     improvementhp: e.target.value,
      //   });
      // }
      // if (ind === 7) {
      //   setDisciplinehp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     disciplinehp: e.target.value,
      //   });
      // }
      // if (ind === 8) {
      //   setQualityhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     qualityhp: e.target.value,
      //   });
      // }
      // if (ind === 9) {
      //   setResponsibilityhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     responsibilityhp: e.target.value,
      //   });
      // }
      // if (ind === 10) {
      //   setMultiSkillshp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     multiSkillshp: e.target.value,
      //   });
      // }
      // if (ind === 11) {
      //   setMaturityhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     maturityhp: e.target.value,
      //   });
      // }
      // if (ind === 12) {
      //   setApproachhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     approachhp: e.target.value,
      //   });
      // }
      // if (ind === 13) {
      //   setTeamworkhp(e.target.value);
      //   setHighPotential({
      //     ...highPotential,
      //     teamworkhp: e.target.value,
      //   });
      // }
    } else {
      return console.error("error");
    }
  }

  //------------------------------------------------------------------//
  //values//
  //------------------------------------------------------------------//

  // const lowPotentialValues = designation?.includes("Sr.")
  //   ? [
  //       attendencelp,
  //       lessDDependabilitylp,
  //       groupWorkinglp,
  //       positiveAttitudelp,
  //       intelligencelp,
  //       imaginationlp,
  //       improvementlp,
  //       disciplinelp,
  //       qualitylp,
  //       responsibilitylp,
  //       multiSkillslp,
  //       maturitylp,
  //       approachlp,
  //       teamworklp,
  //     ]
  //   : [
  //       attendencelp,
  //       lessDDependabilitylp,
  //       groupWorkinglp,
  //       positiveAttitudelp,
  //       intelligencelp,
  //       imaginationlp,
  //       improvementlp,
  //       disciplinelp,
  //       qualitylp,
  //       responsibilitylp,
  //       multiSkillslp,
  //     ];

  const lowPotentialValues = Object.values(dynamicLowpotential);

  const lowPotentialInputValues =
    lowPotentialValues[ind] !== undefined
      ? lowPotentialValues[ind]
      : "undefined";

  // const goodPotentialValues = designation.includes("Sr.")
  //   ? [
  //       attendencegp,
  //       lessDDependabilitygp,
  //       groupWorkinggp,
  //       positiveAttitudegp,
  //       intelligencegp,
  //       imaginationgp,
  //       improvementgp,
  //       disciplinegp,
  //       qualitygp,
  //       responsibilitygp,
  //       multiSkillsgp,
  //       maturitygp,
  //       approachgp,
  //       teamworkgp,
  //     ]
  //   : [
  //       attendencegp,
  //       lessDDependabilitygp,
  //       groupWorkinggp,
  //       positiveAttitudegp,
  //       intelligencegp,
  //       imaginationgp,
  //       improvementgp,
  //       disciplinegp,
  //       qualitygp,
  //       responsibilitygp,
  //       multiSkillsgp,
  //     ];

  const goodPotentialValues = Object.values(dynamicGoodpotential);

  const goodPotentialInputValues =
    goodPotentialValues[ind] !== undefined
      ? goodPotentialValues[ind]
      : "undefined";

  // const highPotentialValues = designation.includes("Sr.")
  //   ? [
  //       attendencehp,
  //       lessDDependabilityhp,
  //       groupWorkinghp,
  //       positiveAttitudehp,
  //       intelligencehp,
  //       imaginationhp,
  //       improvementhp,
  //       disciplinehp,
  //       qualityhp,
  //       responsibilityhp,
  //       multiSkillshp,
  //       maturityhp,
  //       approachhp,
  //       teamworkhp,
  //     ]
  //   : [
  //       attendencehp,
  //       lessDDependabilityhp,
  //       groupWorkinghp,
  //       positiveAttitudehp,
  //       intelligencehp,
  //       imaginationhp,
  //       improvementhp,
  //       disciplinehp,
  //       qualityhp,
  //       responsibilityhp,
  //       multiSkillshp,
  //     ];

  const highPotentialValues = Object.values(dynamicHighpotential);

  const highPotentialInputValues =
    highPotentialValues[ind] !== undefined
      ? highPotentialValues[ind]
      : "undefined";

  useEffect(() => {
    if (updatedBehaviourData.length > 0) {
      if (
        parseInt(lowPotentialInputValues) > 0 ||
        lowPotentialInputValues === undefined
      ) {
        setIsDisable({
          LowPotential: false,
          GoodPotential: true,
          HighPotential: true,
        });
      }

      if (
        parseInt(goodPotentialInputValues) > 0 ||
        goodPotentialInputValues === undefined
      ) {
        setIsDisable({
          LowPotential: true,
          GoodPotential: false,
          HighPotential: true,
        });
      }

      if (
        parseInt(highPotentialInputValues) > 0 ||
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

  useEffect(() => {
    if(Object.values(dynamicLowpotential)?.length > 0   ){


      var keys =   Array.from(Array(Object.values(dynamicLowpotential)?.length).keys());

      const sums = keys?.map(
        (key) =>
          Number(dynamicLowpotential[key]) +
          Number(dynamicGoodpotential[key]) +
          Number(dynamicHighpotential[key])
      );

      const totalMarks = sums;
      const calculatedMarks = totalMarks[ind] !== undefined ? totalMarks[ind] : 0;
  
      setRowTotal((marks) => ({
        ...marks,
        [ind]:
          newwDiffMonthhs > 1
            ? (calculatedMarks / newwDiffMonthhs).toFixed(2)
            : calculatedMarks,
      }));
    }
 

   

    

  
  }, [ dynamicLowpotential, dynamicGoodpotential, dynamicHighpotential]);

  // useEffect(() => {
  //   let calculatedValues;

  //   if (designation.includes("Sr.")) {
  //     calculatedValues = {
  //       totalAttendence:
  //         Number(attendencelp) + Number(attendencegp) + Number(attendencehp),

  //       totalDependablity:
  //         Number(lessDDependabilitylp) +
  //         Number(lessDDependabilitygp) +
  //         Number(lessDDependabilityhp),

  //       tatalGroupWorking:
  //         Number(groupWorkinglp) +
  //         Number(groupWorkinggp) +
  //         Number(groupWorkinghp),

  //       totalPositiveAttitude:
  //         Number(positiveAttitudelp) +
  //         Number(positiveAttitudegp) +
  //         Number(positiveAttitudehp),

  //       totalInteligence:
  //         Number(intelligencelp) +
  //         Number(intelligencegp) +
  //         Number(intelligencehp),

  //       totalImagination:
  //         Number(imaginationlp) + Number(imaginationgp) + Number(imaginationhp),

  //       totalImprovement:
  //         Number(improvementlp) + Number(improvementgp) + Number(improvementhp),

  //       totalDiscipline:
  //         Number(disciplinelp) + Number(disciplinegp) + Number(disciplinehp),

  //       totalQuality: Number(qualitylp) + Number(qualitygp) + Number(qualityhp),

  //       totalRespnsibility:
  //         Number(responsibilitylp) +
  //         Number(responsibilitygp) +
  //         Number(responsibilityhp),

  //       totalMultiSkill:
  //         Number(multiSkillslp) + Number(multiSkillsgp) + Number(multiSkillshp),

  //       totalMaturity:
  //         Number(maturitylp) + Number(maturitygp) + Number(maturityhp),
  //       totalApproach:
  //         Number(approachlp) + Number(approachgp) + Number(approachhp),
  //       totalTeamwork:
  //         Number(teamworklp) + Number(teamworkgp) + Number(teamworkhp),
  //     };
  //   } else {
  //     calculatedValues = {
  //       totalAttendence:
  //         Number(attendencelp) + Number(attendencegp) + Number(attendencehp),

  //       totalDependablity:
  //         Number(lessDDependabilitylp) +
  //         Number(lessDDependabilitygp) +
  //         Number(lessDDependabilityhp),

  //       tatalGroupWorking:
  //         Number(groupWorkinglp) +
  //         Number(groupWorkinggp) +
  //         Number(groupWorkinghp),

  //       totalPositiveAttitude:
  //         Number(positiveAttitudelp) +
  //         Number(positiveAttitudegp) +
  //         Number(positiveAttitudehp),

  //       totalInteligence:
  //         Number(intelligencelp) +
  //         Number(intelligencegp) +
  //         Number(intelligencehp),

  //       totalImagination:
  //         Number(imaginationlp) + Number(imaginationgp) + Number(imaginationhp),

  //       totalImprovement:
  //         Number(improvementlp) + Number(improvementgp) + Number(improvementhp),

  //       totalDiscipline:
  //         Number(disciplinelp) + Number(disciplinegp) + Number(disciplinehp),

  //       totalQuality: Number(qualitylp) + Number(qualitygp) + Number(qualityhp),

  //       totalRespnsibility:
  //         Number(responsibilitylp) +
  //         Number(responsibilitygp) +
  //         Number(responsibilityhp),

  //       totalMultiSkill:
  //         Number(multiSkillslp) + Number(multiSkillsgp) + Number(multiSkillshp),
  //     };
  //   }

  //   const totalMarks = designation.includes("Sr")
  //     ? [
  //         calculatedValues.totalAttendence,
  //         calculatedValues.totalDependablity,
  //         calculatedValues.tatalGroupWorking,
  //         calculatedValues.totalPositiveAttitude,
  //         calculatedValues.totalInteligence,
  //         calculatedValues.totalImagination,
  //         calculatedValues.totalImprovement,
  //         calculatedValues.totalDiscipline,
  //         calculatedValues.totalQuality,
  //         calculatedValues.totalRespnsibility,
  //         calculatedValues.totalMultiSkill,
  //         calculatedValues.totalMaturity,
  //         calculatedValues.totalApproach,
  //         calculatedValues.totalTeamwork,
  //       ]
  //     : [
  //         calculatedValues.totalAttendence,
  //         calculatedValues.totalDependablity,
  //         calculatedValues.tatalGroupWorking,
  //         calculatedValues.totalPositiveAttitude,
  //         calculatedValues.totalInteligence,
  //         calculatedValues.totalImagination,
  //         calculatedValues.totalImprovement,
  //         calculatedValues.totalDiscipline,
  //         calculatedValues.totalQuality,
  //         calculatedValues.totalRespnsibility,
  //         calculatedValues.totalMultiSkill,
  //         0,
  //         0,
  //         0,
  //       ];

  //   const calculatedMarks = totalMarks[ind] !== undefined ? totalMarks[ind] : 0;

  //   setRowTotal((marks) => ({
  //     ...marks,
  //     [ind]:
  //       newwDiffMonthhs > 1
  //         ? (calculatedMarks / newwDiffMonthhs).toFixed(2)
  //         : calculatedMarks,
  //   }));
  // }, [lowPotential, highPotential, goodPotential]);

  const getLocalTImeperiod = localStorage.getItem("timperiod");

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
              (parseInt(newwDiffMonthhs) === 1 &&
                updatedData?.data?.data[7]?.IsReviewKey === 0) ||
              (parseInt(newwDiffMonthhs) === 1 &&
                updatedData?.data?.data[7]?.IsReviewKey === 2) ||
              (parseInt(newwDiffMonthhs) === 3 &&
                updatedData?.data?.data[7]?.IsReviewKey === 2) ||
              getLocalTImeperiod < 5 ||
              isThreeMonths ||
              selectedThreeMonths ||
              parseInt(newwDiffMonthhs) === 2 ||
              parseInt(newwDiffMonthhs) > 3
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
              (parseInt(newwDiffMonthhs) === 1 &&
                updatedData?.data?.data[7]?.IsReviewKey === 0) ||
              (parseInt(newwDiffMonthhs) === 1 &&
                updatedData?.data?.data[7]?.IsReviewKey === 2) ||
              (parseInt(newwDiffMonthhs) === 3 &&
                updatedData?.data?.data[7]?.IsReviewKey === 2) ||
              getLocalTImeperiod < 5 ||
              isThreeMonths ||
              selectedThreeMonths ||
              parseInt(newwDiffMonthhs) === 2 ||
              parseInt(newwDiffMonthhs) > 3
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
              (parseInt(newwDiffMonthhs) === 1 &&
                updatedData?.data?.data[7]?.IsReviewKey === 0) ||
              (parseInt(newwDiffMonthhs) === 1 &&
                updatedData?.data?.data[7]?.IsReviewKey === 2) ||
              (parseInt(newwDiffMonthhs) === 3 &&
                updatedData?.data?.data[7]?.IsReviewKey === 2) ||
              getLocalTImeperiod < 5 ||
              isThreeMonths ||
              selectedThreeMonths ||
              parseInt(newwDiffMonthhs) === 2 ||
              parseInt(newwDiffMonthhs) > 3
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

export default Renderforthtable;
