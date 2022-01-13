import React from "react";

const UserPanel = (props) => {
  return (
      <div className="card__header">
        <h5 className="mb-3">Daftar Pengguna</h5>
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
  );
};

const _renderCard = (user, display) => {
  if (user && user.length > 0) {
    return <>{display}</>;
  } else {
    return <div className="col"></div>;
  }
};

export default UserPanel;
