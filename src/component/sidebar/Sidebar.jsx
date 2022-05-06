import React, { useState } from "react";
import "../../App.css";
import {
  FaBars,
  FaAngleLeft,
  FaUserAlt,
  FaCog,
  FaCommentAlt,
  FaInfoCircle,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../pages/Auth";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Toggle = () => setIsOpen(!isOpen);
  const auth = useAuth();

  const menuItem = [
    { id: 1, path: "/", name: "Home", icon: <FaHome /> },
    { id: 2, path: "/contact", name: "Contact", icon: <FaUserAlt /> },
    { id: 3, path: "/message", name: "Message", icon: <FaCommentAlt /> },
    { id: 5, path: "/about", name: "About", icon: <FaInfoCircle /> },
    // { id: 4, path: "/setting", name: "Login", icon: <FaCog /> },
  ];

  return (
    <div style={{ display: "flex" }}>
      <div
        className=" container"
        style={{ margin: "0px", padding: "0px", width: "auto" }}
      >
        <div className="sidebars" style={{ width: isOpen ? "50px" : "200px" }}>
          <div className="top-section">
            <h1
              className="logo"
              style={{ display: !isOpen ? "block" : "none" }}
            >
              M
            </h1>
            <div
              className="bars"
              style={{ marginLeft: isOpen ? "0px" : "100px" }}
            >
              {isOpen ? (
                <FaBars onClick={Toggle} />
              ) : (
                <FaAngleLeft onClick={Toggle} />
              )}
            </div>
          </div>
          {menuItem.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.id}
                className="link"
                activeClassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div
                  // style={{textDecoration:'none',listStyle:'none'}}
                  className="link_text"
                  style={{ display: !isOpen ? "block" : "none" }}
                >
                  {item.name}
                </div>
              </NavLink>
            );
          })}
          {!auth.user && (
            <NavLink to="/setting" className="link" activeClassName="active">
              <div className="icon">
                <FaCog />
              </div>
              <div
                className="link_text"
                style={{ display: !isOpen ? "block" : "none" }}
              >
                Login
              </div>
            </NavLink>
          )}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
