import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import "./sideBar.css";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar__wrapper">
      <div className="image__wrapper">
        <img alt="logo" style={{ width: "150px", height: "150px" }} />
      </div>
      <div className="menu__wrapper">
        <Nav vertical>
          <NavItem>
            <NavLink onClick={() => navigate("/")}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => navigate("/createSubmission")}>
              New Financial Submission
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
