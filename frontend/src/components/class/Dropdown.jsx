import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Modals from './Modals';

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
    const [show, setShow] = useState(false);

  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
    return (
        <>
      <div className="dropdown" style={{ position: "absolute" }}>
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
          <Link to="#">
            <div
              className="notification-item"
              style={{ cursor: "pointer" }}
              onClick={handleOpen}
            >
              <i className="bx bx-edit"></i>
              <span>Ubah</span>
            </div>
          </Link>
          <Link to="#" onClick={() => props.delete(props.id)}>
            <div className="notification-item" style={{ cursor: "pointer" }}>
              <i className="bx bx-trash"></i>
              <span>Hapus</span>
            </div>
          </Link>
          {props.renderFooter ? (
            <div className="dropdown__footer">{props.renderFooter()}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modals
        refresh={props.refresh}
        modalShow={show}
        close={handleClose}
        data={props.data}
        walas={props.walas}
      />
    </>
    )
}

export default Dropdown
