import React from "react";

const UserList = (props) => {
  console.log(props.siswa);
  return (
    <div className="card">
      <div className="card__header">
        <h5 className="mb-3">Daftar siswa</h5>
      </div>
      <div className="row m-auto">
        {props.siswa.length > 0 &&
          props.siswa.map((student, index) => (
            <div className="user-image-wrapper" key={index}>
              <img src={"data:image/png;base64," + student.foto} alt="gambar" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
