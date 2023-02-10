
import React,{useState} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../Assests/logo.png'
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from 'react-hook-form'


const theme = createTheme();

function AdvisorLogin() {
    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()

    const advisorLogin = (e) => {

    axios.post('http://127.0.0.1:8000/api/token', {

        email: e.email,
        password: e.password,
    }).then(res => {
        console.log("hello")
        if (res.status === 200) {

            localStorage.setItem('AdvisorToken', JSON.stringify(res.data.access))
            navigate('/adv_home')
        }
    
            console.log(res.data)
            setError("No active account found")
        
    })

}
  return (


          <div className="log_main">
              <Box
              
                  sx={{
                      width: 1 / 4,
                      position: "absolute",
                      top: "10vh",
                      transform: "translate(100%, 0%)",
                  }}
                  className="parent_box"
              >
                  <ThemeProvider theme={theme}>
                      <Container component="main" maxWidth="xs">
                          <CssBaseline />
                          <Box
                         
                              sx={{
                                  marginTop: 8,
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                              }}
                          >
                              <Avatar sx={{ m: 1, bgcolor: "black" }}>
                                  <img src={logo} height="40" alt="logo" />
                              </Avatar>

                              <Typography component="h1" variant="h5">
                                  Advisor
                              </Typography>
                          <Box component="form" noValidate sx={{ mt: 1 }} component="form"
                              onSubmit={handleSubmit((e) => advisorLogin(e))}>
                                  <TextField
                                      margin="normal"
                                      required
                                      fullWidth
                                      label="Email"
                                      id="email"
                                      name="email"
                                      autoComplete="email"
                                      autoFocus
                                      style={{
                                          borderRadius: 10,
                                      }}
                                  {...register("email", {
                                      required: true,
                                  })}
                                  />
                              {errors.email && (
                                  <span style={{ color: "red" }}>This field is required</span>
                              )}
                                  <TextField
                                      margin="normal"
                                      required
                                      fullWidth
                                      name="password"
                                      label="Password"
                                      type="password"
                                      id="password"
                                      autoComplete="current-password"
                                      style={{
                                          borderRadius: 10,
                                      }}
                                  {...register("password", {
                                      required: true,
                                  })}
                                  />
                              {errors.password && (
                                  <span style={{ color: "red" }}>This field is required</span>
                              )}
                                  {error && <span>{error}</span>}
                                  <Button
                                      type="submit"
                                      fullWidth
                                      variant="contained"
                                      sx={{ mt: 3, mb: 2 }}
                                      style={{ backgroundColor: "black" }}
                                  >
                                      Sign In
                                  </Button>
                                  <Grid container>
                                      <Grid item xs></Grid>
                        
                                  </Grid>
                              </Box>
                          </Box>
                      </Container>
                  </ThemeProvider>
              </Box>
          </div>
  )
}

export default AdvisorLogin