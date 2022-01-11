import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { getToken } from "../config/Api";
import "../components/class/class.css";
import CardUser from "../components/user/CardUser";
import swal from "sweetalert";
import BodyWrapper from "../components/class/BodyWrapper";

const ClassDetail = ({ match }) => {
  const [dataKelas, setDataKelas] = useState({});
  const [imgWalas, setImgWalas] = useState("");
  const [dataSiswa, setDataSiswa] = useState([]);

  const id = match.params.id;
  const token = getToken();

  const refresh = useCallback(() => {
    const classUrl = `/api/class/${id}`;
    const userUrl = "/api/users";

    const getClass = axios.get(classUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const getUser = axios.get(userUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([getClass, getUser])
      .then(
        axios.spread((...allData) => {
          setDataSiswa(
            allData[1].data.filter(
              (data) =>
                data.level === "siswa" &&
                data.kelas === allData[0].data.nama_kelas
            )
          );
          setDataKelas(allData[0].data);
          axios
            .get(`/api/users/${allData[0].data.id_walas}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              setImgWalas(res.data.foto);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  useEffect(() => {
    localStorage.setItem("page", "Detail Kelas");
    refresh();
  }, [refresh]);

  const handleClick = async (id) => {
    swal({
      title: "Apa anda yakin menghapus pengguna ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            const toActivity = {
              nama_pengguna: localStorage.getItem("username"),
              nama_aktivitas: "Menghapus Pengguna",
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
            const newData = dataSiswa.filter((data) => {
              return data._id !== id;
            });
            setDataSiswa(newData);
          });
        swal("Pengguna berhasil dihapus", {
          icon: "success",
        });
      } else {
        swal("Mata pelajaran gagal dihapus");
      }
    });
  };

  const perPage = 10;
  const displayUser = dataSiswa.map((item, index) => {
    return (
      <CardUser
        user={item}
        key={index}
        level={item.level}
        refresh={refresh}
        delete={handleClick}
      />
    );
  });

  return (
    <div className="container-fluid">
      <div className="class-detail-section">
        <div className="class-detail-header">
          <div className="header-overlay row">
            <div className="col-md-4">
              <div className="img-walas">
                <img
                  src={"data:image/png;base64," + imgWalas}
                  alt="gambar walas"
                />
              </div>
            </div>
            <div className="col-md-8">
              <h1>{dataKelas.nama_kelas}</h1>
              <h3 className="text-center">{dataKelas.jurusan}</h3>
              <p className="text-center">Wali Kelas : {dataKelas.wali_kelas}</p>
            </div>
          </div>
          <img
            src={"data:image/png;base64," + dataKelas.cover}
            alt="gambar sampul"
            className="class-cover"
          />
        </div>
        <div className="class-detail-body">
          <BodyWrapper display={displayUser} user={dataSiswa} />
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
