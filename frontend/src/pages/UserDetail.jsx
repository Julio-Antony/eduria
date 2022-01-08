import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import IdentityPanel from "../components/user/IdentityPanel";
import { getToken } from "../config/Api";
import "../components/user/user.css";

const UserDetail = ({ match }) => {
  const [user, setUser] = useState(null);
  const token = getToken();
  const id = match.params.id;

  console.log(id);

  const data = useCallback(() => {
    const usersUrl = `/api/users/${id}`;

    const users = axios.get(usersUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([users])
      .then(
        axios.spread((...allData) => {
          console.log(allData[0].data);
          setUser(allData[0].data);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token, id]);

  useEffect(() => {
    data();
  }, [data]);
  return (
    <div>
      <div>
        <h2 className="page-header">Pengguna</h2>
        <div className="row">
          <div className="col-md-12">
            {user && <IdentityPanel user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
