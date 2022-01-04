import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";

const CardMapel = (props) => {
  const renderToggle = () => (
    <FontAwesomeIcon icon={faEllipsisV} className="card-menu" />
  );
  return (
    <div className="card-mapel">
      <div className="card-mapel-header">
        <Dropdown
          customToggle={() => renderToggle()}
          refresh={props.refresh}
          delete={props.delete}
          id={props.mapel._id}
          data={props.mapel}
          teacher={props.teacher}
        />
        <img
          src={"data:image/png;base64," + props.mapel.cover}
          alt="gambar sampul"
        />
      </div>
      <div className="card-mapel-body text-center">
        <h6>{props.mapel.nama_mapel}</h6>
        <p>{props.mapel.nama_guru}</p>
        <Link to={`/subject_detail/${props.mapel._id}`}>
          <button className="btn">Detail</button>
        </Link>
      </div>
    </div>
  );
};

export default CardMapel;
