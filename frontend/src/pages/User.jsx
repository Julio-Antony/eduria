import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import swal from "sweetalert";
import CardUser from "../components/user/CardUser";
import UserPanel from "../components/user/UserPanel";
import { getToken } from "../config/Api";
import "../components/user/user.css";

const User = () => {
  const [user, setUser] = useState([]);
  const token = getToken();

  const data = useCallback(() => {
    const usersUrl = "/api/users";

    const users = axios.get(usersUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([users])
      .then(
        axios.spread((...allData) => {
          console.log(allData[0].data);
          setUser(allData[0].data);
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
            const newData = user.filter((data) => {
              return data._id !== id;
            });
            setUser(newData);
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
  const displayUser = user.map((item, index) => {
    return (
      <CardUser
        user={item}
        key={index}
        level={item.level}
        refresh={data}
        delete={handleClick}
      />
    );
  });

  return (
    <div>
      <h2 className="page-header">Pengguna</h2>
      <div className="row">
        <div className="col-md-12">
          <UserPanel display={displayUser} user={user} />
        </div>
      </div>
    </div>
  );
};

export default User;
