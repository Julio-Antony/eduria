import React, { useCallback, useState } from "react";
import Select, { components } from "react-select";
import { getToken } from "../../config/Api.jsx";
import "./form.css";

const FormAdd = () => {
  const [kelas, setKelas] = useState("");
  const [hari, setHari] = useState("");
  const [waktu, setWaktu] = useState("");

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  const token = getToken();

  const getData = useCallback(() => {
    const kelasUrl = "/api/kelas";
  });

  const hariOptions = [
    { value: "senin", label: "Senin" },
    { value: "selasa", label: "Selasa" },
    { value: "rabu", label: "Rabu" },
    { value: "kamis", label: "Kamis" },
    { value: "jum'at", label: "Jum'at" },
  ];

  const waktuOptions = [
    { value: "07:00", label: "07:00" },
    { value: "08:20", label: "08:20" },
    { value: "10:10", label: "10:10" },
    { value: "11:30", label: "11:30" },
    { value: "13:10", label: "13:10" },
  ];

  return (
    <div className="card full-height">
      <div className="card__header">
        <h3>Buat Jadwal</h3>
      </div>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Kelas</label>
          <Select
            closeMenuOnSelect={true}
            className="mt-1 mb-1"
            components={{ Placeholder }}
            placeholder={"Kelas"}
            maxMenuHeight={135}
            isSingle
            // options={hariOptions}
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
            // options={genderOptions}
            // onChange={(e) => setGender(e.value)}
          />
        </div>
        <button type="submit" className="btn btn-form">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormAdd;
