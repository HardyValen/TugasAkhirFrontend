import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import moment from "moment";
import { Fragment } from "react";

function VideoList({videos, clickHandler}) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <List sx={{py: 0}}>
        {videos.map((data, index) => (
          <Fragment key={index}>
            <ListItem button onClick={clickHandler(data._id)}>
              <ListItemText>
                <Typography sx={{
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
            {parseInt(index) !== videos.length - 1 ? <Divider sx={{my:1}}/> : <></>}
          </Fragment>
        ))}
      </List>
    </Box>
  )
}

export default VideoList;