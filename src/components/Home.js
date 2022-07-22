import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ACCESS_TOKEN } from "../Config/Constant";
import Loading from "./Loading";
import { show_error } from "../Config/Helper";

const Home = () => {
  if (!JSON.parse(sessionStorage.getItem("token-data"))) {
    window.location = "/login";
  }
  const [users, setUsers] = useState([]);
  const [loadingdata, setLoadingdata] = useState(false);
  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    setLoadingdata(true);

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem(ACCESS_TOKEN.TOKEN)).access_token}`,
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

  return (
    <>
      {loadingdata ? (
        <Loading />
      ) : (
        <>
          <div class="cards-list">
            {(users || []).map((user) => {
              if (user.metaType == "member") {
                return (
                  <Link
                    to={`/mark?email=${user.mailAddress}`}
                    className="Home_Links"
                  >
                    <div class="card 1">
                      <div class="card_image">
                        {" "}
                        <img src={user._links.avatar.href} />{" "}
                      </div>
                      <div class="card_title title-white">
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
