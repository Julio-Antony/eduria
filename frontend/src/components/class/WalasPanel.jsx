import React from "react";

const WalasPanel = (props) => {
  const identitas = props.walas.identitas || {};
  return (
    <div className="card">
      <div className="card__header">
        <h5 className="mb-3">Wali Kelas</h5>
      </div>
      <div className="text-center">
        <div className="img-walas m-auto">
          <img
            src={"data:image/png;base64," + props.walas.foto}
            alt="gambar walas"
          />
        </div>
        <h5 className="mt-3" style={{ color: "#f69110" }}>
          {props.walas.nama}
        </h5>
        <p className="mt-3">
          {identitas.no_induk ? identitas.no_induk : "Belum ada NIP"}
        </p>
      </div>
    </div>
  );
};

export default WalasPanel;
