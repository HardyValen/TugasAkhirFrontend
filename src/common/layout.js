import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import APP_CONSTANTS from "../constants/APP_CONSTANTS";
import logo from "../logo/dash.png";
import theme from "../theme";

function drawerListItem(data, index) {
  return (
    <ListItem button key={index} component={NavLink} to={data.url}
      sx={{
        "&.active": {
          "& .drawer-list-text": {
            color: theme.palette.primary.main,
            fontWeight: "bolder"
          },

          "& .drawer-list-icon": {
            color: theme.palette.primary.main,
          }
        },
      }}
    >
      <ListItemIcon>
        {data.icon}
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body2" className="drawer-list-text">{data.displayName}</Typography>
      </ListItemText>
    </ListItem>
  )
}

function drawerListItemExternal(data, index) {
  return (
    <ListItem button key={index} component="a" href={data.url} target="_blank" noreferrer="true" noopener="true"
      sx={{
        "&.active": {
          "& .drawer-list-text": {
            color: theme.palette.primary.main,
            fontWeight: "bolder"
          },

          "& .drawer-list-icon": {
            color: theme.palette.primary.main,
          }
        },
      }}
    >
      <ListItemIcon>
        {data.icon}
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body2" className="drawer-list-text">{data.displayName}</Typography>
      </ListItemText>
    </ListItem>
  )
}

export default function Layout(props) {
  // const [search, setSearch] = useState("");

  const drawer = (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: 240, 
      height:"100%", 
    }}>
      <Box>
        <Toolbar>
          <Box component="img" src={logo} alt="DASH" sx={{ maxHeight: "32px" }}/>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List>
            {APP_CONSTANTS.frontend.main.map((data, index) => (drawerListItem(data, index)))}
          </List>
          <Divider/>
          <List>
            {APP_CONSTANTS.frontend.settings.map((data, index) => (drawerListItem(data, index)))}
          </List>
          <Divider/>
          <List>
            {APP_CONSTANTS.frontend.externalLinks.map((data, index) => (drawerListItemExternal(data, index)))}
          </List>
        </Box>
      </Box>
      <Box p={3}>
        <Divider/>
        <Typography variant="body2" mt={2} mb={1}>
          <b>Sistem Multimedia Terdistribusi yang Menjamin QoE pada Layanan Penyedia Video Streaming on Demand</b>
        </Typography>
        <Typography variant="caption">
          &copy; Hardy Valenthio A. (18218004)
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{display: 'flex', width: "100%"}}>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            pt: 8,
            pb: 2,
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block',
            }
          }}
          anchor="left"
          variant="permanent"
        >
          {drawer}
        </Drawer>

      <SwipeableDrawer
        sx={{
            width: 240,
            flexShrink: 0,
            pt: 8,
            pb: 2,
          }}
          anchor="left"
          open={props.drawerState}
          onClose={() => {props.setDrawerState(false)}}
          onOpen={() => {props.setDrawerState(true)}}
      >
        {drawer}
      </SwipeableDrawer>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}>
        {props.children}
      </Box>
    </Box>
  )
}