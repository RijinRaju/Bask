import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import VideocamIcon from "@mui/icons-material/Videocam";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Clock from "react-live-clock";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useForm} from 'react-hook-form'
import timer from '../../Assests/timer.jpg'
function AddConference(props) {

 const {
   register,
   handleSubmit,
   watch,
   formState: { errors },
 } = useForm();

  const[roomName,setRoomName] = useState('')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const navigate = useNavigate()
  
    const RoomNameSubmit=(e)=>{
      
        if(props.data=== "advisor"){
        navigate(`/adv_home/conf/${roomName}`)
        }
        else{
         navigate(`/home/conf/${roomName}`);
           }
  }


  return (
    <div>
      <Paper sx={{ height: "80vh" }}>
        <Grid container spacing={2}>
          <Grid
            xs={12}
            md={6}
            sm={12}
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              height: "80vh",
            }}
          >
            <Stack spacing={5}>
              <Box
                component="button"
                sx={{
                  width: "40vh",
                  height: 80,

                  backgroundColor: "orange",
                  ":hover": {
                    bgcolor: "orange",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
                onClick={handleClickOpen}
              >
                <VideocamIcon
                  sx={{
                    width: 60,
                    height: 60,
                    color: "white",
                  }}
                />
                <Typography sx={{ mt: 2, color: "white" }}>
                  Join  Meeting
                </Typography>
              </Box>

              <Box
                component="button"
                sx={{
                  width: "40vh",
                  height: 80,
                  backgroundColor: "blue",
                  display: "flex",
                  ":hover": {
                    bgcolor: "blue",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
                onClick={handleClickOpen}
              >
                <AddBoxIcon
                  sx={{
                    width: 60,
                    height: 60,
                    color: "white",
                  }}
                />
                <Typography sx={{ mt: 2, color: "white" }}>
                  Start Meeting
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItmes: "center",
            }}
            sm={12}
          >
            <Paper
              sx={{
                height: "50vh",
                mt: 13,
                width: "45vh",
                backgroundImage: `url(${timer})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white" }}>
                {" "}
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </h2>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join Meeting</DialogTitle>
        <Paper
          component="form"
          elevation={5}
          onSubmit={handleSubmit((e) => RoomNameSubmit(e))}
        >
          <DialogContent>
            <TextField
              sx={{
                width: 200,
              }}
              varient="standard"
              label="RoomID"
              name="room_name"
              displayValue={roomName}
              {...register("room_name", { required: true })}
              onChange={(e) => setRoomName(e.target.value)}
            />
            {errors.room_name && (
              <p style={{ color: "red" }}>Room name is Required</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Join</Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}

export default AddConference