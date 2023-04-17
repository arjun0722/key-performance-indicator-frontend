import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const inputStyle = {
  width: "99%",
  maxWidth: "99%",
  border: "1px solid gray",
  height: "8rem",
  outline: "none",
  fontSize: "16px",
  margin: "auto",
  fontWeight: 500,
};
const buttonStyle = {
  margin: "0px 5px",
  float: "right",
  marginTop: "10px",
};

function ModalFeedback({ setState,disabled }) {
  const [input,setInput] = useState("")
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputState = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = ()=>{
    setOpen(false)
    setState(input);
  }

  return (
    <>
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
        disabled={disabled}
        onClick={handleOpen}
      >
        No
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Feedback
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <textarea
              style={inputStyle}
              type="text"
              onChange={(e) => handleInputState(e)}
            />
          </Typography>
          <Button
            style={buttonStyle}
            onClick={handleClose}
            variant="contained"
            href="#contained-buttons"
          >
            close
          </Button>
          <Button
            style={buttonStyle}
            variant="contained"
            href="#contained-buttons"
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ModalFeedback;
