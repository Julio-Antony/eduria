import React from "react";
import { getToken } from "../../config/Api";
import Select, { components } from "react-select";
import { useState } from "react";
import axios from "axios";

const Schedules = (props) => {
  const [kelas, setKelas] = useState("");
  const [dataTable, setDataTable] = useState([]);

  const token = getToken();

  const onChangeSchedule = (e) => {
    setKelas(e.value);

    axios
      .get(`/api/schedule/${e.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setDataTable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  let kelasOptions = props.class.map(function (kelas) {
    return { value: kelas.nama_kelas, label: kelas.nama_kelas };
  });

  return (
    <div className="card full-height">
      <Select
        closeMenuOnSelect={true}
        className="mt-1 mb-1"
        components={{ Placeholder }}
        placeholder={"Pilih kelas"}
        maxMenuHeight={135}
        isSingle
        options={kelasOptions}
        onChange={onChangeSchedule}
      />
      {dataTable.length > 0 ? (
        <table>
          <thead>
            <tr className="ml-2">
              <th>Senin</th>
              <th>Selasa</th>
              <th>Rabu</th>
              <th>Kamis</th>
              <th>Jum'at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>asd</td>
              <td>asd</td>
              <td>asd</td>
              <td>asd</td>
              <td>asw</td>
            </tr>
            <tr>
              {dataTable.map((data, i) => (
                <td key={i}>
                  {data.sesi.map((sesi, index) => (
                    <small className="d-flex mb-2" key={index}>
                      {sesi.mapel}
                      <br></br>
                      {sesi.waktu}
                    </small>
                  ))}
                </td>
              ))}
            </tr>
            <tr>
              <td>{dataTable.find()}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Schedules;
