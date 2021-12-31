import React, { useCallback, useState } from "react";
import Select, {Component} from "react-select"
import { getToken } from "../config/Api";

const Schedule = () => {
  const [kelas, setKelas] = useState("")
  const [hari, setHari] = useState("")
  const [waktu, setWaktu] = useState("")

    const token = getToken();

    const getData = useCallback(()=>{
        const kelasUrl = "/api/kelas"
    })
    

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
                      // components={{ Placeholder }}
                      placeholder={"Kelas"}
                      maxMenuHeight={135}
                      isSingle
                      // options={genderOptions}
                      // onChange={(e) => setGender(e.value)}
                    />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Hari</label>
                <Select
                      closeMenuOnSelect={true}
                      className="mt-1 mb-1"
                      // components={{ Placeholder }}
                      placeholder={"hari"}
                      maxMenuHeight={135}
                      isSingle
                      // options={genderOptions}
                      // onChange={(e) => setGender(e.value)}
                    />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Waktu</label>
                <Select
                      closeMenuOnSelect={true}
                      className="mt-1 mb-1"
                      // components={{ Placeholder }}
                      placeholder={"Waktu"}
                      maxMenuHeight={135}
                      isSingle
                      // options={genderOptions}
                      // onChange={(e) => setGender(e.value)}
                    />
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
      <div className="row">
        <div className="col-md-12">
          <div className="card full-height">
            <div className="card__header">
              <h3>Daftar Jadwal</h3>
            </div>
            <div className="card__body">
                            {/* <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            /> */}
                        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
