import swal from "sweetalert";

export const getToken = () => {
  return localStorage.getItem("access_token") || null;
};

export const setUserSession = (token) => {
  localStorage.setItem("access_token", token);
};

export const getUsername = () => {
  return localStorage.getItem("user") || null;
};

export const removeUserSession = () => {
  localStorage.removeItem("access_token");
};

export const removeUsername = () => {
  localStorage.removeItem("user");
};

export const setUsername = (username) => {
  localStorage.setItem("username", username);
};

export const setUserlevel = (level) => {
  localStorage.setItem("level", level);
};

export const unauthorize = () => {
  swal({
    title: "Sesi anda telah habis",
    text: "Silahkan login kembali",
    icon: "warning",
    type: "success",
  }).then(function () {
    window.location = "/";
  });
};
