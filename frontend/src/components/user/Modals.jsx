import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select, { components } from "react-select";
import swal from "sweetalert";
import { getToken } from "../../config/Api";

const Modals = (props) => {
  // console.log(props);
  const [user, setUser] = useState(props.data.nama);
  const [level, setLevel] = useState(props.level);
  const [tempImage1, setTempImage1] = useState(null);
  const [files1, setFiles1] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  const token = getToken();

  function Upload(event) {
    event.preventDefault();
    let file_reader1 = new FileReader();
    let file1 = event.target.files[0];
    if (event.target.files.length !== 0) {
      setTempImage1(URL.createObjectURL(event.target.files[0]));
    }
    file_reader1.onload = () => {
      setFiles1(
        file_reader1.result.substr(file_reader1.result.indexOf(",") + 1)
      );
    };

    if (file1) {
      file_reader1.readAsDataURL(file1);
    }
  }

  function onFileSubmit() {
    console.log(user);
    const data = JSON.stringify({
      foto: files1,
      nama: user,
      level: level,
    });
    axios
      .put(`/api/users/${props.data._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const toActivity = {
          nama_pengguna: localStorage.getItem("username"),
          nama_aktivitas: "Mengubah data pengguna",
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
        swal("Informasi Pengguna diperbarui", {
          icon: "success",
        });
        props.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const levelOptions = [
    { value: "siswa", label: "Siswa" },
    { value: "guru", label: "Guru" },
    { value: "admin", label: "Admin" },
  ];

  const defValLevel = levelOptions.filter((option) => option.value === level);

  return (
    <Modal size="md" show={props.modalShow} onHide={props.close} centered>
      <div className="modal-header">
        <h3>Ubah data pengguna</h3>
        <span onClick={props.close} className="close-modal-btn">
          X
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <form onSubmit={handleSubmit(onFileSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Nama</label>
              <input
                className="form-control"
                type="text"
                id="mapel"
                name="mapel"
                value={user}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("mapel")}
                placeholder="Mata Pelajaran"
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Level</label>
              <Select
                closeMenuOnSelect={true}
                className="mt-1 mb-1"
                components={{ Placeholder }}
                placeholder={"Level"}
                maxMenuHeight={135}
                isSingle
                value={defValLevel}
                options={levelOptions}
                onChange={(e) => setLevel(e.value)}
              />
            </div>
            <div className="cover-area d-flex mb-3">
              {tempImage1 === null ? (
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
                  <img className="mx-auto" src={tempImage1} alt="face" />
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
