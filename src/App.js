import { Route, Routes } from "react-router-dom";
import LogPage from "./pages/logPage";
import VideoPage from "./pages/videoPage";
import Layout from "./common/layout";
import { useState } from "react";
import SettingsPage from "./pages/settingsPage";
import { getAPIFromName } from "./constants/APP_FUNCTIONS";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import APP_CONSTANTS from "./constants/APP_CONSTANTS";
import UploadVideoPage from "./pages/uploadVideoPage";
import EditVideoPage from "./pages/editVideoPage";

export default function App() {
  const [videoURL, setVideoURL] = useState(getAPIFromName(APP_CONSTANTS.backend, "video"));
  const [logURL, setLogURL] = useState(getAPIFromName(APP_CONSTANTS.backend, "log"));
  const [uploadURL, setUploadURL] = useState(getAPIFromName(APP_CONSTANTS.backend, "upload"));
  const [snackMessage, setSnackMessage] = useState("");
  const [snackState, setSnackState] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("info");
  const [drawerState, setDrawerState] = useState(false);

  function handleClose (e, r) {
    setSnackState(false)
  }

  function spawnSnackbar (message, severity) {
    setSnackMessage(message);
    setSnackState(true);
    setSnackSeverity(severity)
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Close/>
    </IconButton>
  )

  return (
    <Layout drawerState={drawerState} setDrawerState={(data) => (setDrawerState(data))}>
      <Routes>
        <Route exact path="/" 
          element={
            <VideoPage 
              videoURL={videoURL}
              setVideoURL={(url) => (setVideoURL(url))}
              snackbar={(m, s) => (spawnSnackbar(m, s))}
              setDrawerState={(data) => (setDrawerState(data))}
            />
          }
        />
        <Route exact path="/video" 
          element={
            <VideoPage 
              videoURL={videoURL}
              setVideoURL={(url) => (setVideoURL(url))}
              snackbar={(m, s) => (spawnSnackbar(m, s))}
              setDrawerState={(data) => (setDrawerState(data))}
            />
          }
        />
        <Route exact path="/log" 
          element={
            <LogPage 
              logURL={logURL} 
              setLogURL={(url) => (setLogURL(url))}
              snackbar={(m, s) => (spawnSnackbar(m, s))}
              setDrawerState={(data) => (setDrawerState(data))}
            />
          }
        />
        <Route exact path="/settings" 
          element={
            <SettingsPage 
              videoURL={videoURL}
              setVideoURL={(url) => (setVideoURL(url))}
              logURL={logURL} 
              setLogURL={(url) => (setLogURL(url))}
              uploadURL={uploadURL} 
              setUploadURL={(url) => (setUploadURL(url))}
              snackbar={(m, s) => (spawnSnackbar(m, s))}
              setDrawerState={(data) => (setDrawerState(data))}
            />
          }
        />
        <Route exact path="/upload" 
          element={
            <UploadVideoPage
              videoURL={videoURL}
              uploadURL={uploadURL}
              setUploadURL={(url) => (setUploadURL(url))}
              setVideoURL={(url) => (setVideoURL(url))}
              snackbar={(m, s) => (spawnSnackbar(m, s))}
              setDrawerState={(data) => (setDrawerState(data))}
            />
          }
        />
        <Route exact path="/edit" 
          element={
            <EditVideoPage
              videoURL={videoURL}
              setVideoURL={(url) => (setVideoURL(url))}
              snackbar={(m, s) => (spawnSnackbar(m, s))}
              setDrawerState={(data) => (setDrawerState(data))}
            />
          }
        />
      </Routes>

      <Snackbar 
        open={snackState}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={snackSeverity} sx={{ width:"100%" }} variant="filled">
          {snackMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
}