import axios from "axios";
import { getToken } from "../../config/Api";

const token = getToken();

axios
  .get("/api/activity", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    export const data = res.data.aktivitas;
  })
  .catch((err) => {
    console.log(err);
  });
