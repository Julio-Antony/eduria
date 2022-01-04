import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select, { components } from "react-select";
import swal from "sweetalert";
import { getToken } from "../../config/Api";

const FormSubject = (props) => {
  const [mapel, setMapel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [tempImage, setTempImage] = useState(null);
  const [files, setFiles] = useState("");
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
    console.log(mapel);
    const data = JSON.stringify({
      cover: files,
      nama_mapel: mapel,
      nama_guru: teacher,
    });
    axios
      .post("/api/subject", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        swal("Kelas ditambahkan", {
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

  return (
    <div className="card full-height">
      <div className="card__header">
        <h5 className="mb-5">Buat Mata Pelajaran</h5>
        <form onSubmit={handleSubmit(onFileSubmit)}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nama mata pelajaran</label>
            <input
              className="form-control"
              type="text"
              id="mapel"
              name="mapel"
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
              options={guruOptions}
              onChange={(e) => setTeacher(e.value)}
            />
          </div>
          <div className="cover-area d-flex mb-3">
            {tempImage === null ? (
              <div className="mx-auto my-auto">
                <form className="text-center">
                  <div className="form-group mx-sm-3 mb-2 mt-3">
                    <label htmlFor="file-upload" className="custom-file-upload">
                      <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                      Pilih cover
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
                      <label
                        htmlFor="file-upload"
                        className="custom-file-upload"
                      >
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSubject;
