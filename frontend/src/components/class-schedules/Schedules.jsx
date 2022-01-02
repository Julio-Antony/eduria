import React from "react";
import "./schedule.css";
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
      <div className="row">
        <div className="col-md-8">
          <h2 className="page-header">Jadwal Kelas</h2>
        </div>
        <div className="col-md-4">
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
        </div>
      </div>
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
              <td>
                {dataTable
                  .filter((data) => data.hari === "senin")
                  .map((item, index) => (
                    <div key={index}>
                      <p className="text-schedule">{item.waktu}</p>
                      <p>{item.mapel}</p>
                    </div>
                  ))}
              </td>
              <td>
                {dataTable
                  .filter((data) => data.hari === "selasa")
                  .map((item, index) => (
                    <div key={index}>
                      <p className="text-schedule">{item.waktu}</p>
                      <p>{item.mapel}</p>
                    </div>
                  ))}
              </td>
              <td>
                {dataTable
                  .filter((data) => data.hari === "rabu")
                  .map((item, index) => (
                    <div key={index}>
                      <p className="text-schedule">{item.waktu}</p>
                      <p>{item.mapel}</p>
                    </div>
                  ))}
              </td>
              <td>
                {dataTable
                  .filter((data) => data.hari === "kamis")
                  .map((item, index) => (
                    <div key={index}>
                      <p className="text-schedule">{item.waktu}</p>
                      <p>{item.mapel}</p>
                    </div>
                  ))}
              </td>
              <td>
                {dataTable
                  .filter((data) => data.hari === "jum'at")
                  .map((item, index) => (
                    <div key={index}>
                      <p className="text-schedule">{item.waktu}</p>
                      <p>{item.mapel}</p>
                    </div>
                  ))}
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Schedules;
