import { Search } from "@mui/icons-material";
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import byteSize from "byte-size";
import moment from "moment";
import { useEffect, useState } from "react";
import getVodResultsRequest from "../apiCalls/getVodResults";
import putVodRequest from "../apiCalls/putVod";
import LayoutToolbarWrapper from "../common/layoutToolbarWrapper";
import VideoList from "./videoList";

export default function EditVideoPage(props) {
  const [video, setVideo] = useState(null);
  const [videoList, setVideoList] = useState([])
  const [vodFetchRunning, setVodFetchRunning] = useState(null)

  const [videoSearch, setVideoSearch] = useState("");
  const [videoSearchRunning, setVideoSearchRunning] = useState(false);

  const [putRequestRunning, setPutRequestRunning] = useState(false);

  useEffect(() => {
    getVodResultsRequest(
      props.videoURL, { quantity: -1 },
      function (err, res) {
        if (err) {
          props.snackbar("Unable to fetch videos", "error")
        } else {
          setVideoList(res.data)
        }
      }
    )
  }, [])

  return (
    <Box>
      <LayoutToolbarWrapper setDrawerState={(data) => (props.setDrawerState(data))}>
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
            <Box mb={4}>
              <Typography variant="h6">Edit Video Metadata</Typography>
            </Box>
            <Box mb={4}>
              <TextField 
                label="Video Title" type="text" size="small"
                sx={{width: "100%"}} value={video?.fieldname || ""} disabled={video === null}
                onChange={e => {setVideo({...video, fieldname: e.target.value})}}
              />
            </Box>
            <Box mb={4}>
              <TextField multiline rows={4}
                label="Video Description" type="text" size="small"
                sx={{width: "100%"}} value={video?.videoDescription || ""} disabled={video === null}
                onChange={e => {setVideo({...video, videoDescription: e.target.value})}}
              />
            </Box>
            <Box mb={4}>
              <Button variant="contained" color="primary" size="small" sx={{px:2, py:1}}
                disabled={!video || putRequestRunning}
                onClick={(e) => {
                  e.preventDefault();
                  let formData = {
                    id: video?._id,
                    fieldname: video?.fieldname,
                    videoDescription: video?.videoDescription
                  }

                  setPutRequestRunning(true);
                  putVodRequest(props.videoURL, formData, function(err, res) {
                    setPutRequestRunning(false)
                    if (err) {
                      props.snackbar(err.message, "error")
                    } else {
                      props.snackbar("Video successfully updated!", "success")
                      getVodResultsRequest(
                        props.videoURL, { quantity: -1 },
                        function (err, res) {
                          if (err) {
                          } else {
                            setVideoList(res.data)
                          }
                        }
                      )
                    }
                  })
                }}
              >
                Save Changes
              </Button>
            </Box>
            {
              video ?
              <Box>
                <Typography variant="body2">
                  <b>Video Metadata:</b>
                </Typography>
                <Typography variant="caption">
                  ID: {video?._id}<br/>
                  Object Name: {video?.objectname}<br/>
                  Original Name: {video?.originalname}<br/>
                  Creation Date: {moment(video?.createdAt).format("DD MMMM YYYY, HH:mm:SS")}<br/>
                  Last Updated: {moment(video?.updatedAt).format("DD MMMM YYYY, HH:mm:SS")}<br/>
                  File Size: {byteSize(video?.size).toString()}
                </Typography>
              </Box> :
              null
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