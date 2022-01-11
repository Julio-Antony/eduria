import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import swal from "sweetalert";
import AddClass from "../components/class/AddClass";
import CardClass from "../components/class/CardClass";
import CardJadwal from "../components/class/CardJadwal";
import ClassPanel from "../components/class/ClassPanel";
import UserList from "../components/class/UserList";
import WalasPanel from "../components/class/WalasPanel";
import { getToken } from "../config/Api";

const Class = () => {
  const [kelas, setKelas] = useState([]);
  const [walas, setWalas] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [singleWalas, setSingleWalas] = useState({});

  const token = getToken();

  const data = useCallback(() => {
    const userUrl = "/api/users";
    const classesUrl = "/api/class";
    const jadwalUrl = `/api/schedule/${localStorage.getItem("kelas")}`;

    const user = axios.get(userUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const classes = axios.get(classesUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const schedule = axios.get(jadwalUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([user, classes, schedule])
      .then(
        axios.spread((...allData) => {
          setJadwal(allData[2].data);
          const selectClass = allData[1].data.kelas.find(
            (data) => data.nama_kelas === localStorage.getItem("kelas")
          );
          setSingleWalas(
            allData[0].data.find((data) => data._id === selectClass.id_walas)
          );
          setWalas(allData[0].data.filter((data) => data.level === "guru"));
          setSiswa(
            allData[0].data.filter(
              (data) =>
                data.level === "siswa" &&
                data.kelas === localStorage.getItem("kelas")
            )
          );
          setKelas(allData[1].data.kelas);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    data();
    localStorage.setItem("page", "Kelas");
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

  const displayJadwal = jadwal.map((item, index) => {
    return <CardJadwal jadwal={item} key={index} />;
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          {localStorage.getItem("level") === "admin" && (
            <ClassPanel
              display={
                localStorage.getItem("level") === "admin"
                  ? displayMapel
                  : displayJadwal
              }
              item={localStorage.getItem("level") === "admin" ? kelas : jadwal}
            />
          )}
        </div>
        <div className="col-md-4">
          {localStorage.getItem("level") === "admin" && (
            <AddClass walas={walas} refresh={data} />
          )}
          {localStorage.getItem("level") === "siswa" && (
            <WalasPanel walas={singleWalas} />
          )}
          {localStorage.getItem("level") === "siswa" && (
            <UserList siswa={siswa} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Class;
