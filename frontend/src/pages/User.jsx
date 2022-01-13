import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import swal from "sweetalert";
import CardUser from "../components/user/CardUser";
import UserPanel from "../components/user/UserPanel";
import { getToken } from "../config/Api";
import ReactPaginate from 'react-paginate';
import "../components/user/user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [limit, setLimit] = useState(10)
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const token = getToken();

  const data = useCallback(() => {
    const usersUrl = `/api/users?limit=${limit}&pageNumber=${itemOffset}`;

    const users = axios.get(usersUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([users])
      .then(
        axios.spread((...allData) => {
          console.log(allData[0].data);
          setUser(allData[0].data.users);
          setPageCount(allData[0].data.pages)
          setCount(allData[0].data.count)
          setItemOffset(allData[0].data.page)
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token, limit, itemOffset]);

  useEffect(() => {
    localStorage.setItem("page", "Pengguna");
    data();
  }, [data]);

  const handleClick = async (id) => {
    swal({
      title: "Apa anda yakin menghapus pengguna ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            const toActivity = {
              nama_pengguna: localStorage.getItem("username"),
              nama_aktivitas: "Menghapus Pengguna",
              status: "Berhasil",
            };
            axios
              .post("/api/activity", toActivity, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
            const newData = user.filter((data) => {
              return data._id !== id;
            });
            setUser(newData);
          });
        swal("Pengguna berhasil dihapus", {
          icon: "success",
        });
      } else {
        swal("Mata pelajaran gagal dihapus");
      }
    });
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setItemOffset(event.selected + 1);
  };

  const displayUser = user.map((item, index) => {
    return (
      <CardUser
        user={item}
        key={index}
        level={item.level}
        refresh={data}
        delete={handleClick}
      />
    );
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
        <div className="card full-height">
          <UserPanel display={displayUser} user={user} />
      {count > limit &&
        <ReactPaginate
          breakLabel="..."
          previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
          nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName={"paginationBtns"}
          previousClassName={"prevBtn"}
          nextClassName={"nextBtn"}
          activeClassName={"activeBtn"}
        />
      }
      </div>
        </div>
      </div>
    </div>
  );
};

export default User;
