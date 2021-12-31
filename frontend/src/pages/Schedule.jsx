import React, { useCallback, useState } from "react";
import Select, { components } from "react-select";
import { getToken } from "../config/Api";

const Schedule = () => {
  const [kelas, setKelas] = useState("");
  const [hari, setHari] = useState("");
  const [waktu, setWaktu] = useState("");

  const token = getToken();

  const getData = useCallback(() => {
    const kelasUrl = "/api/";
  });

  return (
    <div>
      <h2 className="page-header">Penjadwalan</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card full-height">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Kelas</label>
                <Select
                  closeMenuOnSelect={true}
                  className="mt-1 mb-1"
                  components={{ Placeholder }}
                  placeholder={"Jenis Kelamin"}
                  maxMenuHeight={135}
                  isSingle
                  options={genderOptions}
                  onChange={(e) => setGender(e.value)}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card full-height"></div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
