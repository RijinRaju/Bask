import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

function LoadingBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default LoadingBar;
