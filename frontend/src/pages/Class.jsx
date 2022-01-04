import React from "react";
import ClassPanel from "../components/class/ClassPanel";
import ClassTeacher from "../components/class/ClassTeacher";
import StudentList from "../components/class/StudentList";

const Class = () => {
  return (
    <div>
      <h2>Kelas</h2>
      <div className="row">
        <div className="col-md-8">
          <ClassPanel/>
        </div>
        <div className="col-md-4">
          <StudentList/>
          <ClassTeacher/>
        </div>
      </div>
    </div>
  );
};

export default Class;
