import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import moment from "moment";
import { Fragment } from "react";

function VideoList(props) {
  return (
    <Box>
      <List sx={{py: 0}}>
        {
          props.videos?.length > 0
          ? props.videos?.map((data, index) => (
              <Fragment key={index}>
                <ListItem button disabled={props.vodFetchRunning} onClick={props.clickHandler(data)}>
                  <ListItemText>
                    <Typography variant="body2" sx={{
                      fontWeight: 500,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: "100%" 
                    }}>
                      {data.fieldname}
                    </Typography>
                    <Typography variant="caption">
                      {moment(data.createdAt).fromNow()}
                    </Typography>
                  </ListItemText>
                </ListItem>
                {parseInt(index) !== props.videos.length - 1 ? <Divider sx={{my:1}}/> : <></>}
              </Fragment>
            ))
          : <ListItem>No video found, try another keyword</ListItem>
        }
      </List>
    </Box>
  )
}

export default VideoList;