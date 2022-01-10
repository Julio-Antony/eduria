import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getToken } from "../../config/Api";

const Modals = (props) => {
  console.log(props.data);
  const [judul, setJudul] = useState(props.data.judul);
  const [isi, setIsi] = useState(props.data.isi);
  const [files1, setFiles1] = useState(props.data.gambar || null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function Upload(event) {
    event.preventDefault();
    let file_reader1 = new FileReader();
    let file1 = event.target.files[0];
    file_reader1.onload = () => {
      setFiles1(
        file_reader1.result.substr(file_reader1.result.indexOf(",") + 1)
      );
    };

    if (file1) {
      file_reader1.readAsDataURL(file1);
    }
  }

  const token = getToken();

  function onSubmit() {
    const data = JSON.stringify({
      gambar: files1,
      judul: judul,
      isi: isi,
      penyunting: localStorage.getItem("username"),
    });
    axios
      .put(`/api/posts/${props.data._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("foto", files1);
        const toActivity = {
          nama_pengguna: localStorage.getItem("username"),
          nama_aktivitas: "Mengubah Pengumuman",
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
        props.refresh();
        swal("Pengumuman diperbarui", {
          icon: "success",
        });
        props.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal size="md" show={props.modalShow} onHide={props.close} centered>
      <div className="modal-header">
        <h3>Ubah Pengumumnan</h3>
        <span onClick={props.close} className="close-modal-btn">
          X
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Judul</label>
              <input
                className="form-control"
                type="text"
                id="judul"
                name="judul"
                value={judul}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("judul")}
                placeholder="Judul"
                onChange={(e) => setJudul(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Isi</label>
              <textarea
                className="form-control"
                type="text"
                id="isi"
                name="isi"
                value={isi}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("isi")}
                placeholder="Deskripsi"
                onChange={(e) => setIsi(e.target.value)}
                required
              />
            </div>

            <div className="cover-area d-flex mb-3">
              {files1 === null ? (
                <div className="mx-auto my-auto">
                  <form className="text-center">
                    <div className="form-group mx-sm-3 mb-2 mt-3">
                      <label htmlFor="file-edit" className="custom-file-upload">
                        <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                        Pilih foto
                      </label>
                      <input
                        id="file-edit"
                        onChange={Upload}
                        accept=".jpeg, .jpg, .png"
                        type="file"
                      />
                    </div>
                  </form>
                </div>
              ) : (
                <div className="img-container">
                  <img
                    className="mx-auto"
                    src={"data:image/png;base64," + files1}
                    alt="face"
                  />
                  <div className="middle">
                    <form className="text-center">
                      <div className="form-group mx-sm-3 mb-2 mt-3">
                        <label
                          htmlFor="edit-upload"
                          className="custom-file-upload"
                        >
                          Ganti Foto
                        </label>
                        <input
                          id="edit-upload"
                          onChange={Upload}
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
            <button type="submit" className="btn btn-primary">
              Perbarui
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Modals;
