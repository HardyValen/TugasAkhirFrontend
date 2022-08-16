// // import logo from './logo.svg';
// // import './App.css';

import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import VideoList from "./videoList";

// import dashjs from "dashjs";
import { useEffect, useState, useRef } from "react";
import getVodResultsRequest from "../apiCalls/getVodResults";
import dashjs from "dashjs";
import { Box } from "@mui/system";
import moment from "moment";
import LayoutToolbarWrapper from "../common/layoutToolbarWrapper";
import { Search } from "@mui/icons-material";
import postAnalyticsRequest from "../apiCalls/postAnalytics";

function VideoPage(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [video, setVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [vodFetchRunning, setVodFetchRunning] = useState(false);
  
  const [videoSearch, setVideoSearch] = useState("");
  const [videoSearchRunning, setVideoSearchRunning] = useState(false);

  const [postAnalyticsRunning, setPostAnalyticsRunning] = useState(false);
  
  const [player, setPlayer] = useState(dashjs.MediaPlayer().create());
  const [analyticsState, setAnalyticsState] = useState({})
  let analytics = {}
  
  const playerRef = useRef(null);
  const playerSettings = {
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
          switchHistoryRule: true,
          droppedFramesRule: true,
          abandonRequestsRule: true
        },
        autoSwitchBitrate: {
          video: true,
          audio: true
        }
      }
    }
  }

  useEffect(() => {
    getVodResultsRequest(
      props.videoURL, { quantity: -1 },
      function (err, res) {
        if (err) {
          setVideoList([]);
          props.snackbar("Unable to fetch videos", "error")
        } else {
          setVideoList(res.data);
        }
      }
    )
  }, [])
  
  useEffect(() => {
    // Listeners for Analytics
    function playbackTimeUpdatedCb(e) {
      let streamInfo = player.getActiveStream().getStreamInfo();
      let dashMetrics = player.getDashMetrics();
      let dashAdapter = player.getDashAdapter();
      
      if (dashMetrics && streamInfo) {
        let playback = analytics.playback || [];
        
        const periodIdx = streamInfo.index;
        let repSwitch = dashMetrics.getCurrentRepresentationSwitch("video", true);
        let bitrate = repSwitch ? dashAdapter.getBandwidthForRepresentation(repSwitch.to, periodIdx) : NaN;
        let adaptation = dashAdapter.getAdaptationForType(periodIdx, "video", streamInfo);
        let currentRep = adaptation.Representation_asArray.find(function (rep) {
          return rep.id === repSwitch.to
        })

        let frameRate = currentRep.frameRate;
        let resolution = `${currentRep.width} x ${currentRep.height}`;

        playback.push({
          time: e.time,
          timeToEnd: e.timeToEnd,
          timestamp: Date.now(),
          bitrate,
          frameRate,
          resolution,
          bufferStateVideo: dashMetrics.getCurrentBufferState("video"),
          bufferStateAudio: dashMetrics.getCurrentBufferState("audio"),
          bufferLevelVideo: dashMetrics.getCurrentBufferLevel("video"),
          bufferLevelAudio: dashMetrics.getCurrentBufferLevel("audio"),
        })

        analytics = {
          playback,
          ...analytics
        }

        console.log(analytics)
        setAnalyticsState(analytics);
      }
    }

    function streamInitializedCb(e) {
      analytics = {
        video,
        initTimestamp: Date.now(),
        playback: [],
        ...analytics
      }

      console.log(analytics);
      setAnalyticsState(analytics);
    }

    function controlAnalyticsButton(state) {
      return function (e) {
        setPostAnalyticsRunning(state);
      }
    }

    const playerListeners = {
      "playbackTimeUpdated": playbackTimeUpdatedCb,
      "streamInitialized": streamInitializedCb,
      "playbackPaused": controlAnalyticsButton(false),
      "playbackEnded": controlAnalyticsButton(false),
      "playbackPlaying": controlAnalyticsButton(true), 
    }
  
    // setAnalytics({});
    Object.entries(playerListeners).forEach((o) => {
      player.on(o[0], o[1])
    })
    return () => {
      Object.entries(playerListeners).forEach((o) => {
        player.off(o[0], o[1])
      })
    }
  }, [video, player])

  useEffect(() => {
    if (video !== null) {
      setVodFetchRunning(true);
      try {
        let URL = `${props.videoURL}/?id=${video?._id}`;

        if (!firstLoad) {
          console.log("[PLAYER] Source updated")
          player.attachSource(URL); 
        } else {
          player.initialize(playerRef.current, URL, true);
          player.updateSettings(playerSettings);
          console.log("[PLAYER] Media Player Initialized");
          setFirstLoad(false);
        }

      } catch (error) {
        console.log(error)
        props.snackbar("Unable to fetch requested video manifest file", "error")
      } finally {
        setVodFetchRunning(false)
      }
    }
  }, [video, player])

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
                  <Box sx={{mt: 2}}>
                    <Button variant="contained" color="primary" size="small" sx={{px:2, py:1}} 
                      disabled={postAnalyticsRunning}
                      onClick={(e) => {
                        e.preventDefault();
                        let formData = analyticsState;

                        setPostAnalyticsRunning(true);
                        postAnalyticsRequest(props.analyticsURL, formData, function(err, res) {
                          if (err) {
                            props.snackbar(err.message, "error")
                            console.log(err)
                          } else {
                            props.snackbar("Analytics sent successfully!", "success")
                          }
                          console.log(analyticsState);
                          setPostAnalyticsRunning(false);
                        })
                      }}
                    >
                      Send Analytics
                    </Button>
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
              }}}
              vodFetchRunning={vodFetchRunning}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default VideoPage;
