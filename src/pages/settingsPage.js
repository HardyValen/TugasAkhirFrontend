import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function SettingsPage(props) {
  const [videoURL, setVideoURL] = useState(props.videoURL);
  const [logURL, setLogURL] = useState(props.logURL);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={9} md={8}>
        <Box mb={4}>
          <Typography variant="h6">Settings</Typography>
        </Box>
        <Box mb={4}>
          <TextField 
            label="Set Video URL" type="text" size="small"
            sx={{width: "100%"}} value={videoURL} 
            helperText="URL yang digunakan untuk memperoleh file video."
            onChange={e => {setVideoURL(e.target.value)}}
          />
        </Box>
        <Box mb={3}>
          <TextField 
            label="Set log URL" type="text" size="small"
            sx={{width: "100%"}} value={logURL} 
            helperText="URL yang digunakan untuk memperoleh file log."
            onChange={e => {setLogURL(e.target.value)}}
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary" size="small" sx={{px:2, py:1}}
            onClick={(e) => {
              e.preventDefault();
              props.setVideoURL(videoURL);
              props.setLogURL(logURL);
              props.snackbar("URL values successfully updated!", "success")
            }}
          >
            Update Values
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3} md={4}>
        <Box mb={4} sx={{mt: { xs:6, sm:0 } }}>
          <Typography variant="h6">System Values</Typography>
        </Box>
        <Box>
          <Typography variant="body2"><b>Video URL: </b>{props.videoURL}</Typography>
          <Typography variant="body2"><b>Log URL: </b>{props.logURL}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SettingsPage;