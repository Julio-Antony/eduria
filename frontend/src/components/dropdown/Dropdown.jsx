import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
  removeUserclass,
  removeUserImage,
  removeUserlevel,
  removeUsername,
  removeUserSession,
} from "../../config/Api";

import "./dropdown.css";

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

const Dropdown = (props) => {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);

  const history = useHistory();
  function Logout() {
    swal({
      title: "Apa anda yakin ?",
      text: "Apakah anda yakin ingin keluar aplikasi?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeUserSession();
        removeUserlevel();
        removeUsername();
        removeUserImage();
        removeUserclass();
        history.push("/");
      }
    });
  }

  return (
    <div className="dropdown">
      <button ref={dropdown_toggle_el} className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ""}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : ""}
      </button>
      <div ref={dropdown_content_el} className="dropdown__content">
        {/* {props.contentData && props.renderItems
          ? props.contentData.map((item, index) =>
              props.renderItems(item, index)
            )
          : ""} */}
        <Link to={`/user_detail/${props.id}`}>
          <div className="notification-item">
            <i className="bx bx-user"></i>
            <span>Profil</span>
          </div>
        </Link>
        <Link to="/config">
          <div className="notification-item">
            <i className="bx bx-cog"></i>
            <span>Pengaturan</span>
          </div>
        </Link>
        <Link to="#" onClick={Logout}>
          <div className="notification-item">
            <i className="bx bx-log-out-circle bx-rotate-180"></i>
            <span>Logout</span>
          </div>
        </Link>
        {props.renderFooter ? (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dropdown;
