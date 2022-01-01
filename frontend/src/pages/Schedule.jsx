import React from "react";
import FormAdd from "../components/form-edit-schedule/FormAdd";

const Schedule = () => {
  return (
    <div>
      <h2 className="page-header">Penjadwalan</h2>
      <div className="row">
        <div className="col-md-6">
          <FormAdd />
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
