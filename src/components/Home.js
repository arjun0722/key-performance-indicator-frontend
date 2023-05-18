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
  const [singleCardCenter, setSingleCardCenter] = useState(false);

  const [userEmail, setUserEmail] = useState(
    localStorage.getItem(ACCESS_TOKEN.USER_EMAIL)
  );

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    setLoadingdata(true);

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

  useEffect(() => {
    const hasSingleCardWithLink =
      users?.filter((user) => {
        return user.metaType === "member" && userPath(user) !== "";
      }).length === 1;

    setSingleCardCenter(hasSingleCardWithLink);
  }, [users]);


      useEffect(()=>{
      localStorage.removeItem("designation");
          },[])
  return (
    <>
      {loadingdata ? (
        <Loading />
      ) : (
        <>
          <div className="cards-list">
            {(users || []).map((user) => {
              if (user.metaType == "member") {
                const path = userPath(user);
                if (path) {
                  // check if path is not empty
                  return (
                    <Link
                      to={path}
                      className={`Home_Links ${singleCardCenter ? "single-card-center" : ""
                        }`}
                    >
                      <div
                        className={`card 1 ${singleCardCenter ? "single-card-resize" : ""
                          }`}
                      >
                        <div className={`card_image`}>
                          <img
                            className={`image ${singleCardCenter ? "single-card-image" : ""
                              }`}
                            src={user._links.avatar.href}
                          />
                        </div>
                        <div
                          className={`card_title title-white ${singleCardCenter ? "single-card-title" : ""
                            }`}
                        >
                          <p>{user.displayName}</p>
                        </div>
                      </div>
                    </Link>
                  );
                }
              }
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
