import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ImageDisplay from "./ImageGrid";
import "./gallery.css";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file(png or jpeg)");
    }
  };

  return (
    <div>
      <div style={{ background: "#062652", height: "200px" }}>
        <h1
          style={{
            color: "white",
            fontSize: "72px",
            position: "relative",
            top: "40px",
            left: "140px",
          }}
        >
          Jamesons' Gallery
        </h1>
      </div>
      <form>
        <input type="file" onChange={changeHandler} />
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      </form>
      <ImageDisplay />
    </div>
  );
};

export default UploadFile;
