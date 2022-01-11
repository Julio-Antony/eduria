import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Schedules from "../components/class-schedules/Schedules.jsx";
import FormAdd from "../components/form-edit-schedule/FormAdd.jsx";
import TableSchedule from "../components/table/TableSchedule.jsx";
import { getToken } from "../config/Api";

const Schedule = () => {
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);

  const token = getToken();

  const getData = useCallback(() => {
    const kelasUrl = "/api/class";
    const subjectUrl = "/api/subject";
    const scheduleUrl = "/api/schedule?pageNumber=2";

    const kelas = axios.get(kelasUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const subject = axios.get(subjectUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const schedule = axios.get(scheduleUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([kelas, subject, schedule])
      .then(
        axios.spread((...allData) => {
          console.log(allData[2].data);
          setClassList(allData[0].data.kelas);
          setSubjectList(allData[1].data.subject);
          setScheduleList(allData[2].data.jadwal);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    localStorage.setItem("page", "Jadwal Pelajaran");
    getData();
  }, [getData]);

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <FormAdd class={classList} subject={subjectList} />
        </div>
        <div className="col-md-8">
          <Schedules class={classList} />
        </div>
      </div>
      <TableSchedule schedule={scheduleList} />
    </div>
  );
};

export default Schedule;
