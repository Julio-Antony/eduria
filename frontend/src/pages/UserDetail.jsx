import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import IdentityPanel from "../components/user/IdentityPanel";
import { getToken } from "../config/Api";
import "../components/user/user.css";

const UserDetail = ({ match }) => {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const token = getToken();
  const id = match.params.id;

  console.log(id);

  const data = useCallback(() => {
    const usersUrl = `/api/users/${id}`;
    const kelasUrl = "/api/class";

    const users = axios.get(usersUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const kelas = axios.get(kelasUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([users, kelas])
      .then(
        axios.spread((...allData) => {
          setUser(allData[0].data);
          setClasses(allData[1].data.kelas);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token, id]);

  useEffect(() => {
    localStorage.setItem("page", "Detail Pengguna");
    data();
  }, [data]);
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-12">
            {user && (
              <IdentityPanel user={user} refresh={data} kelas={classes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
