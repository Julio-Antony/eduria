import axios from "axios";
import moment from "moment-timezone";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getToken } from "../config/Api";

const Log = () => {
  const columns = [
    {
      name: "Pengguna",
      selector: (row) => row.nama_pengguna,
    },
    {
      name: "Aktivitas",
      selector: (row) => row.nama_aktivitas,
    },
    {
      name: "Tanggal",
      selector: (row) =>
        moment(row.createdAt.substring(0, 16))
          .tz("Pacific/Honolulu")
          .format("YYYY-MM-DD HH:mm"),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  const token = getToken();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  // const fetchUsers = async (page) => {
  //   setLoading(true);

  //   const response = await axios.get(`/api/activity?pageNumber=${page}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });

  //   setData(response.data.aktivitas);
  //   setTotalRows(response.data.count);
  //   setLoading(false);
  // };

  const fetchdata = useCallback(
    (page) => {
      setLoading(true);

      const activityUrl = `/api/activity?pageNumber=${page}`;

      const activity = axios.get(activityUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      axios
        .all([activity])
        .then(
          axios.spread((...allData) => {
            console.log(allData[0].data);
            setData(allData[0].data.aktivitas);
            setTotalRows(allData[0].data.count);
            setLoading(false);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    },
    [token]
  );

  const handlePageChange = (page) => {
    fetchdata(page);
  };

  const handlePerRowsChange = async (page) => {
    setLoading(true);

    const response = await axios.get(`/api/activity?pageNumber=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(response.data.aktivitas);
    setLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("page", "Log Aktivitas");
    fetchdata(1); // fetch page 1 of users
  }, [fetchdata]);

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data);
    console.log(data);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <button
      onClick={(e) => onExport(e.target.value)}
      className="btn btn-success"
    >
      Export
    </button>
  );
  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    [data, downloadCSV]
  );

  return (
    <div>
      <div className="card full-height">
        <div className="card__header">
          <DataTable
            columns={columns}
            actions={actionsMemo}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Log;
