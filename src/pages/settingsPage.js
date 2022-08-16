import { Button, Grid, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import LayoutToolbarWrapper from "../common/layoutToolbarWrapper";

function SettingsPage(props) {
  const [videoURL, setVideoURL] = useState(props.videoURL);
  const [logURL, setLogURL] = useState(props.logURL);
  const [uploadURL, setUploadURL] = useState(props.uploadURL);
  const [analyticsURL, setAnalyticsURL] = useState(props.analyticsURL);

  return (
    <Box>
      <LayoutToolbarWrapper setDrawerState={(data) => {props.setDrawerState(data)}}/>
      <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py:3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} md={8}>
            <Box mb={4}>
              <Typography variant="h6">Settings</Typography>
            </Box>
            <Box mb={3}>
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
            <Box mb={3}>
              <TextField 
                label="Set upload URL" type="text" size="small"
                sx={{width: "100%"}} value={uploadURL} 
                helperText="URL yang digunakan untuk mengunggah file video."
                onChange={e => {setUploadURL(e.target.value)}}
              />
            </Box>
            <Box mb={3}>
              <TextField 
                label="Set Analytics URL" type="text" size="small"
                sx={{width: "100%"}} value={analyticsURL} 
                helperText="URL yang digunakan untuk mengirimkan data analytics."
                onChange={e => {setAnalyticsURL(e.target.value)}}
              />
            </Box>
            <Box>
              <Button variant="contained" color="primary" size="small" sx={{px:2, py:1}}
                onClick={(e) => {
                  e.preventDefault();
                  props.setVideoURL(videoURL);
                  props.setLogURL(logURL);
                  props.setUploadURL(uploadURL);
                  props.setAnalyticsURL(analyticsURL);
                  props.snackbar("URL values successfully updated!", "success")
                }}
              >
                Update Values
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <Box sx={{mt: { xs:6, sm:0 } }}>
              <List dense>
                <ListItem>
                  <ListItemText><Typography variant="h6">System Values</Typography></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <b>Video URL:</b> {props.videoURL}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <b>Log URL:</b> {props.logURL}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <b>Upload URL:</b> {props.uploadURL}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <b>Analytics URL:</b> {props.analyticsURL}
                  </ListItemText>
                </ListItem>
              </List>
              {/* <Typography variant="body2"><b>Video URL: </b>{props.videoURL}</Typography> */}
              {/* <Typography variant="body2"><b>Log URL: </b>{props.logURL}</Typography> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SettingsPage;