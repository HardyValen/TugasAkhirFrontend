import { Route, Routes } from "react-router-dom";
import LogPage from "./pages/logPage";
import VideoPage from "./pages/videoPage";
import Layout from "./common/layout";
import { useState } from "react";
import SettingsPage from "./pages/settingsPage";
import { getAPIFromName } from "./constants/APP_FUNCTIONS";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function App() {
  const [videoURL, setVideoURL] = useState(getAPIFromName("video"));
  const [logURL, setLogURL] = useState(getAPIFromName("log"));
  const [snackMessage, setSnackMessage] = useState("");
  const [snackState, setSnackState] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("info");

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
    <Layout>
      <Routes>
        <Route exact path="/" 
          element={
            <VideoPage 
              videoURL={videoURL}
              setVideoURL={(url) => (setVideoURL(url))}
            />
          }
        />
        <Route exact path="/video" 
          element={
            <VideoPage 
              videoURL={videoURL}
              setVideoURL={(url) => (setVideoURL(url))}
            />
          }
        />
        <Route exact path="/log" 
          element={
            <LogPage 
              logURL={logURL} 
              setLogURL={(url) => (setLogURL(url))}
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
              snackbar={(m, s) => (spawnSnackbar(m, s))}
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