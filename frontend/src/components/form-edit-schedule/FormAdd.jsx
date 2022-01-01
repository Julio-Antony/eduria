import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getToken } from "../../config/Api.jsx";
import "./form.css";

const FormAdd = () => {
  const [kelas, setKelas] = useState("");
  const [hari, setHari] = useState("");
  const [waktu, setWaktu] = useState("");
  const [mapel, setMapel] = useState("");
  const [id, setId] = useState("");
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  const token = getToken();

  const getData = useCallback(() => {
    const kelasUrl = "/api/class";
    const subjectUrl = "/api/subject";

    const kelas = axios.get(kelasUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const subject = axios.get(subjectUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([kelas, subject])
      .then(
        axios.spread((...allData) => {
          console.log(allData[1].data.subject);
          setClassList(allData[0].data.kelas);
          setSubjectList(allData[1].data.subject);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  let kelasOptions = classList.map(function (kelas) {
    return { value: kelas.nama_kelas, label: kelas.nama_kelas };
  });

  let subjectOptions = subjectList.map(function (subject) {
    return { value: subject.nama_mapel, label: subject.nama_mapel };
  });

  const hariOptions = [
    { value: "senin", label: "Senin" },
    { value: "selasa", label: "Selasa" },
    { value: "rabu", label: "Rabu" },
    { value: "kamis", label: "Kamis" },
    { value: "jum'at", label: "Jum'at" },
  ];

  const waktuOptions = [
    { value: "07:00 - 08:20", label: "07:00 - 08:20" },
    { value: "08:20 - 10:10", label: "08:20 - 10:10" },
    { value: "10:10 - 11:30", label: "10:10 - 11:30" },
    { value: "11:30 - 12:50", label: "11:30 - 12:50" },
    { value: "13:10 - 14:30", label: "13:10 - 14:30" },
  ];

  const onSubmit = () => {
    setSubmit(true);
    const data = {
      kelas: kelas,
      hari: hari,
    };

    const sesi = {
      kelas: kelas,
      waktu: waktu,
      mapel: mapel,
    };

    axios
      .post("/api/schedule", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.createdSchedule._id);
        axios
          .post(`/api/schedule/${res.data.createdSchedule._id}/session`, sesi, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            setSubmit(false);
            swal("Jadwal ditambahkan", {
              icon: "success",
            });
          })
          .catch((err) => {
            setSubmit(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setSubmit(false);
        console.log(err);
      });
  };

  return (
    <div className="card full-height">
      <div className="card__header">
        <h3 className="mb-3">Buat Jadwal</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label for="exampleInputEmail1">Kelas</label>
          <Select
            closeMenuOnSelect={true}
            className="mt-1 mb-1"
            components={{ Placeholder }}
            placeholder={"Kelas"}
            maxMenuHeight={135}
            isSingle
            options={kelasOptions}
            onChange={(e) => setKelas(e.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Hari</label>
          <Select
            closeMenuOnSelect={true}
            className="mt-1 mb-1"
            components={{ Placeholder }}
            placeholder={"Hari"}
            maxMenuHeight={135}
            isSingle
            options={hariOptions}
            onChange={(e) => setHari(e.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Waktu</label>
          <Select
            closeMenuOnSelect={true}
            className="mt-1 mb-1"
            components={{ Placeholder }}
            placeholder={"Waktu"}
            maxMenuHeight={135}
            isSingle
            options={waktuOptions}
            onChange={(e) => setWaktu(e.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Mata Pelajaran</label>
          <Select
            closeMenuOnSelect={true}
            className="mt-1 mb-1"
            components={{ Placeholder }}
            placeholder={"Mata Pelajaran"}
            maxMenuHeight={135}
            isSingle
            options={subjectOptions}
            onChange={(e) => setMapel(e.value)}
          />
        </div>
        <button type="submit" className="btn btn-form">
          Buat
        </button>
      </form>
    </div>
  );
};

export default FormAdd;
