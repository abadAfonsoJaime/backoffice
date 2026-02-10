import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log("Logging the error", error);
    toast.error("Error inesperado.");
    // toast("Error inesperado.")
    // toast.success
    // toast.info
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
// axios.defaults.headers.post;
// axios.defaults.headers.put;
// axios.defaults.headers.delete;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
