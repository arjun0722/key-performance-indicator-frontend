import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LOGIN_KEYS } from "../Config/Constant";
import { ACCESS_TOKEN } from "../Config/Constant";
import { show_error } from "../Config/Helper";
import Loading from "./Loading";

const Login = () => {
  if (JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN))) {
    window.location = "/";
  }

  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);

  const AskFromUserForConfirmation = () => {
    var url = `https://app.vssps.visualstudio.com/oauth2/authorize
?client_id=${LOGIN_KEYS.APP_ID}
&response_type=${LOGIN_KEYS.RESPONSE_TYPE}
&state=${LOGIN_KEYS.STATE}
&scope=${LOGIN_KEYS.SCOPE}
&redirect_uri=${LOGIN_KEYS.REDIRECT_URI}`;

    window.location = url;
  };
  const search = useLocation().search;

  useEffect(async () => {
    const code = new URLSearchParams(search).get("code");

    if (code) {
      setLoadingData(true);
      await GetAccessToken(code);
    }
  }, []);

  const GetAccessToken = async (code) => {
    var rawData = `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=${LOGIN_KEYS.CLIENT_SCREAT}&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${code}&redirect_uri=${LOGIN_KEYS.REDIRECT_URI}`;

    try {
      var respose = await axios.request({
        method: "post",
        url: "https://app.vssps.visualstudio.com/oauth2/token",
        data: rawData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": rawData.length,
        },
      });
      sessionStorage.setItem(ACCESS_TOKEN.TOKEN, JSON.stringify(respose.data));
      navigate("/");
    } catch (error) {
      show_error(error.message);
    }
  };

  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <div class="login-Container">
          <div>
            <button class="log" onClick={AskFromUserForConfirmation}>
              Login
            </button>
            <p id="footer-heading">
              Made with <span>❤</span> by{" "}
              <a href="https://qservicesit.com/">@ Qservices INC.</a>.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
