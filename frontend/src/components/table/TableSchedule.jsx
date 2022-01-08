import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const TableSchedule = () => {
  const columns = [
    {
      name: "Kelas",
      selector: (row) => row.kelas,
    },
    {
      name: "Hari",
      selector: (row) => row.hari,
    },
    {
      name: "Waktu",
      selector: (row) => row.waktu,
    },
    {
      name: "Mata Pelajaran",
      selector: (row) => row.mapel,
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const fetchUsers = async (page) => {
    setLoading(true);

    const response = await axios.get(`/api/schedule?pageNumber=${page}`);

    setData(response.data.jadwal);
    setTotalRows(response.data.count);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (page) => {
    setLoading(true);

    const response = await axios.get(`/api/schedule?pageNumber=${page}`);

    setData(response.data.jadwal);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, []);

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data);

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
      className="btn btn-primary"
    >
      Export
    </button>
  );
  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  return (
    <div className="card full-height">
      <div className="card__header">
        <h3>Daftar Jadwal</h3>
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
  );
};

export default TableSchedule;
