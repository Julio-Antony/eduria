import axios from 'axios';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { getToken } from '../../config/Api';
import Select, { components } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const Modals = (props) => {
    const [kelas, setKelas] = useState(props.data.nama_kelas);
  const [walas, setWalas] = useState(props.data.wali_kelas);
  const [jurusan, setJurusan] = useState(props.data.jurusan)
  const [tempImage1, setTempImage1] = useState(null);
  const [files1, setFiles1] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(props.walas)

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
    console.log(kelas);
    const data = JSON.stringify({
      cover: files1,
      nama_kelas: kelas,
      wali_kelas: walas,
    });
    axios
      .put(`/api/class/${props.data._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const toActivity = {
          nama_pengguna: localStorage.getItem("username"),
          nama_aktivitas: "Mengubah data kelas",
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
        swal("Kelas diperbarui", {
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let walasOptions = props.walas.map(function (walas) {
    return { value: walas.nama, label: walas.nama };
  });

  const defValWalas = walasOptions.filter(
    (option) => option.value === walas
  );

    return (
        <Modal size="md" show={props.modalShow} onHide={props.close} centered>
      <div className="modal-header">
        <h3>Ubah data kelas</h3>
        <span onClick={props.close} className="close-modal-btn">
          X
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <form onSubmit={handleSubmit(onFileSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Nama Kelas</label>
              <input
                className="form-control"
                type="text"
                id="kelas"
                name="kelas"
                value={kelas}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("kelas")}
                placeholder="Nama Kelas"
                onChange={(e) => setKelas(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Nama Wali Kelas</label>
              <Select
                closeMenuOnSelect={true}
                className="mt-1 mb-1"
                components={{ Placeholder }}
                placeholder={"wali kelas"}
                maxMenuHeight={135}
                isSingle
                value={defValWalas}
                options={walasOptions}
                onChange={(e) => setWalas(e.value)}
              />
            </div>
            <div className="cover-area d-flex mb-3">
              {tempImage1 === null ? (
                <div className="mx-auto my-auto">
                  <form className="text-center">
                    <div className="form-group mx-sm-3 mb-2 mt-3">
                      <label htmlFor="file-edit" className="custom-file-upload">
                        <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                        Pilih cover
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
    )
}

export default Modals
