import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Select, { components } from "react-select";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getToken } from "../../config/Api";

const UpdateModal = (props) => {
  const [user, setUser] = useState(props.data.nama);
  const [level, setLevel] = useState(props.data.level);
  const [nip, setNip] = useState(props.data.identitas.no_induk);
  const [kelas, setKelas] = useState(props.data.kelas || "");
  const [gender, setGender] = useState(props.data.identitas.jenis_kelamin);
  const [agama, setAgama] = useState(props.data.identitas.agama);
  const [tl, setTl] = useState(props.data.identitas.tempat_lahir);
  const [tgl, setTgl] = useState(props.data.identitas.tanggal_lahir);
  const [phone, setPhone] = useState(props.data.identitas.no_telepon);
  const [alamat, setAlamat] = useState(props.data.identitas.alamat);
  const [files1, setFiles1] = useState(props.data.foto);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = getToken();

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

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

  function onFileSubmit() {
    console.log(user);
    const data = JSON.stringify({
      foto: files1,
      nama: user,
      level: level,
      no_induk: nip,
      jenis_kelamin: gender,
      agama: agama,
      tempat_lahir: tl,
      tanggal_lahir: tgl,
      no_telepon: phone,
      alamat: alamat,
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
        props.close();
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

  const genderOptions = [
    { value: "Laki-Laki", label: "Laki-Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ];

  const defValGender = genderOptions.filter(
    (option) => option.value === gender
  );

  const agamaOptions = [
    { value: "Islam", label: "Islam" },
    { value: "Kristen", label: "Kristen" },
    { value: "Katolik", label: "Katolik" },
    { value: "Hindu", label: "Hindu" },
    { value: "Budha", label: "Budha" },
    { value: "Konghuchu", label: "Konghuchu" },
    { value: "Lainnya", label: "Lainnya" },
  ];

  const defValAgama = agamaOptions.filter((option) => option.value === agama);

  return (
    <Modal size="xl" show={props.modalShow} onHide={props.close} centered>
      <div className="modal-header">
        <h3>Ubah data pengguna</h3>
        <span onClick={props.close} className="close-modal-btn">
          X
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <form onSubmit={handleSubmit(onFileSubmit)}>
            <div className="row">
              <div className="col-md-6">
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
                  <label htmlFor="exampleInputEmail1">No. Induk</label>
                  <input
                    className="form-control"
                    type="text"
                    id="no_induk"
                    name="no_induk"
                    value={nip}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("no_induk")}
                    placeholder="No. Induk"
                    onChange={(e) => setNip(e.target.value)}
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
                <div className="form-group">
                  <label for="exampleInputPassword1">Jenis Kelamin</label>
                  <Select
                    closeMenuOnSelect={true}
                    className="mt-1 mb-1"
                    components={{ Placeholder }}
                    placeholder={"Jenis Kelamin"}
                    maxMenuHeight={135}
                    isSingle
                    value={defValGender}
                    options={genderOptions}
                    onChange={(e) => setGender(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Agama</label>
                  <Select
                    closeMenuOnSelect={true}
                    className="mt-1 mb-1"
                    components={{ Placeholder }}
                    placeholder={"Agama"}
                    maxMenuHeight={135}
                    isSingle
                    value={defValAgama}
                    options={agamaOptions}
                    onChange={(e) => setAgama(e.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tempat Lahir</label>
                  <input
                    className="form-control"
                    type="text"
                    id="tempat_lahir"
                    name="tempat_lahir"
                    value={tl}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("tempat_lahir")}
                    placeholder="Tempat Lahir"
                    onChange={(e) => setTl(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tanggal Lahir</label>
                  <input
                    className="form-control"
                    type="date"
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    value={tgl}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("tanggal_lahir")}
                    placeholder="Tanggal_lahir"
                    onChange={(e) => setTgl(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">No. Telepon</label>
                  <input
                    className="form-control"
                    type="text"
                    id="no_telepon"
                    name="no_telepon"
                    value={phone}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("no_telepon")}
                    placeholder="No. Telepon"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Alamat</label>
                  <input
                    className="form-control"
                    type="text"
                    id="alamat"
                    name="alamat"
                    value={alamat}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("alamat")}
                    placeholder="Alamat"
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                </div>
                <label htmlFor="exampleInputEmail1">Foto</label>
                <div className="cover-area d-flex mb-3">
                  {files1 === null ? (
                    <div className="mx-auto my-auto">
                      <form className="text-center">
                        <div className="form-group mx-sm-3 mb-2 mt-3">
                          <label
                            htmlFor="file-edit"
                            className="custom-file-upload"
                          >
                            <FontAwesomeIcon
                              icon={faFileUpload}
                              className="mr-2"
                            />
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
              </div>
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

export default UpdateModal;
