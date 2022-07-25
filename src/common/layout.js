import { Divider, Drawer, Grid, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import APP_CONSTANTS from "../constants/APP_CONSTANTS";
import logo from "../logo/dash.png";
import theme from "../theme";
import { Search } from "@mui/icons-material";

export default function Layout(props) {
  const [drawerState, setDrawerState] = useState(false);
  const [search, setSearch] = useState("");
  
  const toggleDrawer = (open) => (e) => {
    setDrawerState(open);
  }

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
        <Box sx={{overflow: "auto" }}>
          <List>
            {APP_CONSTANTS.frontend.map((data, index) => (
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
            ))}
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
          open={drawerState}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
      >
        {drawer}
      </SwipeableDrawer>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={2} sm={3}>
              <Box sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none"
                },
                alignItems: "center",
              }}>
                <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                  <MenuIcon/>
                </IconButton>
                <Box component="img" src={logo} alt="DASH" sx={{ 
                  maxHeight: "32px", 
                  ml: 2,
                  display: {
                    xs: "none",
                    sm: "block",
                    md: "none"
                  }
                }}/>
              </Box>
            </Grid>
            <Grid item xs={10} sm={9} md={6}>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}>
                <TextField type="text" size="small" placeholder="Search video..." fullWidth 
                  onChange={(e) => {
                    e.preventDefault();
                    setSearch(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="search video"
                        edge="end"
                        onClick={() => {
                          // TO DO: BIKIN API CALL
                          console.log(search)
                        }}
                      >
                      <Search/>
                      </IconButton>
                    </InputAdornment>
                  }}
                /> 
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider/>
        <Box sx={{ 
          px: {
            xs: 2, 
            sm: 3, 
            md: 5
          }, 
          py:3
        }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}