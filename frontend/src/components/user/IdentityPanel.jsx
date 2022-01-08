import React, { useState } from "react";
import UpdateModal from "./UpdateModal";

const IdentityPanel = (props) => {
  const identitas = props.user.identitas;

  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="card full-height">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="img-wrapper mx-auto mb-3">
              <img src={"data:image/png;base64," + props.user.foto} alt="" />
            </div>
            <h4>{props.user.nama}</h4>
            <p>{identitas.no_induk}</p>
            <button className="btn btn-success" onClick={handleOpen}>
              Sunting Profil
            </button>
          </div>
          <div className="col-md-8">
            <table>
              <tbody>
                {localStorage.getItem("level") === "siswa" && (
                  <tr>
                    <th>Kelas</th>
                    <th>: {props.user.kelas ? props.user.kelas : "-"}</th>
                  </tr>
                )}
                <tr>
                  <th>Jenis Kelamin</th>
                  <th>
                    : {identitas.jenis_kelamin ? identitas.jenis_kelamin : "-"}
                  </th>
                </tr>
                <tr>
                  <th>Agama</th>
                  <th>: {identitas.agama ? identitas.agama : "-"}</th>
                </tr>
                <tr>
                  <th>Tempat Tanggal Lahir</th>
                  <th>
                    :{" "}
                    {identitas.tempat_lahir && identitas.tanggal_lahir
                      ? identitas.tempat_lahir +
                        "," +
                        identitas.tanggal_lahir.substring(0, 10)
                      : "-"}
                  </th>
                </tr>
                <tr>
                  <th>No. Telepon</th>
                  <th>: {identitas.no_telepon ? identitas.no_telepon : "-"}</th>
                </tr>
                <tr>
                  <th>Alamat</th>
                  <th>: {identitas.alamat ? identitas.alamat : "-"}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UpdateModal
        refresh={props.refresh}
        modalShow={show}
        close={handleClose}
        data={props.user}
      />
    </>
  );
};

export default IdentityPanel;
