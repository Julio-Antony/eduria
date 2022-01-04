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
  const [mapel, setMapel] = useState(props.data.nama_mapel);
  const [teacher, setTeacher] = useState(props.data.nama_guru);
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

  console.log(teacher);

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
    console.log(mapel);
    const data = JSON.stringify({
      cover: files1,
      nama_mapel: mapel,
      nama_guru: teacher,
    });
    axios
      .put(`/api/subject/${props.data._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        props.refresh();
        swal("Kelas diperbarui", {
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let guruOptions = props.teacher.map(function (kelas) {
    return { value: kelas.nama, label: kelas.nama };
  });

  const defValTeacher = guruOptions.filter(
    (option) => option.value === teacher
  );

  return (
    <Modal size="md" show={props.modalShow} onHide={props.close} centered>
      <div className="modal-header">
        <h3>Ubah mata pelajaran</h3>
        <span onClick={props.close} className="close-modal-btn">
          X
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <form onSubmit={handleSubmit(onFileSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Nama mata pelajaran</label>
              <input
                className="form-control"
                type="text"
                id="mapel"
                name="mapel"
                value={mapel}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("mapel")}
                placeholder="Mata Pelajaran"
                onChange={(e) => setMapel(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Nama guru</label>
              <Select
                closeMenuOnSelect={true}
                className="mt-1 mb-1"
                components={{ Placeholder }}
                placeholder={"Guru"}
                maxMenuHeight={135}
                isSingle
                value={defValTeacher}
                options={guruOptions}
                onChange={(e) => setTeacher(e.value)}
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
  );
};

export default Modals;
