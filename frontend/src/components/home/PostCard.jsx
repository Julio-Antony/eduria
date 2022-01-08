import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import moment from "moment-timezone";
import React, { useCallback, useEffect, useState } from "react";
import { getLevel, getToken } from "../../config/Api";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Comment from "./Comment";

const PostCard = (props) => {
  const [author, setAuthor] = useState({});
  const [comment, setComment] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = getToken();

  const data = useCallback(() => {
    const authorsUrl = "/api/users";

    const posts = axios.get(authorsUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([posts])
      .then(
        axios.spread((...allData) => {
          setAuthor(
            allData[0].data.find((user) => user._id === props.pengumuman.user)
          );
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    data();
  }, [data]);

  console.log(props.pengumuman.komentar);

  const dataComment = {
    nama: localStorage.getItem("username"),
    komentar: comment,
  };

  const sendComment = () => {
    axios
      .post(`/api/posts/${props.pengumuman._id}/comment`, dataComment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        props.refresh();
        const toActivity = {
          nama_pengguna: localStorage.getItem("username"),
          nama_aktivitas: "Mengomentari pengumuman",
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
        swal("Komentar ditambahkan", {
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <div className="row">
          <div className="col-md-1">
            <div className="author-img-wrapper">
              <img
                src={"data:image/png;base64," + author.foto}
                alt="foto-author"
              />
            </div>
          </div>
          <div className="col-md-9">
            <p className="ml-2">{props.pengumuman.pembuat}</p>
            <p className="ml-2" style={{ marginTop: "-14px" }}>
              {moment(props.pengumuman.createdAt.substring(0, 16))
                .tz("Pacific/Honolulu")
                .format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
          {getLevel() === "admin" && (
            <div className="col-md-2 row">
              <FontAwesomeIcon icon={faPencilAlt} className="post-icon" />
              <FontAwesomeIcon icon={faTrash} className="post-icon ml-4" />
            </div>
          )}
        </div>
      </div>
      {props.pengumuman.gambar && (
        <img
          className="post-card-image"
          src={"data:image/png;base64," + props.pengumuman.gambar}
          alt="gambar"
        />
      )}
      <div className="post-card-body p-3">
        <h5 className="text-success">{props.pengumuman.judul}</h5>
        <p>{props.pengumuman.isi}</p>
      </div>
      <div className="post-card-footer p-3">
        {props.pengumuman.komentar.length > 0 &&
          props.pengumuman.komentar.map((komentar, index) => (
            <Comment comment={komentar} key={index} />
          ))}
        <form onSubmit={handleSubmit(sendComment)}>
          <div className="form-group row">
            <div className="comment-img-warpper ml-3">
              <img
                src={"data:image/png;base64," + localStorage.getItem("foto")}
                alt="gambar"
              />
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                name="comment"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("comment")}
                className="form-control"
                id="comment"
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success">
                Komentari
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
