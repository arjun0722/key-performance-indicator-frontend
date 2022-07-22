import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Search from "./components/Search/Search";
import Layout from "./Layout/Layout";
import Mark from "./components/Search/Mark";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";

const App = () => {
  if (!JSON.parse(sessionStorage.getItem("token-data"))) {
    if (window.location.pathname !== "/login") {
      window.location = "/login";
    }
  }

  return (
    <>
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/mark" element={<Mark/>}/>
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      {/* </Provider> */}
    </>
  );
};

export default App;
