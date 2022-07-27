// TAPI-05
import axios from "axios";

export default function getVodResultsRequest(baseURL, {search_query, quantity}, cb) {
  let queryString = [];
  if (search_query) {queryString.push( `search_query=${search_query}` )}
  if (search_query) {queryString.push( `quantity=${quantity}` )}

  let URL = `${baseURL}/results?${queryString.join("&")}`
  axios.get(URL)
  .then(data => {
    return cb(null, data)
  })
  .catch(error => {
    return cb(error, null)
  })
}