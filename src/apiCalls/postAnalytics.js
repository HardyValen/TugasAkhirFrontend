import axios from "axios";

export default function postAnalyticsRequest(baseURL, formData, settings, cb) {
  console.log(baseURL)
  axios.post(baseURL, formData, settings)
  .then(res => {
    cb(null, res)
  })
  .catch(err => {
    cb(err, null)
  })
}