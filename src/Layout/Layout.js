import React from "react";
import Footer from "../components/Footer";
import Navbar from "./../components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="Layout">
        <Navbar />
        
        {children}
        <Footer />
      </div>
    </>
  );
}
