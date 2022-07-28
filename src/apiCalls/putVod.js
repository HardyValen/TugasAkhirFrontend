// TAPI-06
import axios from "axios";

export default function putVodRequest(baseURL, formData, cb) {
  console.log(formData)
  axios.put(baseURL, formData)
  .then(res => {
    cb(null, res)
  })
  .catch(err => {
    cb(err, null)
  })
}