import React from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";

import logo from "../../assets/images/logo.svg";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import sidebar_teacher from "../../assets/JsonData/sidebar_teacher.json";
import { getLevel } from "../../config/Api";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const level = getLevel();
  console.log(level);

  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  const activeItem2 = sidebar_teacher.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>

      {level === "admin"
        ? sidebar_items.map((item, index) => (
            <Link to={item.route} key={index}>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeItem}
              />
            </Link>
          ))
        : sidebar_teacher.map((item, index) => (
            <Link to={item.route} key={index}>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeItem2}
              />
            </Link>
          ))}
    </div>
  );
};

export default Sidebar;
