import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import  Avatar  from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import './AddAdvisor.css'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress';

function AddAdvisor() {

const navigate = useNavigate()

const[processing,setProcessing] = useState()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let formdata = new FormData()

  const AdvisorsFormSubmit=(e)=>{
    console.log(e.dob)

    formdata.append('first_name', e.first_name)
    formdata.append('last_name', e.last_name)
    formdata.append('email',e.email)
    formdata.append('phone', e.phone)
    formdata.append('img', e.img[0])
    formdata.append('DOB', e.dob)
    formdata.append('password', e.dob)
    let config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios.post('http://127.0.0.1:8000/admin/add_advisors',formdata,config).then(res=>{
      navigate('/adm_home/list_advisor')
    })

     
  }

  return (
    <div>
  
      <Grid container spacing={3} >
        <span className="font-sans text-blue-700 font-semibold text-lg">Add Advisors</span>
        <Grid item md={6} m={2}>
          <Paper m={3}
          elevation={5}
          component="form"
          onSubmit={handleSubmit((e)=>AdvisorsFormSubmit(e))}
          >
           
            <Grid container spacing={1}>
              <Grid item xs={6} md={5} m={1}>
                {errors.first_name && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <TextField 
                id="first_name" 
                label="First Name"
                name="first_name"
                 variant="outlined" 
                  {...register("first_name", {
                    required: true,
                  })}
                 />
                <FormHelperText id="outlined-weight-helper-text">FIRST NAME</FormHelperText>
              </Grid>
              <Grid item xs={6} md={5} m={1}>
                {errors.last_name && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <TextField 
                id="last_name" 
                label="Last Name"
                name="last_name"
                 variant="outlined" 
                  {...register("last_name", {
                    required: true,
                  })}
                 />
                <FormHelperText id="outlined-weight-helper-text">LAST NAME</FormHelperText>
              </Grid>
              <Grid item xs={6} md={5} m={1}>
                {errors.email && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <TextField
                
                type="email"
                 id="email"
                 name="email"
                  label="Email"
                   variant="outlined"
                  {...register("email", {
                    required: true,
                  })}
                   />
                <FormHelperText id="outlined-weight-helper-text">EMAIL</FormHelperText>
              </Grid>
              <Grid item xs={6} md={5} m={1}>
                {errors.phone && (
                  <span style={{ color: "red" }}>Enter valid number</span>
                )}
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  {...register("phone", {
                    required: true,
                  })}
                />
                <FormHelperText id="outlined-weight-helper-text">PHONE</FormHelperText>
              </Grid>
              <Grid item xs={6} md={5} m={1}>
                {errors.email && (
                  <span style={{ color: "red" }}>Enter proper DOB</span>
                )}
                
                <OutlinedInput
                
                 id="dob"
                  type="date" 
                  name="dob"
                  inputProps={{
                    'aria-label': 'DOB',
                  }}
                  {...register("dob", {
                    required: true,
                  })}
                  />
                <FormHelperText id="outlined-weight-helper-text">DOB</FormHelperText>
              </Grid>
              
            </Grid>
            <Grid>
              <Button variant="contained" type="submit" sx={{
                m: 4
              }}>
                submit
              </Button>
            </Grid>
          </Paper>

          
        </Grid>
        <Grid item md={3} mt={1} >
          <Paper
            elevation={5}
          sx={{
            height:"30vh"
          }}
          > <Avatar sx={{
            m:3,
             width:100,
             height:100,
            
             }}
             style={{
               position:'relative',
               left:'2em',
             }}
              >
            </Avatar>
            
              <TextField
                type="file"
                id="img"
                name="img"
                size="medium"
              {...register("img", {
                required: true,
              })}
               
              />
            {errors.img && (
              <span style={{ color: "red" ,marginLeft:60}}>Upload Image</span>
            )}

              
          </Paper>
          
        </Grid>
      </Grid>

  </div>
  )
}

export default AddAdvisor