import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faUserShield,
  faChalkboard,
} from "@fortawesome/free-solid-svg-icons";

import "./statuscard.css";

const StatusCard = (props) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="status-card">
          <div className="status-card__icon">
            <FontAwesomeIcon icon={faUserGraduate} />
          </div>
          <div className="status-card__info">
            <h4>{props.count.siswa}</h4>
            <span>siswa</span>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="status-card">
          <div className="status-card__icon">
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          </div>
          <div className="status-card__info">
            <h4>{props.count.guru}</h4>
            <span>guru</span>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="status-card">
          <div className="status-card__icon">
            <FontAwesomeIcon icon={faUserShield} />
          </div>
          <div className="status-card__info">
            <h4>{props.count.admin}</h4>
            <span>Admin</span>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="status-card">
          <div className="status-card__icon">
            <FontAwesomeIcon icon={faChalkboard} />
          </div>
          <div className="status-card__info">
            <h4>{props.count.kelas}</h4>
            <span>Kelas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
