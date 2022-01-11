import React from "react";

const ClassPanel = (props) => {
  return (
    <div className="card full-height">
      <div className="card__header">
        <h5 className="mb-3">
          {localStorage.getItem("level") === "admin"
            ? "Daftar Kelas"
            : "Jadwal Kelas"}
        </h5>
      </div>
      <div className="row">
        {props.item ? (
          _renderCard(props.item, props.display)
        ) : (
          <div className="col">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const _renderCard = (item, display) => {
  if (item && item.length > 0) {
    return <>{display}</>;
  } else {
    return <div className="col"></div>;
  }
};

export default ClassPanel;
