import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const CardClass = (props) => {
    const renderToggle = () => (
        <FontAwesomeIcon icon={faEllipsisV} className="card-menu" />
      );
    return (
        <div className="card-mapel">
      <div className="card-mapel-header">
        <Dropdown
          customToggle={() => renderToggle()}
          refresh={props.refresh}
          delete={props.delete}
          id={props.kelas._id}
          data={props.kelas}
          walas={props.walas}
        />
        <img
          src={"data:image/png;base64," + props.kelas.cover}
          alt="gambar sampul"
        />
      </div>
      <div className="card-mapel-body text-center">
        <h6>{props.kelas.nama_kelas}</h6>
        <p>{props.kelas.wali_kelas}</p>
        <Link to={`/detail_kelas/${props.kelas._id}`}>
          <button className="btn">Detail</button>
        </Link>
      </div>
    </div>
    )
}

export default CardClass
