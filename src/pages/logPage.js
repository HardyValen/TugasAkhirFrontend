import { Autocomplete, Button, Chip, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import serverIDsFaker from "../common/faker/serverIDs"
import theme from "../theme";

function LogPage(props) {
  const [instance, setInstance] = useState(null);
  const [qty, setQty] = useState(null);
  const [order, setOrder] = useState(null);
  const [type, setType] = useState(null);
  const [validation, setValidation] = useState(false);

  

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} sm={8} >
        <Box component="code" sx={{
          maxHeight: {
            xs: "60vh",
            sm: "80vh",
            md: "80vh",
          },
          overflowY: "scroll",
          fontSize: {
            xs: "11px",
            sm: "12px",
            md: "12px",
            xl: "16px"
          },
          display: "block",
          border: "1px solid #444",
          borderRadius: "4px",
          padding: "4px"
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacus quam, faucibus vel semper feugiat, ultrices at odio. Cras aliquet molestie mattis. Nunc nisl felis, consectetur nec consequat eget, auctor eu justo. Quisque aliquet, urna et lobortis aliquet, enim eros blandit lacus, hendrerit eleifend lorem dolor sit amet leo. Etiam lacus augue, semper eu lobortis at, luctus eget enim. Praesent quis lacus in urna scelerisque euismod eu et risus. Proin a augue auctor, mattis augue vel, aliquet lacus.

          In eu auctor urna, a scelerisque justo. Phasellus accumsan ipsum nec leo interdum dignissim. Morbi finibus iaculis tincidunt. Quisque auctor nunc at ex luctus finibus. Nam eu rhoncus metus. Suspendisse mauris elit, eleifend sit amet nunc ac, dapibus rutrum arcu. Morbi malesuada congue ligula ac egestas.

          Curabitur in velit vitae quam sagittis lobortis sed id ligula. Ut vel porttitor nisl, a porttitor justo. Vestibulum consequat quis urna at consectetur. Curabitur molestie erat ut sodales finibus. Donec aliquam semper nunc in finibus. Nullam rhoncus convallis nulla vel hendrerit. Praesent non luctus urna. Morbi vel tincidunt arcu. Quisque egestas hendrerit dolor a bibendum. Proin accumsan dignissim ante vel congue. Proin vehicula facilisis hendrerit.

          Sed laoreet porta enim, quis pretium velit elementum ut. Aliquam odio eros, dignissim ac laoreet in, egestas sit amet leo. Proin venenatis sagittis metus quis pretium. Proin eu convallis nisl. Aliquam ante sapien, venenatis et eros sed, tempor consequat eros. Aenean maximus sapien non turpis consectetur sodales. Mauris maximus pharetra aliquet. Sed rhoncus dolor nec sagittis porta. Vivamus et leo ut justo rhoncus ultrices. Proin porta, nisl ut vulputate pellentesque, sapien sapien hendrerit augue, aliquet sodales lacus elit et turpis. Suspendisse a rutrum massa. Sed nec purus at massa auctor egestas non sit amet diam. Donec mollis dolor nec urna efficitur porta. Curabitur in egestas libero.

          Maecenas porttitor facilisis nibh quis dignissim. Suspendisse potenti. Sed eu ornare nunc. Morbi tincidunt eu dui et vestibulum. Nullam vestibulum viverra sapien ut varius. Vivamus arcu mauris, hendrerit a faucibus a, elementum eu nulla. Curabitur maximus ut ante eu maximus. Ut malesuada metus tempus massa auctor cursus. Morbi non lacus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis pellentesque sodales orci a rutrum. Proin aliquet mi ullamcorper dolor blandit, suscipit porta felis condimentum.

          Maecenas porttitor facilisis nibh quis dignissim. Suspendisse potenti. Sed eu ornare nunc. Morbi tincidunt eu dui et vestibulum. Nullam vestibulum viverra sapien ut varius. Vivamus arcu mauris, hendrerit a faucibus a, elementum eu nulla. Curabitur maximus ut ante eu maximus. Ut malesuada metus tempus massa auctor cursus. Morbi non lacus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis pellentesque sodales orci a rutrum. Proin aliquet mi ullamcorper dolor blandit, suscipit porta felis condimentum.

          Maecenas porttitor facilisis nibh quis dignissim. Suspendisse potenti. Sed eu ornare nunc. Morbi tincidunt eu dui et vestibulum. Nullam vestibulum viverra sapien ut varius. Vivamus arcu mauris, hendrerit a faucibus a, elementum eu nulla. Curabitur maximus ut ante eu maximus. Ut malesuada metus tempus massa auctor cursus. Morbi non lacus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis pellentesque sodales orci a rutrum. Proin aliquet mi ullamcorper dolor blandit, suscipit porta felis condimentum.

          Maecenas porttitor facilisis nibh quis dignissim. Suspendisse potenti. Sed eu ornare nunc. Morbi tincidunt eu dui et vestibulum. Nullam vestibulum viverra sapien ut varius. Vivamus arcu mauris, hendrerit a faucibus a, elementum eu nulla. Curabitur maximus ut ante eu maximus. Ut malesuada metus tempus massa auctor cursus. Morbi non lacus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis pellentesque sodales orci a rutrum. Proin aliquet mi ullamcorper dolor blandit, suscipit porta felis condimentum.

          Maecenas porttitor facilisis nibh quis dignissim. Suspendisse potenti. Sed eu ornare nunc. Morbi tincidunt eu dui et vestibulum. Nullam vestibulum viverra sapien ut varius. Vivamus arcu mauris, hendrerit a faucibus a, elementum eu nulla. Curabitur maximus ut ante eu maximus. Ut malesuada metus tempus massa auctor cursus. Morbi non lacus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis pellentesque sodales orci a rutrum. Proin aliquet mi ullamcorper dolor blandit, suscipit porta felis condimentum.
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <Grid container columnSpacing={1}>
                  <Grid item xs={8}>
                    <FormControl fullwidth sx={{width:"100%"}}>
                      <InputLabel id="select-servers-label">Select Instance</InputLabel>
                      <Select
                        labelId="select-servers-label"
                        id="select-servers-elmt"
                        value={instance}
                        label="Select Instance"
                        onChange={e => {setInstance(e.target.value)}}
                      >
                        {serverIDsFaker.map((e, i) => (
                          <MenuItem value={e.name} key={i}>{e.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <FormControl fullwidth sx={{width:"100%"}}>
                        <InputLabel id="select-quantity-label">Qty</InputLabel>
                        <Select
                          labelId="select-quantity-label"
                          id="select-quantity-elmt"
                          value={qty}
                          label="Qty"
                          onChange={e => {setQty(e.target.value)}}
                        >
                          {[10, 25, 50, 75, 100].map((e, i) => (
                            <MenuItem value={e} key={i}>{e}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem
                secondaryAction={
                  ["http", "common"].map((e, i) => (
                    <Chip 
                      sx={
                        e == type ? {mx:0.5, fontWeight: 600, border: `3px solid ${theme.palette.primary.light}`, color: theme.palette.primary.light}
                        : {mx:0.5}
                      }
                      key={i} variant="outlined" label={e} onClick={() => {setType(e)}}/>
                  ))
                }
              >
                <ListItemText>Log type:</ListItemText>
              </ListItem>
              <ListItem
                secondaryAction={
                  ["desc", "asc"].map((e, i) => (
                    <Chip 
                      sx={
                        e == order ? {mx:0.5, fontWeight: 600, border: `3px solid ${theme.palette.primary.light}`, color: theme.palette.primary.light}
                        : {mx:0.5}
                      }
                      key={i} variant="outlined" label={e} onClick={() => {setOrder(e)}}/>
                  ))
                }
              >
                <ListItemText>Sort by</ListItemText>
              </ListItem>
              <ListItem sx={{mt: 2}}>
                <Button variant="contained" fullWidth
                  // disabled={}
                >
                  fetch logs
                </Button>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            {`${[instance, qty, order, type].indexOf(null) !== -1}`}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LogPage