import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../config/Api";

const CardJadwal = (props) => {
  const [teacher, setTeacher] = useState({});
  const [subject, setSubject] = useState({});
  const token = getToken();

  const data = useCallback(() => {
    const subjectUrl = `/api/subject/${props.jadwal.id_mapel}`;

    const subjects = axios.get(subjectUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([subjects])
      .then(
        axios.spread((...allData) => {
          setSubject(allData[0].data);
          axios
            .get(`/api/users/${allData[0].data.id_guru}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              setTeacher(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    data();
  }, [data]);
  return (
    <div className="card-jadwal m-auto">
      <div className="card-jadwal-header">
        <div className="card-jadwal-overlay"></div>
        <div className="row">
          <div className="col-md-3">
            <div className="img-wrapper-teacher">
              <img
                className="teacher-image"
                src={"data:image/png;base64," + teacher.foto}
                alt="gambar"
              />
            </div>
          </div>
          <div className="col-md-9">
            <small className="text-light">{teacher.nama}</small>
            <small className="text-light">{teacher.nama}</small>
          </div>
        </div>
        <img
          className="bg-img"
          src={"data:image/png;base64," + subject.cover}
          alt="gambar"
        />
      </div>
      <div className="card-jadwal-body p-3 text-center">
        <h5 className="jadwal-title">{subject.nama_mapel}</h5>
        <Link to={`/subject_detail/${subject._id}`}>
          <button className="btn btn-success">Masuk</button>
        </Link>
      </div>
    </div>
  );
};

export default CardJadwal;
