import React from 'react'

const ClassPanel = (props) => {
    return (
        <div className="card full-height">
            <div className="card__header">
                <h5 className="mb-3">Daftar Kelas</h5>
            </div>
            <div className="row">
            {props.kelas ? (
            _renderCard(props.kelas, props.display)
          ) : (
            <div className="col">
              <p>Loading...</p>
            </div>
          )}
            </div>
        </div>
    )
}

const _renderCard = (kelas, display) => {
    if (kelas && kelas.length > 0) {
      return <>{display}</>;
    } else {
      return <div className="col"></div>;
    }
  };

export default ClassPanel
