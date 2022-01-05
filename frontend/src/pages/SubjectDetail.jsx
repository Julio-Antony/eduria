import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../config/Api";
import "../components/subject/subject.css";
import DocView from "../components/subject/DocView";

const SubjectDetail = ({ match }) => {
  const [mapel, setMapel] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [desc, setDesc] = useState("");
  const [discuss, setDiscuss] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const id = match.params.id;
  const token = getToken();

  useEffect(() => {
    axios
      .get(`/api/subject/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setMapel(res.data.materi[0]);
        setSubtitle(res.data.nama_mapel);
        setTeacher(res.data.nama_guru);
        setDesc(res.data.materi[0].deskripsi);
        setAttachment(res.data.materi[0].attachment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card full-height">
          <div className="card__header">
            {/* {attachment && <DocView file={attachment} />} */}
            <span className="d-flex d-inline">
              <h4 className="subject-name">{subtitle}</h4>
              <h4 className="ml-auto">
                <FontAwesomeIcon icon={faChalkboardTeacher} /> {teacher}
              </h4>
            </span>
            <h2 className="subject-title text-success">{mapel.nama_materi}</h2>
            <p>{desc}</p>
            <div className="line"></div>
          </div>
          <div className="card__body">
            <h4>Diskusi</h4>
            <div className="discuss-section">
              {discuss.length > 0 ? (
                <p></p>
              ) : (
                <p className="text-center">
                  Belum ada diskusi untuk materi ini
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="silabus-panel"></div>
      </div>
    </div>
  );
};

export default SubjectDetail;
