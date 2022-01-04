import React, { useEffect, useState } from "react";
import SubjectPanel from "../components/subject/SubjectPanel";
import "../components/subject/subject.css";
import { getToken } from "../config/Api";
import axios from "axios";
import CardMapel from "../components/subject/CardMapel";
import FormSubject from "../components/subject/FormSubject";
import { useCallback } from "react";

const Subject = () => {
  const [mapel, setMapel] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const token = getToken();

  const data = useCallback(() => {
    const guruUrl = "/api/users";
    const subjectUrl = "/api/subject";

    const guru = axios.get(guruUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const subject = axios.get(subjectUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([guru, subject])
      .then(
        axios.spread((...allData) => {
          console.log(allData[1].data.subject);
          setTeacher(allData[0].data.filter((data) => data.level === "guru"));
          setMapel(allData[1].data.subject);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    data();
  }, []);

  const perPage = 10;
  const displayMapel = mapel.map((item, index) => {
    return <CardMapel mapel={item} key={index} />;
  });
  return (
    <div>
      <h2 className="page-header">Mata Pelajaran</h2>
      <div className="row">
        <div className="col-md-8">
          <SubjectPanel display={displayMapel} mapel={mapel} />
        </div>
        <div className="col-md-4">
          <FormSubject teacher={teacher} />
        </div>
      </div>
    </div>
  );
};

export default Subject;
