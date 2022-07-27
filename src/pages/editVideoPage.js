import { Box } from "@mui/system";
import LayoutToolbarWrapper from "../common/layoutToolbarWrapper";

export default function EditVideoPage(props) {
  return (
    <Box>
      <LayoutToolbarWrapper setDrawerState={(data) => (props.setDrawerState(data))}/>
      <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py:3 }}>
        Edit Video Page
      </Box>
    </Box>
  )
}