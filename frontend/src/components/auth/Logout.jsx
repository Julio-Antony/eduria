import React from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { removeUserlevel, removeUserSession } from "../../config/Api";

export default function Logout() {
  const history = useHistory();
  swal({
    title: "Apa anda yakin ?",
    text: "Apakah anda yakin ingin keluar aplikasi?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      removeUserSession();
      removeUserlevel();
      history.push("/");
    }
  });
}
