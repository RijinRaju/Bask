import React,{useState,useEffect} from "react";
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
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';





function AdminLogin() {
    const theme = createTheme();
    const[adminToken,setAdminToken]  = useState("")
    const [open, setOpen] = React.useState(false);
    

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();



    useEffect(()=>{
        if(open){
           
        }
    },[open])

    const loginSubmit=(e)=>{
       
        console.log(e)
        axios.post('http://127.0.0.1:8000/api/token',{
            email:e.email,
            password:e.password
        }).then(res=>{
        
            if (res.status === 200){
            localStorage.setItem("adminToken",JSON.stringify(res.data.access))
            navigate("/adm_home")
            }
        else{
            //   setOpen(true)
            
        }
        })
    }

    


    return (
        <div className="log_box">
            <Snackbar
                open={open}
                autoHideDuration={1000}
                message="Email incorrect"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            />
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
                                        pattern:{
                                            value:emailRegex,
                                            message:'invalid email'
                                        }
                                    })}/>
                                {errors.email && (
                                    <Snackbar
                                        open={true}
                                        autoHideDuration={1000}
                                        message="Email incorrect"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center'
                                        }}
                                    />
                                )}
                                <input type='password'
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    
                                    type="password"
                                    id="password"
                                    className="pass_field text-xs"
                                    placeholder="PASSWORD"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                {errors.password && (
                                <Snackbar
                                    open={true}
                                    autoHideDuration={1000}
                                    message="password incorrect"
                           
                                    anchorOrigin={{
                                        vertical:'top',
                                        horizontal:'center'
                                    }}
                                />)}
                               
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 5 }}
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
