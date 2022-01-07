import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { getToken } from "../config/Api";
import { useForm } from "react-hook-form";
import "../components/subject/subject.css";
import DocView from "../components/subject/DocView";
import swal from "sweetalert";

const SubjectDetail = ({ match }) => {
  const [mapel, setMapel] = useState([]);
  const [mapelList, setMapelList] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [count, setCount] = useState(0);
  const [add, setAdd] = useState("yes");
  const [silabus, setSilabus] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tgl, setTgl] = useState("");
  const [discuss, setDiscuss] = useState([]);
  const [file, setFile] = useState("");
  const [attachment, setAttachment] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = match.params.id;
  const token = getToken();

  console.log(add);

  const refresh = useCallback(() => {
    const url = `/api/subject/${id}`;

    const getData = axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([getData])
      .then(
        axios.spread((...allData) => {
          if (allData[0].data.materi.length > 0) {
            setAdd("no");
            console.log(allData[0].data.materi);
            setMapelList(allData[0].data.materi);
            setMapel(allData[0].data.materi[0]);
            setAttachment(allData[0].data.materi[0].attachment);
            setCount(allData[0].data.materi.length);
          } else {
            setAdd("yes");
          }
          setSubtitle(allData[0].data.nama_mapel);
          setTeacher(allData[0].data.nama_guru);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const dataSilabus = {
    attachment: attachment,
    deskripsi: deskripsi,
    nama_materi: silabus,
    pertemuan_ke: count + 1,
    tanggal: tgl,
  };

  const addSilabus = () => {
    axios
      .post(`/api/subject/${id}/chapter`, dataSilabus, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        refresh();
        swal("Silabus ditambahkan", {
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onFileUpload(event) {
    event.preventDefault();
    setFile(event.target.value);
    let file_reader = new FileReader();
    let file = event.target.files[0];
    // if (event.target.files.length !== 0) {
    //   setAttachment(URL.createObjectURL(event.target.files[0]));
    //   console.log(URL.createObjectURL(event.target.files[1]))
    // }
    file_reader.onload = () => {
      setAttachment(
        file_reader.result.substr(file_reader.result.indexOf(",") + 1)
      );
    };

    if (file) {
      file_reader.readAsDataURL(file);
    }
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card full-height">
          <div className="card__header">
            {(() => {
              switch (add) {
                case "no":
                  return (
                    <>
                      {attachment && <DocView file={mapel.attachment} />}
                      <span className="d-flex d-inline mt-3">
                        <h4 className="subject-name">{subtitle}</h4>
                        <h4 className="ml-auto">
                          <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                          {teacher}
                        </h4>
                      </span>
                      <h2 className="subject-title text-success">
                        {mapel.nama_materi}
                      </h2>
                      <p>{mapel.deskripsi}</p>
                      <div className="line"></div>
                    </>
                  );
                case "yes":
                  return (
                    <>
                      {count > 0 ? (
                        <h4>Tambah Silabus</h4>
                      ) : (
                        <h4>
                          Silabus belum disusun, silahkan isi terlebih dahulu
                        </h4>
                      )}
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </div>
          <div className="card__body">
            {(() => {
              switch (add) {
                case "no":
                  return (
                    <>
                      <h4>Diskusi</h4>
                      <div className="discuss-section">
                        {discuss.length > 0 ? (
                          <p></p>
                        ) : (
                          <p className="text-center">
                            Belum ada diskusi untuk materi ini
                          </p>
                        )}
                      </div>
                    </>
                  );
                case "yes":
                  return (
                    <>
                      <p className="text-success">Pertemuan {count + 1}</p>
                      <form onSubmit={handleSubmit(addSilabus)}>
                        <div className="form-group row">
                          <label
                            for="silabus"
                            className="col-sm-2 col-form-label"
                          >
                            Materi
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="silabus"
                              aria-invalid={errors.name ? "true" : "false"}
                              {...register("silabus")}
                              className="form-control"
                              id="silabus"
                              onChange={(e) => setSilabus(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="tanggal"
                            className="col-sm-2 col-form-label"
                          >
                            Tanggal
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="date"
                              name="tanggal"
                              aria-invalid={errors.name ? "true" : "false"}
                              {...register("tanggal")}
                              className="form-control"
                              id="tanggal"
                              onChange={(e) => setTgl(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="inputPassword"
                            className="col-sm-2 col-form-label"
                          >
                            Lampiran
                          </label>
                          <div className="col-sm-10">
                            <div className="custom-file">
                              <input
                                type="file"
                                name="customFile"
                                aria-invalid={errors.name ? "true" : "false"}
                                {...register("customFile")}
                                className="custom-file-input"
                                id="customFile"
                                onChange={onFileUpload}
                              />
                              <label
                                className="custom-file-label"
                                for="customFile"
                              ></label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="inputdesc"
                            className="col-sm-2 col-form-label"
                          >
                            Deskripsi
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control"
                              id="inputdesc"
                              name="inputdesc"
                              aria-invalid={errors.name ? "true" : "false"}
                              {...register("inputdesc")}
                              onChange={(e) => setDeskripsi(e.target.value)}
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Tambahkan
                        </button>
                      </form>
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="silabus-panel">
          <h2 className="text-center text-light py-3">Silabus</h2>
          {count > 0 ? (
            <>
              {mapelList.map((list, index) => (
                <table>
                  <tbody>
                    <tr
                      className="row-silabus"
                      onClick={(e) => setMapel(list)}
                      key={index}
                    >
                      <h5 className="ml-3 mt-3">
                        {index + 1}. {list.nama_materi}
                      </h5>
                    </tr>
                  </tbody>
                </table>
              ))}
            </>
          ) : (
            <p className="text-center text-light pt-3">Silabus masih kosong</p>
          )}
          <button
            className="btn btn-primary d-flex mx-auto mt-3"
            onClick={(e) => setAdd("yes")}
          >
            <FontAwesomeIcon icon={faPlus} /> Tambah Silabus
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
