// TAPI-02
import axios from "axios";

export default function postVodRequest(uploadURL, formData, cb) {
  axios.post(uploadURL, formData)
  .then(res => {
    cb(null, res)
  })
  .catch(err => {
    cb(err, null)
  })
}