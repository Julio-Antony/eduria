import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import swal from "sweetalert";
import AddPost from "../components/home/AddPost";
import PostCard from "../components/home/PostCard";
import PostPanel from "../components/home/PostPanel";
import { getToken } from "../config/Api";
import "../components/home/home.css";

const Home = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const token = getToken();

  const data = useCallback(() => {
    const postsUrl = "/api/posts";

    const posts = axios.get(postsUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([posts])
      .then(
        axios.spread((...allData) => {
          console.log(allData[0].data);
          setPengumuman(allData[0].data.posts);
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
      title: "Apa anda yakin menghapus pengumuman ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            const toActivity = {
              nama_pengguna: localStorage.getItem("username"),
              nama_aktivitas: "Menghapus Pengumuman",
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
            const newData = pengumuman.filter((data) => {
              return data._id !== id;
            });
            setPengumuman(newData);
          });
        swal("Pengumuman berhasil dihapus", {
          icon: "success",
        });
      } else {
        swal("Pengumuman gagal dihapus");
      }
    });
  };

  const perPage = 10;
  const displayUser = pengumuman.map((item, index) => {
    return (
      <PostCard
        pengumuman={item}
        key={index}
        level={item.level}
        refresh={data}
        delete={handleClick}
      />
    );
  });

  return (
    <div>
      <h2 className="page-header">Pengumuman</h2>
      <div className="row">
        <div className="col-md-8">
          <PostPanel display={displayUser} pengumuman={pengumuman} />
        </div>
        <div className="col-md-4">
          {localStorage.getItem("level") === "admin" && (
            <AddPost refresh={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
