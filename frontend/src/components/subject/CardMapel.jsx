import React from "react";
import { Link } from "react-router-dom";

const CardMapel = (props) => {
  return (
    <div className="card-mapel">
      <div className="card-mapel-header">
        <img src={"data:image/png;base64," + props.mapel.cover} />
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
