import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../config/Api";
import { useForm } from "react-hook-form";
import "../components/subject/subject.css";
import DocView from "../components/subject/DocView";

const SubjectDetail = ({ match }) => {
  const [mapel, setMapel] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [count, setCount] = useState(0)
  const [desc, setDesc] = useState("");
  const [silabus, setSilabus] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [tgl, setTgl] = useState("")
  const [discuss, setDiscuss] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = match.params.id;
  const token = getToken();

  useEffect(() => {
    axios
      .get(`/api/subject/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.materi.length > 0) {
          setMapel(res.data.materi[0]);
          setDesc(res.data.materi[0].deskripsi);
          setAttachment(res.data.materi[0].attachment);
          setCount(res.data.materi.length)
        }
        setSubtitle(res.data.nama_mapel);
        setTeacher(res.data.nama_guru);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  const dataSilabus = {
    attachment: attachment,
    deskripsi: deskripsi,
    nama_materi: silabus,
    pertemuan_ke: count + 1,
    tanggal: tgl
  }

  const addSilabus = () => {
    axios.post(`/api/subject/${id}/chapter`, dataSilabus, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then((res)=>{
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card full-height">
          <div className="card__header">
            {count > 0 ? (
              <>
                {/* {attachment && <DocView file={attachment} />} */}
                <span className="d-flex d-inline">
                  <h4 className="subject-name">{subtitle}</h4>
                  <h4 className="ml-auto">
                    <FontAwesomeIcon icon={faChalkboardTeacher} /> {teacher}
                  </h4>
                </span>
                <h2 className="subject-title text-success">{mapel.nama_materi}</h2>
                <p>{desc}</p>
                <div className="line"></div>
              </>
            ) : (<h4>Silabus belum disusun, silahkan isi terlebih dahulu</h4>)}
          </div>
          <div className="card__body">
            {count > 0 ? (
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
            ) : (<>
              <p className="text-success">Pertemuan {count + 1}</p>
              <form onSubmit={handleSubmit(addSilabus)}>
                <div className="form-group row">
                  <label for="silabus" className="col-sm-2 col-form-label">Materi</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="silabus"
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("silabus")}
                      className="form-control"
                      id="silabus"
                      onChange={(e) => setSilabus(e.target.value)} 
                      required/>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="tanggal" className="col-sm-2 col-form-label">Tanggal</label>
                  <div className="col-sm-10">
                    <input 
                    type="date" 
                    name="tanggal"
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("tanggal")}
                    className="form-control" 
                    id="tanggal" 
                    onChange={(e) => setTgl(e.target.value)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputPassword" className="col-sm-2 col-form-label">Lampiran</label>
                  <div className="col-sm-10">
                    <div className="custom-file">
                      <input 
                      type="file"
                      name="customFile"
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("customFile")} 
                      className="custom-file-input" 
                      id="customFile" 
                      onChange={(e) => console.log(e)} />
                      <label className="custom-file-label" for="customFile"></label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputdesc" className="col-sm-2 col-form-label">Deskripsi</label>
                  <div className="col-sm-10">
                    <textarea 
                    className="form-control" 
                    id="inputdesc" 
                    name="inputdesc"
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("inputdesc")}
                    onChange={(e) => setDeskripsi(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Tambahkan</button>
              </form>
            </>)}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="silabus-panel">
          {count > 0 ? (<p>tes</p>) : (<p className="text-center pt-3">Silabus masih kosong</p>)}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
