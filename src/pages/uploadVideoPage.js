import { Grid, Typography, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import postVodRequest from "../apiCalls/postVod";
import LayoutToolbarWrapper from "../common/layoutToolbarWrapper";

export default function UploadVideoPage(props) {
  const [file, setFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
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
                console.log(e.target.files[0])
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
            <Box>
              <Button variant="contained" color="primary" size="small" sx={{px:2, py:1}}
                disabled={postRunning}
                onClick={(e) => {
                  e.preventDefault();
                  const formData = new FormData();
                  formData.append('video', file);
                  formData.append('videoTitle', videoTitle);
                  formData.append('videoDescription', videoDescription);

                  setPostRunning(true);
                  postVodRequest(props.uploadURL, formData,
                    (err, res) => {
                      setPostRunning(false);
                      if (err) {
                        props.snackbar(`${res.data} (${res.status})`, "error")
                      } else {
                        props.snackbar(`${res.data}`, "success")
                      }
                    }
                  )
                  // axios.post()

                  // props.snackbar("URL values successfully updated!", "success")
                }}
              >
                Upload video
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}