import React from 'react'
import Typography from '@mui/material/Typography';
import BookIcon from "@mui/icons-material/Book";
import GroupsIcon from "@mui/icons-material/Groups";

function Footer() {
  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "700",
          display: "flex",
          justifyContent: "center",
          alignItems:'baseline'
        }}
      >
        Divides the <BookIcon style={{ color: "#fe3d39", fontSize: 50 }} /> task
        and <br /> multiplies the
        success...
      </Typography>
    </div>
  );
}

export default Footer