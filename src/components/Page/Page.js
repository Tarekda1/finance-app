import React from "react";
import Header from "../Header/Header";
import "./main.css";

const Page = ({ children }) => {
  return (
    <div id="Main" className="main__wrapper">
      <div id="mainBody" className="content__wrapper">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Page;
