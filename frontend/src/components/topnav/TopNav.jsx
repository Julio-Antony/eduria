import React, { useEffect, useState } from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";

import notifications from "../../assets/JsonData/notification.json";
import axios from "axios";
import { getToken } from "../../config/Api";

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={"data:image/png;base64," + user.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const Topnav = () => {
  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const [judul, setJudul] = useState("");
  const [id, setId] = useState("");

  const token = getToken()

  useEffect(() => {
    axios.get(`/api/users?keyword=${localStorage.getItem("email")}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setId(res.data.users[0]._id)
    }).catch((err) => {
      console.log(err)
    })
    setNama(localStorage.getItem("username"));
    setImage(localStorage.getItem("foto"));
    setJudul(localStorage.getItem("page"));

  }, [token]);

  const curr_user = {
    display_name: nama,
    image: image,
  };
  return (
    <div className="topnav">
      <div className="topnav__left">
        {/* <input type="text" placeholder="Cari disini..." />
        <i className="bx bx-search"></i> */}
        <h2 className="page-header">{judul}</h2>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
          id={id}
            customToggle={() => renderUserToggle(curr_user)}
          // contentData={user_menu}
          // renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">Selengkapnya</Link>}
          />
          {/* dropdown here */}
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
