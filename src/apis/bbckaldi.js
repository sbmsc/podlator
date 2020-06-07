import axios from "axios";
import { getToken } from "../utils/session";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
if (getToken) {
  axios.defaults.headers.common["token"] = getToken();
} else {
  delete axios.defaults.headers.common["token"];
}
export default axios.create({
    // baseURL: 'http://localhost:5000',
  baseURL: "https://kaldi-api.herokuapp.com",
  headers: {
    Accept: "applications/json",
  },
});
