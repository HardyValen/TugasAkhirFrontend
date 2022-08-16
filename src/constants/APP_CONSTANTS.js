import { Settings } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import SpeedIcon from "@mui/icons-material/Speed";
import LinkIcon from "@mui/icons-material/Link";

const APP_CONSTANTS = {
  backend: [
    {
      url: "http://167.205.57.241/vod",
      // url: "http://localhost:9999/vod",
      name: "video" 
    },
    {
      url: "http://167.205.57.241/log",
      // url: "http://localhost:9999/log",
      name: "log"
    },
    {
      url: "http://167.205.57.241/upload",
      // url: "http://localhost:9999/upload",
      name: "upload"
    },
    {
      // url: "http://167.205.57.241/analytics",
      url: "http://localhost:9999/analytics",
      name: "analytics"
    }
  ],
  frontend: {
    main: [
      {
        // video page
        url: "/video",
        icon: (<VideoLibraryIcon className="drawer-list-icon"/>),
        displayName: "Video",
        name: "video"
      },
      {
        // video page
        url: "/upload",
        icon: (<FileUploadIcon className="drawer-list-icon"/>),
        displayName: "Upload Video",
        name: "uploadVideo"
      },
      {
        // video page
        url: "/edit",
        icon: (<VideoSettingsIcon className="drawer-list-icon"/>),
        displayName: "Edit Video",
        name: "editVideo"
      },
    ],
    settings: [
      {
        // logs page
        url: "/log",
        icon: (<FormatListBulletedIcon className="drawer-list-icon"/>),
        displayName: "Logs",
        name: "logs"
      },
      {
        // logs page
        url: "/settings",
        icon: (<Settings className="drawer-list-icon"/>),
        displayName: "Settings",
        name: "settings"
      }
    ],
    externalLinks: [
      {
        url: "https://forms.gle/nxLmR1H4vefr1n3h7",
        icon: (<LinkIcon className="drawer-list-icon"/>),
        displayName: "Kuesioner",
        name: "kuesioner"
      },
      {
        url: "https://speedtest.net",
        icon: (<SpeedIcon className="drawer-list-icon"/>),
        displayName: "Speedtest",
        name: "speedtest"
      }
    ]
  },
  defaultVideoID: "62bdf8b562a596634c065e79"
}

export default APP_CONSTANTS