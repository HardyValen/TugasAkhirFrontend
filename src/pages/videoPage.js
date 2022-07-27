// // import logo from './logo.svg';
// // import './App.css';

import { Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import VideoList from "./videoList";

// import dashjs from "dashjs";
import { useEffect, useState, useRef } from "react";
import getVodResultsRequest from "../apiCalls/getVodResults";
import getVodManifestRequest from "../apiCalls/getVodManifest";
import dashjs from "dashjs";
import { Box } from "@mui/system";
import moment from "moment";
import LayoutToolbarWrapper from "../common/layoutToolbarWrapper";
import { Search } from "@mui/icons-material";

function VideoPage(props) {
  const [video, setVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [vodFetchRunning, setVodFetchRunning] = useState(false);

  const [videoSearch, setVideoSearch] = useState("");
  const [videoSearchRunning, setVideoSearchRunning] = useState(false);

  let playerRef = useRef(null);
  let player = dashjs.MediaPlayer().create();

  player.updateSettings({
    debug: {
      logLevel: dashjs.Debug.LOG_LEVEL_NONE
    },
    streaming: {
      buffer: {
        fastSwitchEnabled: true
      },
      abr: {
        useDefaultABRRules: true,
        ABRStrategy: 'abrThroughput',
        additionalAbrRules: {
          insufficientBufferRule: true,
          switchHistoryRule: false,
          droppedFramesRule: false,
          abandonRequestsRule: false
        },
        autoSwitchBitrate: {
          video: false,
          audio: false
        }
      }
    }
  })

  useEffect(() => {
    getVodResultsRequest(
      props.videoURL, { quantity: -1 },
      function (err, res) {
        if (err) {
          props.snackbar("Unable to fetch videos", "error")
        } else {
          setVideoList(res.data);
        }
      }
    )
  }, [])

  useEffect(() => {
    if (video !== null) {
      setVodFetchRunning(true);
      getVodManifestRequest(props.videoURL, 
        {
          videoID: video?._id,
          player: player,
          playerRef: playerRef
        }, 
        (err) => {
          setVodFetchRunning(false)
          if (err) {
            props.snackbar("Unable to fetch requested video manifest file", "error")
          }
        }
      )
    }
  }, [video])

  return (
    <Box>
      <LayoutToolbarWrapper setDrawerState={(data) => {props.setDrawerState(data)}}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}>
          <TextField type="text" size="small" placeholder="Search video..." fullWidth 
            onChange={(e) => {
              e.preventDefault();
              setVideoSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  disabled={videoSearchRunning}
                  aria-label="search video"
                  edge="end"
                  onClick={() => {
                    setVideoSearchRunning(true)
                    getVodResultsRequest(
                      props.videoURL, { 
                        search_query: videoSearch,
                        quantity: -1
                      },
                      function (err, res) {
                        setVideoSearchRunning(false)
                        if (err) {
                          props.snackbar("Unable to fetch videos", "error")
                        } else {
                          setVideoList(res.data);
                        }
                      }
                    )
                  }}
                >
                  <Search/>
                </IconButton>
              </InputAdornment>
            }}
          /> 
        </Box>
      </LayoutToolbarWrapper>
      <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py:3 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={12} md={8} sx={{ mb: {xs: 3, sm: 3, md: 0} }}>
            <Box component="video" controls ref={playerRef} sx={{width: "100%", minHeight: "320px", maxHeight:"480px"}}/>
            {
              video
              ? <Box>
                  <Box mb={2}>
                    <Typography variant="h6"><b>{video.fieldname}</b></Typography>
                    <Typography variant="body2">
                      <b>
                        {video.createdAt !== video.updatedAt ? "Last updated:" : "Uploaded at"}&nbsp;
                        {moment(video.updatedAt).format("DD MMMM YYYY")}
                      </b>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">
                      {video.videoDescription}
                    </Typography>
                  </Box>
                </Box>
              : <></>
            }
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <VideoList videos={videoList} clickHandler={(data) => {
                return function (e) {
                  e.preventDefault();
                  setVideo(data);
                }
              }}
              vodFetchRunning={vodFetchRunning}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default VideoPage;
