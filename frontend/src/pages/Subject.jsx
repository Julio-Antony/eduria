import React, { useEffect, useState } from "react";
import SubjectPanel from "../components/subject/SubjectPanel";
import "../components/subject/subject.css";
import { getToken } from "../config/Api";
import axios from "axios";
import CardMapel from "../components/subject/CardMapel";
import FormSubject from "../components/subject/FormSubject";
import { useCallback } from "react";
import swal from "sweetalert";
import { jwtDecode } from 'jwt-decode';

const Subject = () => {
  const [mapel, setMapel] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const token = getToken();
  const role = localStorage.getItem('level')
  const decoded = jwtDecode(localStorage.getItem('access_token'));
  const myId = decoded.id
  
  const data = useCallback(() => {
    const guruUrl = "/api/users/teachers";
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
          console.log(allData[1].data.subject)
          console.log(myId)
          setTeacher(allData[0].data.teachers)
          setMapel(role === 'guru' ? allData[1].data.subject.filter((mySubjects) => mySubjects.id_guru === myId ) : allData[1].data.subject);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    localStorage.setItem("page", "Mata Pelajaran");
    data();
  }, [data]);

  const handleClick = async (id) => {
    swal({
      title: "Apa anda yakin menghapus mata pelajaran ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/subject/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            const newData = mapel.filter((data) => {
              return data._id !== id;
            });
            setMapel(newData);
          });
        swal("Mata pelajaran berhasil dihapus", {
          icon: "success",
        });
      } else {
        swal("Mata pelajaran gagal dihapus");
      }
    });
  };

  const displayMapel = mapel.map((item, index) => {
    return (
      <CardMapel
        mapel={item}
        teacher={teacher}
        key={index}
        refresh={data}
        delete={handleClick}
      />
    );
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <SubjectPanel display={displayMapel} mapel={mapel} />
        </div>
        <div className="col-md-4">
          <FormSubject teacher={teacher} refresh={data}/>
        </div>
      </div>
    </div>
  );
};

export default Subject;
