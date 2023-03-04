import React,{useEffect, useState} from 'react'
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";


function SnackBar({ snack,msg,setSnackOpen }) {
  
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
      setSnackbar(snack)
  }, [snack]);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(null)
    setSnackbar(!snack);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message= {msg}
        action={action}
      />
    </div>
  );
}

export default SnackBar;