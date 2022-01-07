import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import swal from "sweetalert";
import AddClass from "../components/class/AddClass";
import CardClass from "../components/class/CardClass";
import ClassPanel from "../components/class/ClassPanel";
import { getToken } from "../config/Api";

const Class = () => {
  const [kelas, setKelas] = useState([])
  const [walas, setWalas] = useState([])

  const token = getToken();

  const data = useCallback(() => {
    const userUrl = "/api/users";
    const classesUrl = "/api/class";

    const user = axios.get(userUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const classes = axios.get(classesUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([user, classes])
      .then(
        axios.spread((...allData) => {
          console.log(allData[1].data);
          setWalas(allData[0].data.filter((data) => data.level === "guru"));
          setKelas(allData[1].data.kelas);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    data();
  }, [data]);

  const handleClick = async (id) => {
    swal({
      title: "Apa anda yakin menghapus kelas ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/class/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            const newData = kelas.filter((data) => {
              return data._id !== id;
            });
            setKelas(newData);
          });
          const toActivity = {
            nama_pengguna: localStorage.getItem("username"),
            nama_aktivitas: "Menghapus kelas",
            status: "Berhasil",
          };
          axios
            .post("/api/activity", toActivity, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        swal("Kelas berhasil dihapus", {
          icon: "success",
        });
      } else {
        swal("Kelas gagal dihapus");
      }
    });
  };

  const perPage = 10;
  const displayMapel = kelas.map((item, index) => {
    return (
      <CardClass
        kelas={item}
        walas={walas}
        key={index}
        refresh={data}
        delete={handleClick}
      />
    );
  });

  return (
    <div>
      <h2>Kelas</h2>
      <div className="row">
        <div className="col-md-8">
          <ClassPanel display={displayMapel} kelas={kelas}/>
        </div>
        <div className="col-md-4">
          <AddClass walas={walas} refresh={data}/>
        </div>
      </div>
    </div>
  );
};

export default Class;
