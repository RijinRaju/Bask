import React, { useState, useEffect } from 'react'
import './AddBatch.css'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import batch from '../../Assests/batch.png'
import location from '../../Assests/location.png'
import date from '../../Assests/date.png'
import { Card } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import user from '../../Assests/user.png'
import LoadingBar from '../LoadingBar/LoadingBar'


function AddBatch() {

  const [open, setOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const[progress,setProgress] = useState(true)

  const [advisors, setAdvisor] = useState([])
  const [lists, setLists] = useState([])
  const [domain, setDomain] = useState(0)
  const [weeks, setWeeks] = useState('')
  const [count, setCount] = useState([])
  
  let tbox = [1, 2, 3, 4, 5]
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const formdata = new FormData()



  useEffect(() => {
  
   
    axios.get("https://www.baskpro.online/admin/list_advisors").then((res) => {
      setAdvisor(res.data)
    });

    axios.get("https://www.baskpro.online/admin/batch_list").then(res => {
      setProgress(false)
      setLists(res.data)
      console.log(res.data)
    })

  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }


  const handleClickClose = () => {
    setOpen(false)
  }


  const handleTaskOpen = () => {
    setTaskOpen(true)
  }

  const handleTaskClose = () => {
    setTaskOpen(false)
  }


  const BatchFormSubmit = (e) => {
    console.log(e.advisor)
    axios.post('https://www.baskpro.online/admin/add_batch',
      {
        batch_advisor: e.advisor,
        location: e.location,
        Batch_name: e.batch_name


      }).then(res => {
        setLists(res.data)
        handleClickClose()
      })
  }



  const TaskFormSubmit = (e) => {
    e.preventDefault()


  }
  if (progress){
   return <LoadingBar/>
   }
   else{
  return (
    <div> 
      <span className="font-sans text-blue-700 font-semibold text-lg ">Add Batch </span>
      <Grid container spacing={3}>
       
        {/* listing and creating batches */}

        {
          lists.map(list => {
            return (
              <Grid item sx={{ m: 2 }} className="rounded-xl ">
                <Paper container elevation={5} sx={{ width: '500px' }}>
                  <Card sx={{ backgroundColor: "black" }}>
                  </Card>
                  <nav aria-label="main mailbox folders">
                    <List style={{
                      cursor:"none"
                    }}>
                      <ListItem >
                       
                          <ListItemIcon>
                            <img src={batch} width="25" height="25" />
                          </ListItemIcon>
                          <ListItemText primary={list.Batch_name} />
                       
                      </ListItem>
                      <ListItem >
                        
                          <ListItemIcon>
                            <img src={location} width="25" height="25" />
                          </ListItemIcon>
                          <ListItemText primary={list.location} />
                  
                      </ListItem>
                      <ListItem >
                      
                          <ListItemIcon>
                            <img src={date} width="25" height="25" />
                          </ListItemIcon>
                          <ListItemText primary={list.start_date} />
                      
                      </ListItem>
                      <Divider />
                      <ListItem >
                        
                          <ListItemIcon>
                            <img src={user} width="25" height="25" />
                          </ListItemIcon>
                          <ListItemText primary={list.batch_advisor.first_name} />
                        
                      </ListItem>
                    </List>
                  </nav>



                </Paper>
              </Grid>
            )
          })}


        <MenuItem onClick={handleClickOpen} sx={{mt:5}}><AddCircleOutlineIcon />Add Batch</MenuItem>


      </Grid>




      {/* dialog box for adding batch */}

      <Dialog open={open} >
        <DialogTitle>Batch</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit((e) => BatchFormSubmit(e))}
        >
          <DialogContent>
            <DialogContentText>
              Add new batch Details
            </DialogContentText>
            <Grid
              container
              spacing={2}
            >
              <Grid xs={6} sx={{ m: 2 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="batch_name"
                  label="Name"
                  name="batch_name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  {...register("batch_name", {
                    required: true,
                  })}
                />
                {errors.batch_name && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Grid>
              <Grid xs={4} sx={{ m: 2 }}>
                <TextField

                  margin="dense"
                  id="location"
                  label="Location"
                  type="text"
                  name="location"
                  fullWidth
                  variant="outlined"
                  {...register("location", {
                    required: true,
                  })}
                />
                {errors.location && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Grid>
              <Grid xs={4} sx={{ m: 2 }}>
                <InputLabel>Advisors</InputLabel>
                <Select
                  id="advisors"
                  name="advisor"
                  label="Advisor"
                  sx={{
                    width: 350
                  }}
                  value={advisors.id}
                  {...register("advisor", {
                    required: true,
                  })}
                >
                  {
                    advisors.map(adv =>
                    (
                      <MenuItem value={adv.id}>{adv.first_name}</MenuItem>
                    )
                    )
                  }

                </Select>
                {errors.advisor && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>

    </div>
                
    

  )
                }
}

export default AddBatch