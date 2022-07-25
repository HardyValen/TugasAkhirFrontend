import { Button, Chip, CircularProgress, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment";
import { useEffect, useState } from "react"
import getLogRequest from "../apiCalls/getLog";
import getLogServersRequest from "../apiCalls/getLogServers";
import theme from "../theme";

function LogPage(props) {
  const [logFilename, setLogFilename] = useState(null);
  const [logFile, setLogFile] = useState(null);

  const [instanceOptions, setInstanceOptions] = useState(null);
  const [instance, setInstance] = useState('');
  const [qty, setQty] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [logfileList, setLogfileList] = useState(null);

  const [fetchLogRunning, setFetchLogRunning] = useState(false);
  const [fetchLogfileRunning, setFetchLogfileRunning] = useState(false);

  useEffect(() => {
    setDisabled(true);
    setType("http");
    setOrder("desc");
    getLogServersRequest(
      props.logURL,
      (err, res) => {
        if (err) {
          props.snackbar("Unable to fetch server instances.", "error")
          setDisabled(true);
        } else {
          setInstanceOptions(res.data);
          setDisabled(false);
        }
      }
    )
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <Grid container columnSpacing={1}>
                  <Grid item xs={8}>
                    <FormControl fullWidth sx={{width:"100%"}}>
                      <InputLabel id="select-servers-label">Select Instance</InputLabel>
                      <Select
                        labelId="select-servers-label"
                        id="select-servers-elmt"
                        value={instance}
                        label="Select Instance"
                        onChange={e => {setInstance(e.target.value)}}
                      >
                        {instanceOptions?.map((e, i) => (
                          <MenuItem value={e.name} key={i}>{e.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <FormControl fullWidth sx={{width:"100%"}}>
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
                <Button variant="contained"
                  disabled={disabled || [instance, qty, order, type].indexOf("") !== -1} 
                  sx={{width: "100%"}}
                  onClick={() => {
                    setDisabled(true);
                    setFetchLogRunning(true);
                    getLogRequest(
                      props.logURL,
                      {
                        server_id: instance,
                        qty: qty,
                        order: order,
                        type: type,
                      },
                      (err, res) => {
                        setDisabled(false);
                        setFetchLogRunning(false);
                        if (err) {
                          props.snackbar("Unable to fetch log files", "error");
                        } else {
                          setLogfileList(res.data);
                        }
                      }
                    )
                  }}
                >
                  {fetchLogRunning ? <CircularProgress size={14} color="inherit"/> : "fetch logs"}&nbsp;
                </Button>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <List>
              {logfileList?.map((data, i) => (
                <ListItem key={i} button onClick={() => {
                  setLogFilename(data.basename);
                  setFetchLogfileRunning(true);
                  getLogRequest(
                    props.logURL,
                    {
                      server_id: instance,
                      search_query: data.name
                    },
                    (err, res) => {
                      setFetchLogfileRunning(false);
                      if (err) {
                        props.snackbar("Unable to fetch log file.", "error")
                      } else {
                        setLogFile(res.data)
                      }
                    }
                  )
                }}>
                  <ListItemText>
                    <Typography variant="body2">
                      <b>{data.basename}</b>
                    </Typography>
                    <Typography variant="caption">
                      {moment(parseInt(data.basename.split('.')[0])).format('DD MMMM YYYY, hh:mm:ss')} &#12539; {moment(data.lastModified).fromNow()}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
      {logFilename ? 
        <Grid item xs={12} sm={8} >
          <Box component="code" sx={{
            height: {
              xs: "60vh",
              sm: "70vh",
              md: "80vh",
            },
            overflowY: "scroll",
            wordWrap: "break-word",
            fontSize: {
              xs: "11px",
              sm: "12px",
              md: "12px",
              xl: "16px"
            },
            display: "block",
            border: "1px solid #444",
            borderRadius: "4px",
            padding: "4px",
            whiteSpace: "pre-wrap"
          }}>
            {/* {fetchLogfileRunning ? "Please wait..." : (`${logFile}` || "Empty file")} */}
            {fetchLogfileRunning ? "Please wait..." : 
              (
                <><b>[[{logFilename}]]</b><br/><br/>{logFile}</>
                || "Empty file"
              )
            }

          </Box>
            {/* <pre>
              {JSON.stringify(logFile, null, 2)}
            </pre> */}
        </Grid> : null
      }
    </Grid>
  )
}

export default LogPage