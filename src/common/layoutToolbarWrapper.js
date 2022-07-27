import { Box, Divider, Grid, IconButton, Toolbar } from "@mui/material";
import { Fragment } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../logo/dash.png";

export default function LayoutToolbarWrapper(props) {
  return (
    <Fragment>
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
              <IconButton edge="start" aria-label="menu" onClick={() => {props.setDrawerState(true)}}>
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
            {props.children}
          </Grid>
        </Grid>
      </Toolbar>
      <Divider/>
    </Fragment>
  )
}