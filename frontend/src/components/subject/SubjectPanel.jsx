import React from "react";

const SubjectPanel = (props) => {
  return (
    <div className="card full-height">
      <div className="card__header">
        <h5 className="mb-3">Daftar Mata Pelajaran</h5>
        <div className="row">
          {props.mapel ? (
            _renderCard(props.mapel, props.display)
          ) : (
            <div className="col">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const _renderCard = (mapel, display) => {
  if (mapel && mapel.length > 0) {
    return <>{display}</>;
  } else {
    return <div className="col"></div>;
  }
};

export default SubjectPanel;
