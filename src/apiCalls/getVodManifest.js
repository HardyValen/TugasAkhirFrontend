// TAPI-03
import axios from "axios";

export default function getVodManifestRequest(baseURL, {videoID, player, playerRef}, cb) {
  let URL = `${baseURL}/?id=${videoID}`;

  try {
    player.initialize(playerRef.current, URL, true);
    cb(null)
  } catch (e) {
    cb(e)
  }
}