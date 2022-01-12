import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../config/Api";

const StudentSchedule = () => {
  const [dataTable, setDataTable] = useState([]);

  const token = getToken();

  useEffect(() => {
    axios
      .get(`/api/schedule/${localStorage.getItem("kelas")}`, {
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
  });
  return (
    <div className="card full-height">
      <div className="row">
        <div className="col-md-8">
          <h2 className="page-header">Jadwal Kelas</h2>
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

export default StudentSchedule;
