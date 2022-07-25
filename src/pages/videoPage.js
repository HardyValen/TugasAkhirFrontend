// // import logo from './logo.svg';
// // import './App.css';

import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import VODResults from "../common/faker/vodResults";
import VideoList from "./videoList";
import VideoPlayer from "./videoPlayer";

import dashjs from "dashjs";
import { useEffect, useRef, useState } from "react";

// function VideoPage() {
//   const [serverURL, setServerURL] = useState(null);
//   const [videoID, setVideoID] = useState(null);

//   let player = dashjs.MediaPlayer().create();
//   let serverURLRef = useRef(null);
//   let videoIDRef = useRef(null);
//   let playerRef = useRef(null);
  
//   player.updateSettings({
//     debug: {
//       logLevel: dashjs.Debug.LOG_LEVEL_NONE
//     },
//     streaming: {
//       buffer: {
//         fastSwitchEnabled: true
//       },
//       abr: {
//         useDefaultABRRules: true,
//         ABRStrategy: 'abrThroughput',
//         additionalAbrRules: {
//           insufficientBufferRule: true,
//           switchHistoryRule: false,
//           droppedFramesRule: false,
//           abandonRequestsRule: false
//         },
//         autoSwitchBitrate: {
//           video: false,
//           audio: false
//         }
//       }
//     }
//   })
  
//   useEffect(() => {
//     if (videoID && serverURL) {
//       let url = `${serverURL}/?id=${videoID}`;
//       console.log(url)
//       player.initialize(playerRef.current, url, true)
//     }
//   }, [videoID, serverURL]);

//   return (
//     <div className="App">
//       <div>
//         <div>
//           <label htmlFor="urlInput">Server URL: </label>
//           <input type="text" name="urlInput" ref={serverURLRef} defaultValue="http://localhost:9999/vod"/>
//         </div>
//         <div>
//           <label htmlFor="idInput">Video ID: </label>
//           <input type="text" name="idInput" ref={videoIDRef} defaultValue = "62bdf8b562a596634c065e79"/>
//         </div>
//         <button onClick={(e) => {
//           e.preventDefault();
//           setServerURL(serverURLRef.current.value);
//           setVideoID(videoIDRef.current.value);
//         }}>Submit Video</button>
//       </div>
//       <div>
//         <video ref={playerRef} controls width="640" height="480"></video>
//       </div>
//     </div>
//   );
// }

// export default VideoPage;

function VideoPage(props) {
  const [videoID, setVideoID] = useState(null);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} sx={{ mb: {xs: 3, sm: 3, md: 0} }}>
        <VideoPlayer id={videoID} serverURL={props.serverURL}/>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <VideoList videos={VODResults} clickHandler={(data) => {
          return function (e) {
            e.preventDefault();
            setVideoID(data)
          }
        }}/>
      </Grid>
    </Grid>
  )
}

export default VideoPage;
