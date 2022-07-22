import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loader-css">
      <Loader type="TailSpin" color="#00BFFF" height={300} width={300} />
    </div>
  );
};

export default Loading;
