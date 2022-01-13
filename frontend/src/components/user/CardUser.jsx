import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const CardUser = (props) => {
  const renderToggle = () => (
    <FontAwesomeIcon icon={faEllipsisV} className="card-menu" />
  );
  return (
    <div className="card-user">
      <div className="card-user-header">
        <Dropdown
          customToggle={() => renderToggle()}
          refresh={props.refresh}
          delete={props.delete}
          id={props.user._id}
          data={props.user}
          level={props.level}
        />
        <img
          src={"data:image/png;base64," + props.user.foto}
          alt="gambar sampul"
        />
      </div>
      <div className="card-mapel-body text-center">
        <h6>{props.user.nama}</h6>
        <p>{props.user.level}</p>
        <Link to={`/user_detail/${props.user._id}`}>
          <button className="btn">Detail</button>
        </Link>
      </div>
    </div>
  );
};

export default CardUser;
