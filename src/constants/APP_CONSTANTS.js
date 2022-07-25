import { Settings } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const APP_CONSTANTS = {
  backend: [
    {
      url: "http://localhost:9999/vod",
      name: "video" 
    },
    {
      url: "http://localhost:9999/log",
      name: "log"
    }
  ],
  frontend: [
    {
      // video page
      url: "/video",
      icon: (<VideoLibraryIcon className="drawer-list-icon"/>),
      displayName: "Video",
      name: "video"
    },
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
  defaultVideoID: "62bdf8b562a596634c065e79"
}

export default APP_CONSTANTS