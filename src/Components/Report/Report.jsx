import React,{useState,useEffect} from 'react'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import batch from "../../Assests/batch.png";
import location from "../../Assests/location.png";
import date from "../../Assests/date.png";
import { Card } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import jwtDecode from 'jwt-decode';
function Report() {
 
 const {
   register,
   handleSubmit,
   watch,
   formState: { errors },
 } = useForm();


  const [open, setOpen] = useState(false);
  const[batch,setBatch]   = useState([])
  const [advisor, setAdvisor] = useState(0);
  const [lists, setLists] = useState([]);
 
!advisor && setAdvisor(jwtDecode(localStorage.getItem("AdvisorToken")).user_id);
useEffect(()=>{

    axios.post("http://127.0.0.1:8000/advisor/adv_batchlst",{
        user:advisor,
        
    }).then(res=>{
        setBatch(res.data)
    })


    axios.post("http://127.0.0.1:8000/advisor/list_reports").then(res=>{
        setLists(res.data)
    })
},[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

 

  const BatchFormSubmit = (e) => {
    console.log(e.students);
    axios
      .post("http://127.0.0.1:8000/advisor/add_report", {
        students: e.students,
        eliminated: e.eliminated,
        note: e.notes,
        batch: e.batch,
      })
      .then((res) => {
          console.log(res.data)
        setLists(res.data);
        handleClickClose();
      });
  };
    return (
      <div>
        <div>
          <span className="font-sans text-blue-700 font-semibold text-lg">
            Add Batch{" "}
          </span>
          <Grid container spacing={3}>
            {/* listing and creating batches */}

            {lists.map((list) => {
              return (
                <Grid item sx={{ m: 2 }} className="rounded-xl ">
                  <Paper container elevation={5} sx={{ width: "500px" }}>
                    <Card sx={{ backgroundColor: "black" }}></Card>
                    <nav aria-label="main mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <img src={batch} width="25" height="25" />
                            </ListItemIcon>
                            <ListItemText primary={list.students} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <img src={location} width="25" height="25" />
                            </ListItemIcon>
                            <ListItemText primary={list.eliminated} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <img src={date} width="25" height="25" />
                            </ListItemIcon>
                            <ListItemText primary={list.date} />
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText
                              primary={list.note}
                            />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </nav>
                  </Paper>
                </Grid>
              );
            })}

            <MenuItem onClick={handleClickOpen} sx={{ marginTop: 10 }}>
              <AddCircleOutlineIcon />
              Add Report
            </MenuItem>
          </Grid>

          {/* dialog box for adding batch */}

          <Dialog open={open}>
            <DialogTitle>Report</DialogTitle>
            <Box
              component="form"
              onSubmit={handleSubmit((e) => BatchFormSubmit(e))}
            >
              <DialogContent>
                <DialogContentText>Batch week Reports</DialogContentText>
                <Grid container spacing={2}>
                  <Grid xs={6} sx={{ m: 2 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="students"
                      helperText="No. of students"
                      name="students"
                      type="number"
                      fullWidth
                      variant="outlined"
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      {...register("students", {
                        required: true,
                      })}
                    />
                    {errors.students && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid xs={4} sx={{ m: 2 }}>
                    <TextField
                      margin="dense"
                      id="elimiated"
                      helperText="No. Eliminated Students"
                      type="number"
                      name="eliminated"
                      fullWidth
                      variant="outlined"
                      {...register("eliminated", {
                        required: true,
                      })}
                    />
                    {errors.eliminated && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid xs={4} sx={{ m: 2 }}>
                    <Select
                      name="batch"
                      id="batch"
                      defaultValue={batch.id}
                      sx={{ input: { color: "white" },width:250 }}
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                      {...register("batch",{
                          required:true,
                      })}
                    >
                      {batch && batch.map((batch) => (
                        <MenuItem value={batch.id} key={batch.id}>
                          {batch.Batch_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.batch && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid xs={12} sx={{ m: 2 }}>
                    <TextField
                      margin="dense"
                      id="location"
                      helperText="Notes"
                      type="text"
                      name="notes"
                      fullWidth
                      multiline
                      rows="8"
                      variant="outlined"
                      {...register("notes", {
                        required: true,
                      })}
                    />
                    {errors.eliminated && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
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
      </div>
    );
}

export default Report