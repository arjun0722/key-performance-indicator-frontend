import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

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

const Renderthirdtable = ({ val, thirdTable }) => {
  return (
    <>
      <tr>
        <th>{val.B}</th>
        <td>{val.C}</td>
        <td>{val.D}</td>
        <td>{val.E}</td>
        <td>{val.F}</td>
        <td>{val.G}</td>
        <td>{val.H}</td>
        <td>{val.I}</td>
        <td>{val.J}</td>
        <td style={{ backgroundColor: "#bf8f00" }}>{val.K}</td>
        <td>{val.L}</td>
        <td style={{ backgroundColor: "#70ad47" }}>{val.M}</td>
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
  let firstTable = fileData.slice(0, 4);
  let secondTable = fileData.slice(4, 5);
  let thirdTable = fileData.slice(6, 14);
  let forthTable = fileData.slice(17, 31);
  let fifthTable = fileData.slice(32, 37);
  return (
    <div>
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
            style={{ backgroundColor: "#f4b084", height: "40px" }}
            colSpan="14"
          >
            {secondTable[0].B}
          </td>
        </tr>
        <tr>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].B}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].C}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].D}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].E}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].F}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].G}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].H}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].I}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].J}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].K}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].L}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].M}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].N}</th>
          <th style={{ backgroundColor: "#00b0f0" }}>{fileData[5].O}</th>
        </tr>
        {thirdTable.map((val, ind) => {
          return (
            <>
              <Renderthirdtable key={ind} val={val} thirdTable={thirdTable} />
            </>
          );
        })}
        <tr style={{ height: "100px" }}></tr>
        <tr style={{ height: "40px" }}>
          <td
            style={{ backgroundColor: "#f4b084", textAlign: "center" }}
            colSpan="5"
          >
            {fileData[14].B}
          </td>
        </tr>
        <tr>
          <td
            style={{ backgroundColor: "#92d050", textAlign: "center" }}
            rowSpan="2"
          >
            {fileData[15].B}
          </td>
          <td style={{ backgroundColor: "#92d050" }}>{fileData[15].C}</td>
          <td style={{ backgroundColor: "#92d050" }}>{fileData[15].D}</td>
          <td style={{ backgroundColor: "#92d050" }}>{fileData[15].E}</td>
          <td style={{ backgroundColor: "#92d050" }} rowSpan="2">
            {fileData[15].F}
          </td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#92d050" }}>{fileData[16].C}</td>
          <td style={{ backgroundColor: "#92d050" }}>{fileData[16].D}</td>
          <td style={{ backgroundColor: "#92d050" }}>{fileData[16].E}</td>
        </tr>
        {forthTable.map((val, index) => {
          return (
            <>
              <Renderforthtable key={index} val={val} />
            </>
          );
        })}

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
