import React, { useState,useRef ,useEffect} from 'react'
import './AdminHome.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout"; 
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TerminalIcon from '@mui/icons-material/Terminal';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import {useForm} from 'react-hook-form'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        backgroundColor: '#efefef',

        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            backgroundColor: '#efefef',
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

function AdminHome() {


    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [open, setOpen] = useState(false);
    const [preview ,setPreview] = useState();
    const [user,setUser] = useState(0)

    const profile = useRef()

    const navigate = useNavigate()
    const toggleDrawer = () => {
        setOpen(!open);
    };



    !user && setUser(jwtDecode(localStorage.getItem('adminToken')).user_id)

    const logout = () => {
        localStorage.removeItem("adminToken")
        navigate('/adm_login')
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(()=>{
        axios.post('http://127.0.0.1:8000/admin/prf_load',{
            user:user
        }
        ).then((res) => {
            console.log(res.data)
            setPreview(res.data[0].img)
        })
    },[])


    const formdata = new FormData()
    
    const updateProfile=(e)=>{
        
        console.log(e.profle)
        formdata.append('img',e.profile[0])
        formdata.append('user',user)

        let config = {
            headers:{'content-type':'multipart/form-data'}
        }
        axios.post('http://127.0.0.1:8000/admin/prf_update',
            formdata,config

        ).then((res)=>{
        setPreview(res.data[0].img)
        })
    }

    if (preview)
    {   
        console.log(preview)
            var profile_img = preview.replace("/Frontend/src/Assests/Advisors/", "");

     
    }

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    
    return (

        <ThemeProvider theme={mdTheme}  >
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} style={{ backgroundColor: '#efefef', color: '#828282' }}>
                    <Toolbar
                        sx={{
                            pr: "24px", // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            ADMIN
                        </Typography>
                        <IconButton color="inherit"
                            id="basic-button"
                            aria-controls={opens ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={opens ? 'true' : undefined}
                            onClick={handleClick}
                           
                        >
                            
                            <Avatar alt="Remy Sharp" src={preview != null ?require('../../Assests/Advisors/'+ profile_img): null}  />
                        </IconButton>
                        
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={opens}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                      
                            <Avatar alt="Remy Sharp" src={preview != null ? require('../../Assests/Advisors/' + profile_img) : null} sx={{
                                width:100,
                                height:100,
                                m:1,
                            }} 
                            onClick={()=>profile.current.click()}
                            />

                           
                            
                                <MenuItem onClick={handleDialogClickOpen}>Update profile</MenuItem>
                                
                                <MenuItem onClick={logout}>Logout</MenuItem>
                           

                          
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}  >
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],

                        }}

                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    {/* <Divider /> */}
                    <List component="nav" style={{ backgroundColor: 'white', height: 400, overflowY: 'scroll', overflowX: 'hidden' }}
                    sx={{
                        "&::-webkit-scrollbar":{width:6},
                        "&::-webkit-scrollbar-track":{
                            backgroundColor:'white'
                        
                        },
                        "&::-webkit-scrollbar-thumb":{
                            backgroundColor:'#7602b6'
                        }
                    }}
                    >
                        <Link to="" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Domain" placement="right">
                                    <TerminalIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Domain" />
                            </ListItemButton>
                        </Link>

                        <Link to="add_batch" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Add Batch" placement="right">
                                    <BatchPredictionIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Add Batch" />
                            </ListItemButton>
                        </Link>

                        <Link to="add_advisor" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Add Advisor" placement="right">
                                    <PersonAddAltIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Add Advisors" />
                            </ListItemButton>
                        </Link>

                        <Link to="list_advisor" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Advisors" placement="right">
                                    <ContactsIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Advisors" />
                            </ListItemButton>
                        </Link>
                        <Link to="add_task" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Add Task" placement="right">
                                    <TaskIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="ADD Task" />
                            </ListItemButton>
                        </Link>

                        <Link to="task_view" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Tasks" placement="right">
                                    <AssignmentIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Tasks" />
                            </ListItemButton>
                        </Link>
                        <Link to="lists" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Requests" placement="right">
                                    <PendingActionsIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Requests" />
                            </ListItemButton>
                        </Link>

                        <Link to="manifests" style={{ textDecoration: "none", color: '#787878' }}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#787878' }}>
                                    <Tooltip title="Manifest" placement="right">
                                    <StickyNote2Icon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Manifest" />
                            </ListItemButton>
                        </Link>


                        <ListItemButton onClick={logout} style={{ color: '#787878' }}>
                            <ListItemIcon style={{ color: '#787878' }} >
                                <Tooltip title="Logout" placement="right">
                                <LogoutIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>

                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                        backgroundColor: '#f0f2f5'
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                        <Outlet />
                    </Container>
                </Box>
            </Box>



{/* profile update dialog box */}


            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <Box component="form" onSubmit={handleSubmit((e)=>updateProfile(e))}>
                <DialogContent>
                  
                    <input
                        autoFocus
                        margin="dense"
                        id="name"
                        name="profile"
                        label="Email Address"
                        type="file"
                        fullWidth
                        variant="standard"
                            {...register('profile', { required:true })}
                    />
                    
                        {errors.profile && (
                            <span style={{ color: "red" }}>please select any file</span>
                        )}
                </DialogContent>
                <DialogActions>
                    <Button type="sumbit">Upload</Button>
                    <Button onClick={handleDialogClose}>cancle</Button>
                </DialogActions>
                </Box>
            </Dialog>

        </ThemeProvider>

    );


}

export default AdminHome