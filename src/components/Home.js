import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ACCESS_TOKEN } from "../Config/Constant";
import { MANAGEMENt_ID } from "../Config/ManagementEmail";
import Loading from "./Loading";
import { show_error } from "../Config/Helper";

import "./comp.css";

const Home = () => {
  if (!JSON.parse(sessionStorage.getItem("token-data"))) {
    window.location = "/login";
  }
  const [users, setUsers] = useState([]);
  const [loadingdata, setLoadingdata] = useState(false);

  const [userEmail, setUserEmail] = useState(
    localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
  );

  const [path, setPath] = useState("");

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    setLoadingdata(true);

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN)).access_token
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
        setUsers(response.data.value);
        setLoadingdata(false);
      })
      .catch((err) => {
        show_error(err.message);
      });
  };

  const userPath = (user) => {
    if (MANAGEMENt_ID.includes(userEmail)) {
      return `/mark?email=${user.mailAddress}`;
    } else {
      if (userEmail === user.mailAddress) {
        return `/mark?email=${user.mailAddress}`;
      } else {
        return "";
      }
    }
  };

  const getLinkClassName = (user) => {
    return userPath(user) ? "card 1" : "card 1" + " border-red";
  };

  return (
    <>
      {loadingdata ? (
        <Loading />
      ) : (
        <>
          <div className="cards-list">
            {(users || []).map((user) => {
              if (user.metaType == "member") {
                return (
                  <Link to={userPath(user)} className="Home_Links">
                    <div className={getLinkClassName(user)}>
                      <div className="card_image">
                        <img src={user._links.avatar.href} />
                      </div>
                      <div className="card_title title-white">
                        <p>{user.displayName}</p>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
