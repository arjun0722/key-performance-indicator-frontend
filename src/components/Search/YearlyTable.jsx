import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { ACCESS_TOKEN } from "../../Config/Constant";
import { show_error } from "../../Config/Helper";
import Loading from "../Loading";

export default function YearlyTable() {
    const [userEmails, setUserEmails] = useState();
    const [userEmailsAndNames, setUserEmailsAndNames] = useState([]);
    const [financialYearData, setFinancialYearData] = useState([]);
    const [rating, setRating] = useState("")
    const [potential, setPotential] = useState("")
    const [loader, setLoader] = useState(false);
    const [loginUser, setLoginUser] = useState(
        localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
    );

    // ********* this function used for get all user email and names ********** //
    
    const getUserEmails = async () => {
        let users = [];
        let emailsAndNames = []
        let headersList = {
            Accept: "*/*",
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN)).access_token
                }`,
        };
        let reqOptions = {
            url: "https://vssps.dev.azure.com/qservicesindia/_apis/graph/users?api-version=6.0-preview.1",
            method: "GET",
            headers: headersList,
        };

        axios
            .request(reqOptions)
            .then((response) => {
                response.data.value.map((data) => {
                    if (data.metaType == "member") {
                        let emailsAndNamesObj = {
                            emailId: "",
                            name: ""
                        }
                        emailsAndNamesObj.emailId = data.mailAddress
                        emailsAndNamesObj.name = data.displayName
                        emailsAndNames.push(emailsAndNamesObj)
                        return users.push(data.mailAddress);
                    }
                });
                setUserEmails(users);
                setUserEmailsAndNames(emailsAndNames)
            })
            .catch((err) => {
                show_error(err.message);
            });
    };

// ********* this function used for get full year data ********** //

    const getYearlyData = async () => {
        setLoader(true) 
        if (userEmails !== undefined) {
            setLoader(true)
            let reqOptions = {
                method: "post",
                url: `${BACKEND_URL}/kpi/financialyear/data`,
                // url: `http://localhost:8080/kpi/financialyear/data`,
                data: [
                    {
                        emails: userEmails,
                    },
                ],
                headers: { Accept: "application/json" },
            };
            let data = await axios.request(reqOptions);
            setFinancialYearData(data.data.data)
            setLoader(false)
        }else{
            setLoader(false)
        }
    };

    // ********* start use effects ********** //

    useEffect(() => {
        getUserEmails();
    }, []);

    useEffect(() => {
        getYearlyData();
    }, [userEmails]);

     // ********* End use effects ********** //



    // ********** start functions *********** //

    // ********* behavioural kpi financial year average ********** //

    function getbehaviouralAverage(index) {
        let behavioural = [];

        let data = financialYearData[index];
        for (let i = 0; i < data?.kpibehaviouralFinancial.length; i++) {
            
            behavioural.push(
                (Number(data?.kpibehaviouralFinancial[0][i]?.LowPotential) +
                    Number(data?.kpibehaviouralFinancial[0][i]?.GoodPotential) +
                    Number(data?.kpibehaviouralFinancial[0][i]?.HighPotential)) /
                3
            );
            
        }
        const d = behavioural?.reduce((a, b) => a + b, 0);
        return (d / data?.kpibehaviouralFinancial.length ? d / data?.kpibehaviouralFinancial.length : 0).toFixed(2);
    }

// *********** this common function used for get average of yearly data ********// 

    function finalAvr(data) {
        return data
    }

    // ************* This Function Used For Get Rating according to marks ************

    function finalRating(data) {
        // Convert the string to a number if data is a string
        if (typeof data === 'string') {
            data = parseFloat(data);
        }
         // Rating According to Marks
        if (data < 60) {
             return "R1";
        } else if (data >= 60 && data <= 89) {
             return "R2";
        } else if (data >= 90 && data <= 109) {
             return "R3";
        } else if (data >= 110 && data <= 120) {
             return "R4";
        } else if (data >= 121) {
             return "R5";
        }
    }

    function finalPotential(index) {
        let data = getbehaviouralAverage(index);

        // Convert the string to a number if data is a string
        if (typeof data === 'string') {
            data = parseFloat(data);
        }
       
        // Potential According to Value
        if (data < 6) {
            return "P1";
        } else if (data >= 6 && data <= 8.9) {
            return "P2";
        } else if (data >= 9 && data <= 10.9) {
            return "P3";
        } else if (data >= 11.0 && data <= 12.0) {
            return "P4";
        } else if (data >= 12.1) {
            return "P5";
        }
    }


    // ************* Table To Excel ************ //

    const handleExportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Define cell styles
        const headerCellStyle = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA500' } }, // Orange color
            font: { bold: true },
        };

        const dataCellStyle = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } }, // Yellow color
        };

        // Set headers
        const header = [
            "Name",
            "Appraisee Rating",
            "Appraiser Rating",
            "Reviewer Marks",
            "Behavioural",
            "Rating",
            "Potential"
        ];

        worksheet.addRow(header);

        // Apply styles to header row
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = headerCellStyle.fill;
            cell.font = headerCellStyle.font;
        });

        // Populate data rows
        financialYearData.forEach((row, index) => {
            const matchData = userEmailsAndNames?.find(data => data.emailId === (row?.kpibehaviouralFinancial.length > 0 ? row?.kpibehaviouralFinancial[0][0].ToUserId : ""));
            if (!matchData) return;

            const rowData = [
                matchData?.name ? matchData.name : "",
                finalAvr(row?.financAppraiseeSelfRating),
                finalAvr(row?.financAppraiserRating),
                finalAvr(row?.financReviewerMarks),
                row?.kpibehaviouralFinancial.length > 0 ? getbehaviouralAverage(index) : 1,
                finalRating(row?.financReviewerMarks),
                finalPotential(index),
            ];

            worksheet.addRow(rowData);

            // Apply styles to data row
            worksheet.getRow(index + 2).eachCell((cell) => {
                cell.fill = dataCellStyle.fill;
            });
        });

        // Generate the desired file name with financial year information
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const previousYear = currentYear - 1;
        const financialYear = `${previousYear}-${currentYear}`;
        const fileName = `Financial_Year_Data_${financialYear}.xlsx`;

        // Set column widths (adjust as needed)
        worksheet.columns.forEach((column) => {
            column.width = 15;
        });

        // Create a blob from workbook and initiate download
        const blob = await workbook.xlsx.writeBuffer();
        const blobUrl = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(blobUrl);
    };


 // ********** End functions *********** //


    
    return (
        <>
            <TableContainer component={Paper}>
                <div class="button-container">
                    <button onClick={handleExportExcel}>Export to Excel</button>
                </div>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead style={{ background: "orange" }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Appraisee Rating</TableCell>
                            <TableCell align="center">Appraiser Rating</TableCell>
                            <TableCell align="center">Reviewer Marks</TableCell>
                            <TableCell align="center">Behavioural</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Potential</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {financialYearData?.map((row, index) => {
                            const matchData = userEmailsAndNames?.find((data) => {
                                return data.emailId === (row?.kpibehaviouralFinancial.length > 0
                                    ? row?.kpibehaviouralFinancial[0][0].ToUserId
                                    : "");
                            });
                            if (!matchData) return '';
                            return (
                                <TableRow
                                    key={index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link
                                            style={{
                                                color: "black",
                                                fontWeight: "500",
                                                fontSize: "0.875rem",
                                            }}
                                            to={`/mark?email=${matchData?.name ? matchData?.name : ""}`}
                                        >
                                            {matchData?.name ? matchData?.name : ""}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">{finalAvr(row?.financAppraiseeSelfRating)}</TableCell>
                                    <TableCell align="center">{finalAvr(row?.financAppraiserRating)}</TableCell>
                                    <TableCell align="center">{finalAvr(row?.financReviewerMarks)}</TableCell>
                                    <TableCell align="center">
                                        {row?.kpibehaviouralFinancial.length > 0
                                            ? getbehaviouralAverage(index)
                                            : 1}
                                    </TableCell>
                                    <TableCell align="center">{finalRating(row?.financReviewerMarks)}</TableCell>
                                    <TableCell align="center">{finalPotential(index)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
            {loader ? (<Loading />) : ""}
        </>
    );
}
