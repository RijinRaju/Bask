import React, { useEffect, useState } from 'react'
import './Signup.css'
import {useNavigate,Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../Assests/logo2.png'
import { Helmet } from 'react-helmet'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const theme = createTheme();

function Signup() {

const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();



  
  const [domains, setDomains] = useState([])

  useEffect(() => {
    

     axios.get("http://127.0.0.1:8000/admin/domains")
      .then((res) => {
        setDomains(res.data);
        console.log(res.data)
      });
  }, [])


  const signupFormSubmit = (e) => {
    console.log(e)
    axios.post('http://127.0.0.1:8000/signup',{
      first_name : e.firstName,
      last_name : e.lastName,
      email : e.email,
      // Batch: e.Batch,
      password : e.password,
      domain_name :e.domain
     
    }).then(res=>{
      console.log(res.data)
      if(res.status == 200)
      {
        navigate('/')
      }
      else{
        console.log("email already exists")
      }
    })
  }
  return (
    <div className="signup_parent" >
      <Helmet>
        <style>{'body { background-image: linear-gradient(#ececec,#eaeaea) }'}</style>
      </Helmet>
      <Box
        
        sx={{

          position: "absolute",
          top: "10vh",
          transform: "translate(100%, 0%)",
        }}
        className=" rounded-2xl signup_box"
      >
        <ThemeProvider theme={theme} >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
             
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
              }}
            >
              <Avatar sx={{ m: 1}}>
                <img src={logo} height="40" alt="logo" />
              </Avatar>
              <Typography component="h1" sx={{color:'black'}} variant="h5">
                Sign up
              </Typography>
              <Box
               component="form" 
               noValidate sx={{ mt: 3 }} 
               onSubmit={handleSubmit((e) => { signupFormSubmit(e) })}
                >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      sx={{ input: { color: '#a4a4a4', backgroundColor: '#ececec' }}}
                      InputLabelProps={{
                        style: { color: 'a4a4a4' },
                      }}
                      autoFocus
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      sx={{ input: { color: '#a4a4a4', backgroundColor: '#ececec' } }}
                      InputLabelProps={{
                        style: { color: 'a4a4a4' },
                      }}
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                    {errors.lastName && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      type="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      sx={{ input: { color: '#a4a4a4', backgroundColor: '#ececec' } }}
                      InputLabelProps={{
                        style: { color: 'a4a4a4' },
                      }}
                      {...register("email", {
                        required: true,
                      })}
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      sx={{ input: { color: '#a4a4a4', backgroundColor: '#ececec' } }}
                      InputLabelProps={{
                        style: { color: '' },
                      }}
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </Grid>
                 

                </Grid>
                <Button
                  type="submit"
                  className="submit_btn"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2, backgroundColor: 'black', ":hover": {
                      bgcolor: "black", // theme.palette.primary.main
                      color: "white",
                    },
                   }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item >
                    <Link to="/" variant="body2" style={{ color: 'white' }}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>

          </Container>
        </ThemeProvider>
      </Box>
    </div>
  )
}

export default Signup