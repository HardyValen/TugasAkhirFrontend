import { Grid, Typography, TextField, Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import LayoutToolbarWrapper from "../common/layoutToolbarWrapper";

export default function UploadVideoPage(props) {
  const [file, setFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [postRunning, setPostRunning] = useState(false);

  // const fileRef = useRef(null);

  return (
    <Box>
      <LayoutToolbarWrapper setDrawerState={(data) => (props.setDrawerState(data))}/>
      <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py:3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} md={6}>
            <Box mb={4}>
              <Typography variant="h6">Upload Video</Typography>
            </Box>
            <Box mb={4} component="input" type="file" name="video" 
              // ref={fileRef}
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
            />
            <Box mb={4}>
              <TextField 
                label="Video Title" type="text" size="small" value={videoTitle} 
                onChange={e => {setVideoTitle(e.target.value)}}
              />
            </Box>
            <Box mb={3}>
              <TextField multiline rows={4}
                label="Video Description" type="text" size="small"
                sx={{width: "100%"}} value={videoDescription}
                onChange={e => {setVideoDescription(e.target.value)}}
              />
            </Box>
            <Box sx={{display: "flex"}}>
              <Button variant="contained" color="primary" size="small" sx={{flex:"0 0 auto", px:2, py:1, mr:4 }}
                disabled={postRunning}
                onClick={(e) => {
                  e.preventDefault();
                  const formData = new FormData();
                  formData.append('video', file);
                  formData.append('fieldname', videoTitle);
                  formData.append('videoDescription', videoDescription);

                  setPostRunning(true);
                  axios.post(props.uploadURL, formData, {
                    onUploadProgress: progressEvent => setProgress( Math.round( (progressEvent.loaded * 100) / progressEvent.total) )
                  })
                  .then(res => {
                    setPostRunning(false);
                    props.snackbar(`${res.data}`, "success")
                  })
                  .catch(err => {
                    setPostRunning(false);
                    console.log(err);
                    props.snackbar(`${err.message}`, "error")
                  })

                  // axios.post()
                  // props.snackbar("URL values successfully updated!", "success")
                }}
              >
                Upload video
              </Button>
              <Box sx={{width: "100%", flex:"0 1 auto", display: "flex", alignItems: "center", opacity: (postRunning ? "1" : "0"), transition: "all 0.3s ease"}}>
                {postRunning ? <LinearProgress sx={{width: "100%"}} variant="determinate" value={Math.round(progress)}/> : null}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}