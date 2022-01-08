import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getToken } from "../../config/Api";

const AddPost = (props) => {
  const [posts, setPosts] = useState("");
  const [judul, setJudul] = useState("");
  const [tempImage, setTempImage] = useState(null);
  const [files, setFiles] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = getToken();

  function onFileUpload(event) {
    event.preventDefault();
    let file_reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files.length !== 0) {
      setTempImage(URL.createObjectURL(event.target.files[0]));
    }
    file_reader.onload = () => {
      setFiles(file_reader.result.substr(file_reader.result.indexOf(",") + 1));
    };

    if (file) {
      file_reader.readAsDataURL(file);
    }
  }

  function onFileSubmit() {
    const data = JSON.stringify({
      gambar: files,
      judul: judul,
      isi: posts,
      pembuat: localStorage.getItem("username"),
    });
    axios
      .post("/api/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        props.refresh();
        const toActivity = {
          nama_pengguna: localStorage.getItem("username"),
          nama_aktivitas: "Menambahkan kelas",
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
        swal("Pengumuman ditambahkan", {
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="card">
      <div className="card__header">
        <h3 className="mb-3">Buat Pengumuman</h3>
      </div>
      <form onSubmit={handleSubmit(onFileSubmit)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Judul</label>
          <input
            className="form-control"
            type="text"
            id="judul"
            name="judul"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("judul")}
            placeholder="Judul"
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Isi Pengumuman</label>
          <input
            className="form-control"
            type="text"
            id="pengumuman"
            name="pengumuman"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("pengumuman")}
            placeholder="Deskripsi"
            onChange={(e) => setPosts(e.target.value)}
            required
          />
        </div>
        <div className="cover-area d-flex mb-3">
          {tempImage === null ? (
            <div className="mx-auto my-auto">
              <form className="text-center">
                <div className="form-group mx-sm-3 mb-2 mt-3">
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                    Pilih Gambar
                  </label>
                  <input
                    id="file-upload"
                    onChange={onFileUpload}
                    accept=".jpeg, .jpg, .png"
                    type="file"
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className="img-container">
              <img className="mx-auto" src={tempImage} alt="face" />
              <div className="middle">
                <form className="text-center">
                  <div className="form-group mx-sm-3 mb-2 mt-3">
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Ganti Foto
                    </label>
                    <input
                      id="file-upload"
                      onChange={onFileUpload}
                      className=""
                      accept=".jpeg, .jpg, .png"
                      type="file"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Terbitkan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
