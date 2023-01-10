import React,{useState} from "react";
import './AdminLogin.css'
import { Link ,useNavigate} from 'react-router-dom'
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
import axios from 'axios'






function AdminLogin() {
    const theme = createTheme();
    const[adminToken,setAdminToken]  = useState("")

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();



    const loginSubmit=(e)=>{
        console.log(e)
        axios.post('http://127.0.0.1:8000/api/token',{
            email:e.email,
            password:e.password
        }).then(res=>{
            console.log(res.data)
            if (res.status === 200){
            localStorage.setItem("adminToken",JSON.stringify(res.data.access))
            navigate("/adm_home")
            }
        
        })
    }

    


    return (
        <div className="log_box">
            <Box
                sx={{
                    width: 1 / 4,
                    position: "absolute",
                    top: "10vh",
                    transform: "translate(100%, 0%)",
                }}
                className="p_box"
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
                            <Avatar sx={{ m: 1, bgcolor:'black' }}>
                                <img src={logo} height="40"  alt="logo" />
                            </Avatar>

                            <Typography component="h1" variant="h5" style={{ color: 'black'}}>
                                Admin
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1,p:2 }} onSubmit={handleSubmit((e)=>loginSubmit(e))}>
                                <input type="text" 
                                
                                    required
                                    fullWidth
                                    label="Email"
                                    id="email"
                                    name="email"
                                    className="email_field"
                                    placeholder="EMAIL"
                                    {...register("email", {
                                        required: true,
                                    })}/>
                                {errors.email && (
                                    <span style={{ color: "red" }}>This field is required</span>
                                )}
                                <input type='password'
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    
                                    type="password"
                                    id="password"
                                    className="pass_field"
                                    placeholder="PASSWORD"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                {errors.password && (
                                    <span style={{ color: "red" }}>This field is required</span>
                                )}
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 10 }}
                                    style={{ backgroundColor: 'black' }}
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
    );
}

export default AdminLogin;
