import React from 'react'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'

function Dialogs({dialog,details,setDialog}) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDialog(null)
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"DETAILS"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              <Grid item xs={5}>
                <Avatar
                  alt={details.first_name}
                  src={details.img}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {details.first_name.toUpperCase()}{" "}
                  {details.last_name.toUpperCase()}
                </Typography>
                <Typography> {details.phone}</Typography>
                <Typography>{details.email}</Typography>
                <Typography>{details.DOB}</Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dialogs
