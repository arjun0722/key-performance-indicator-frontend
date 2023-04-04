import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  tableRow: {
    transition: "transform",
    "&:hover": {
      transform: "scale(1.4)",
    },
  },
});

const Tableview = ({ test }) => {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            tableLayout: "auto",
            border: "4px solid rgba(0,0,0,0.2)",
            padding: 1,
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#009879" }}>
              <TableCell sx={{ color: "#FFFFFF" }}>KRA</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>KPI</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>
                REMARKS/SCORING LOGIC
              </TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>UNIT</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>TYPE OF KRI</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>TARGET</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>WEIGHTAGE</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>APPRAISEE MARKS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#66cdaa" }}>
            {test.map((row) => (
              <TableRow
                key={row.title}
                sx={{ borderBottom: "2px solid black" }}
              >
                <TableCell
                  component="th"
                  sx={{ backgroundColor: "#ffcccb", fontWeight: 900 }}
                >
                  {row.title}
                </TableCell>
 
                {row.kpi.map((innerdata, innerindex) => (
                  <TableRow key={row.innerindex}>
                    {" "}
                    <TableCell>{innerdata}</TableCell>{" "}
                  </TableRow>
                ))}

                <TableCell>
                  {row.remarks.map((innerdata, innerindex) => (
                    <TableRow>
                      {" "}
                      <TableCell>{innerdata}</TableCell>{" "}
                    </TableRow>
                  ))}
                </TableCell>

                <TableCell>
                  {row.unit.map((innerdata, innerindex) => (
                    <TableRow>
                      <TableCell>{innerdata}</TableCell>
                    </TableRow>
                  ))}
                </TableCell>

                <TableCell>
                  {row.type.map((innerdata, innnerindex) => (
                    <TableRow>
                      {" "}
                      <TableCell>{innerdata}</TableCell>{" "}
                    </TableRow>
                  ))}
                </TableCell>

                <TableCell>
                  {row.target.map((innerdata, innerindex) => (
                    <TableRow>
                      {" "}
                      <TableCell>{innerdata}</TableCell>
                    </TableRow>
                  ))}
                </TableCell>

                <TableCell>
                  {row.weightage.map((innerdata, innerindex) => (
                    <TableRow>
                      <TableCell>{innerdata}</TableCell>
                    </TableRow>
                  ))}
                </TableCell>

                <TableCell>
                  {(row.marks || []).map((innerdata, innerindex) => (
                    <TableRow>
                      <TableCell hover className={classes.tableRow}>
                        {innerdata}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tableview;
