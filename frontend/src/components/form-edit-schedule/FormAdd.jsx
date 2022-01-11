import axios from "axios";
import React, { useState } from "react";
import Select, { components } from "react-select";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getToken } from "../../config/Api.jsx";
import "./form.css";

const FormAdd = (props) => {
  const [kelas, setKelas] = useState("");
  const [hari, setHari] = useState("");
  const [waktu, setWaktu] = useState("");
  const [mapel, setMapel] = useState("");
  const [guru, setGuru] = useState("");
  const [submit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(props.teacher);

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  const token = getToken();

  let kelasOptions = props.class.map(function (kelas) {
    return { value: kelas.nama_kelas, label: kelas.nama_kelas };
  });

  let subjectOptions = props.subject.map(function (subject) {
    return { value: subject.nama_mapel, label: subject.nama_mapel };
  });

  let teacherOptions = props.teacher.map(function (guru) {
    return { value: guru.nama, label: guru.nama };
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
      waktu: waktu,
      mapel: mapel,
      guru: guru,
    };

    axios
      .post("/api/schedule", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        props.refresh();
        swal("Jadwal ditambahkan", {
          icon: "success",
        });
      })
      .catch((err) => {
        setSubmit(false);
        console.log(err);
        if (err.response.status === 400) {
          swal("Jadwal sudah ada !", {
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="card full-height">
      <div className="card__header">
        <h3 className="mb-3">Buat Jadwal</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kelas</label>
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
          <label htmlFor="exampleInputPassword1">Hari</label>
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
          <label htmlFor="exampleInputPassword1">Waktu</label>
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
          <label htmlFor="exampleInputPassword1">Mata Pelajaran</label>
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
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Guru</label>
          <Select
            closeMenuOnSelect={true}
            className="mt-1 mb-1"
            components={{ Placeholder }}
            placeholder={"Guru"}
            maxMenuHeight={135}
            isSingle
            options={teacherOptions}
            onChange={(e) => setGuru(e.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Buat
        </button>
      </form>
    </div>
  );
};

export default FormAdd;
