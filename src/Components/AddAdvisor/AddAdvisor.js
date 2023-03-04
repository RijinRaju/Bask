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
import LoadingBar from '../LoadingBar/LoadingBar'

function AddAdvisor() {

const navigate = useNavigate()

const[processing,setProcessing] = useState(false)
const[img,setImg] = useState({})
const[imgFile,setImgFile]= useState(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let formdata = new FormData()


  const handlePreview = (event)=>{
    const file = event.target.files[0];
    setImgFile(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const AdvisorsFormSubmit=(e)=>{
    console.log(imgFile)
    setProcessing(true)

    formdata.append('first_name', e.first_name)
    formdata.append('last_name', e.last_name)
    formdata.append('email',e.email)
    formdata.append('phone', e.phone)
    if (img) formdata.append('img',imgFile)
    formdata.append('DOB', e.dob)
    formdata.append('password', e.dob)
    let config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios.post('http://127.0.0.1:8000/admin/add_advisors',formdata,config).then(res=>{
      navigate('/adm_home/list_advisor')
    })

     
  }

  if(processing){
    return <LoadingBar/>
  }

  return (
    <div>
      <span className="font-sans text-blue-700 font-semibold text-lg">Add Advisors</span>
      <Grid container spacing={3} >
        <Grid item md={6} sx={{mt:2}}>
          <Paper m={3}
            className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)] "
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
            className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
          sx={{
            height:"30vh",
            width:"50vh"
          }}
          
          > <Avatar
          src={img}
          sx={{
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
            <input
              type="file"
              id="img"
              name="img"
              size="medium"
       
              onChange={handlePreview}
            />
              
          </Paper>
          
        </Grid>
      </Grid>

  </div>
  )
}

export default AddAdvisor