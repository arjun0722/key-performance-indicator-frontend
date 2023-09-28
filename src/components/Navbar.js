import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ACCESS_TOKEN } from "../Config/Constant";
import { MANAGEMENt_ID } from "../Config/ManagementEmail";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const ITEM_HEIGHT = 48;

export default function PrimarySearchAppBar({ props }) {

  // ******** Navigate Function *********** //
        const navigate = useNavigate();

  // ******* All States ******* //
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginUser, setLoginUser] = useState("");
  const open = Boolean(anchorEl);

  // ******** Event Functions ****** //
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ********* logic functions ******* //

  function homePage(e) {
    e.preventDefault();

    navigate("/");
  }


  function logout(e) {
    e.preventDefault();
    sessionStorage.removeItem("token-data");
    localStorage.removeItem(ACCESS_TOKEN.USER_EMAIL);
    navigate("/login");
    localStorage.removeItem('designation');
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');

  }

// ******** Hooks ******** //

  // Extract the complex expression from the dependency array
  const accessTokenUserEmail = localStorage.getItem(ACCESS_TOKEN.USER_EMAIL);

  useEffect(() => {
    setLoginUser(accessTokenUserEmail);
  }, [accessTokenUserEmail]);
  
  return (
    <header>
      <h1 class="logo" onClick={homePage}>
        Performance Report
      </h1>
      
      <nav>
        <img
          class="cta"
          alt="navicon"
          style={{ width: "200px" }}
          src="./qservices.png"
        />

        {JSON.parse(sessionStorage.getItem("token-data")) && (
          <>
            {" "}
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              style={{ color: "white", float: "right" }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            {MANAGEMENt_ID?.includes(loginUser) ? 
            <div style={{ textAlign: 'center' }}>
              <Link to="/financialyear" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" style={{ textTransform: 'none' }}>
                  Financial year
                </Button>
              </Link>
            </div> : ""}
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <span onClick={logout}>Logout</span>
              </MenuItem>
              
            </Menu>
            
          </>
        )}
      </nav>
      
    </header>
    
  );
}
