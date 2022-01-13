import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../config/Api";

const StudentSchedule = () => {
  const [dataTable, setDataTable] = useState([]);

  const token = getToken();
  const getKelas = localStorage.getItem("kelas")

  useEffect(() => {
    axios
      .get(`/api/schedule/${getKelas}`, {
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
  }, [token, getKelas]);

  return (
    <div className="card full-height">
      <div className="row">
        <div className="col-md-8">
          <h2 className="page-header">Jadwal Kelas</h2>
        </div>
      </div>
      {dataTable ? (
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
            {dataTable.filter((data) => data.waktu === "07:00 - 08:20").map((item, index) => (
                <td key={index}>
                  <p className="text-schedule">{item.waktu}</p>
                  <p>{item.mapel}</p>
                </td>
            ))}
            </tr>
            <tr>
            {dataTable.filter((data) => data.waktu === "08:20 - 10:10").map((item, index) => (
                <td key={index}>
                  <p className="text-schedule">{item.waktu}</p>
                  <p>{item.mapel}</p>
                </td>
            ))}
            </tr>
            <tr>
            {dataTable.filter((data) => data.waktu === "10:10 - 11:30").map((item, index) => (
                <td key={index}>
                  <p className="text-schedule">{item.waktu}</p>
                  <p>{item.mapel}</p>
                </td>
            ))}
            </tr>
            <tr>
            {dataTable.filter((data) => data.waktu === "11:30 - 12:50").map((item, index) => (
                <td key={index}>
                  <p className="text-schedule">{item.waktu}</p>
                  <p>{item.mapel}</p>
                </td>
            ))}
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default StudentSchedule;
