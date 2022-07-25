// TAPI-07
import axios from "axios";

export default function getLogServersRequest(baseURL, cb) {
  axios.get(`${baseURL}/servers`)
  .then(data => {
    return cb(null, data);
  })
  .catch(error => {
    return cb(error, null);
  })
}