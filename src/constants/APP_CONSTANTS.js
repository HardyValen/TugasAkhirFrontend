import { Settings } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

const APP_CONSTANTS = {
  backend: [
    {
      url: "http://localhost:9999/vod",
      name: "video" 
    },
    {
      url: "http://localhost:9999/log",
      name: "log"
    },
    {
      url: "http://localhost:9999/upload",
      name: "upload"
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
    ]
  },
  defaultVideoID: "62bdf8b562a596634c065e79"
}

export default APP_CONSTANTS