import React from "react";

const BodyWrapper = (props) => {
  return (
    <div>
      <div className="class-wrapper">
        <div className="card__header">
          <h5 className="mb-3">Daftar Siswa</h5>
          <div className="row">
            {props.user ? (
              _renderCard(props.user, props.display)
            ) : (
              <div className="col">
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const _renderCard = (user, display) => {
  if (user && user.length > 0) {
    return <>{display}</>;
  } else {
    return (
      <div className="col pt-5">
        <h2 className="text-center">Belum ada siswa</h2>
      </div>
    );
  }
};

export default BodyWrapper;
