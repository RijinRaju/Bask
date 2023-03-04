import React, { useEffect, useState } from 'react';
import './ListAdvisors.css';
import Paper from '@mui/material/Paper'
import axios from 'axios';
import Grid from '@mui/material/Grid'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box'
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ListAdvisors() {

  const [advisors, setAdvisors] = useState([])
  const [open, setOpen] = useState(false);
  const [allocOpen, setAllocOpen] = useState(false);
  const [id, setId] = useState(0)
  const [count, setCount] = useState([])
  const [counter, setCounter] = useState(0)

  const incrementCount = () => {
    count_stud()
    setCounter(counter => counter + 1)
  }


  const decrementCount = () => {
    count_stud()
    setCounter(counter => counter - 1)
  }

  const displayCount = count > 0

  useEffect(() => {
    list_adv()
    count_stud()

  }, [])

  // api call for getting the listing advisors

  const list_adv = () => {
    axios.get("http://127.0.0.1:8000/admin/list_advisors").then(res => {

      setAdvisors(res.data)
    })

  }


  // api call for take the number of students which have no  advisors 

  const count_stud = () => {
    axios.get("http://127.0.0.1:8000/admin/count_students").then(res => {

      setCount(res.data)

    })
  }


  // api call for alloting the advisors

  const submitAlloc = () => {
    axios.post('http://127.0.0.1:8000/admin/allot_number', {
      counter: counter,
      id: id
    }).then((res) => {
      handleAllocClose()

    })
  }



  // dialog box controls for removing the advisors

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // dialog box for allocation 

  const handleAllocOpen = () => {
    count_stud()
    setAllocOpen(true)
  }


  const handleAllocClose = () => {
    setAllocOpen(false)
  }

  // api call for removing the advisors
  const removeAdv = () => {
    axios.post('http://127.0.0.1:8000/admin/remove_advisor', {
      id: id
    }).then((e) => {
      list_adv();
    })
    handleClose();
  }

  return (
    <div>
      <span className="font-sans text-blue-700 font-semibold text-lg">Advisors </span>

      <Paper className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
        <Card>
          {advisors.map((advisor) => {
            let image_url = advisor.img
            let img_name = ''
            if (image_url != null) {
              img_name = advisor.img.replace(
                "/Frontend/src/Assests/Advisors/",
                ""
              );
            }
            return (

              <Grid container spacing={3} key={advisor.id}>

                <Grid item xs={3} className="grid_1">
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    sx={{
                      m: 4,
                      width: 100,
                    }}
                    image={advisor.img}
                  />
                </Grid>
                <Grid xs={7} className="grid_2">
                  <CardContent
                    sx={{
                      m: 3,
                    }}
                  >
                    <Typography gutterBottom variant="p" component="div">
                      NAME:{advisor.first_name.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ROLE:{advisor.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      EMAIL:{advisor.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date Of Joining:{advisor.Date_of_joining}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      m: 3,
                    }}
                  >
                    <Button size="small"
                      onClick={() => {
                        setId(advisor.id)
                        handleAllocOpen()
                      }}

                    >
                      Allocate
                    </Button>
                    <Button size="small" onClick={() => {
                      setId(advisor.id)
                      handleClickOpen()

                    }}>
                      Remove
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            );
          })}
        </Card>
      </Paper>
      {/* dialogue box for remove advisors */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Advisor?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to remove?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={removeAdv} >Delete</Button>
        </DialogActions>
      </Dialog>


      {/* students allocate */}
      <Dialog
        open={allocOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAllocClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Allocate Students"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Fab variant="extended">
                Unallocated Students
                <Box
                  component="span"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    bgcolor: 'primary.main',
                    width: 40,
                    height: 40,
                    borderRadius: '50%'
                    , color: 'white',
                    ml: 1
                  }}>
                  {count.count}
                </Box>


              </Fab>
            </Grid>
            <Grid item xs={12} >
              <DialogContentText id="alert-dialog-slide-description" >
                Add Number of Students
              </DialogContentText>
              <ButtonGroup style={{ height: '3vh' }}>
                {counter ? (
                  <Button onClick={decrementCount} style={{
                    borderRadius: 9, marginRight: '10px', padding: '15px',
                    backgroundColor: '#1976d2',
                    color:'white'
                  }} >
                    <RemoveIcon />
                  </Button>
                ) : (
                    <Button disabled onClick={decrementCount} style={{
                      borderRadius: 9, marginRight: '10px', padding: '15px',
                     
                    }} >
                    <RemoveIcon />
                  </Button>
                )}


                <TextField type="number" value={counter} InputProps={{
                  inputProps: {
                    max: 10, min: 1
                  }
                }}
                  variant="outlined"
                  size="small"
                  style={{ height: '3rem', }}
                  disabled ></TextField>
                <Button onClick={incrementCount} style={{
                  borderRadius: 9, marginLeft: '10px', padding: '15px', backgroundColor: '#1976d2',
                  color:'white' }} >
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAllocClose}>Disagree</Button>
          <Button onClick={submitAlloc} >Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListAdvisors