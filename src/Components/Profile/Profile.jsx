import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { InputLabel, Select, MenuItem } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import jwt_decode from 'jwt-decode'
import Slider from '@mui/material/Slider'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [domains, setDomains] = useState([]);
  const [batch, setBatch] = useState([]);
  const formdata = new FormData();
  const [user, setUser] = useState(0);
  const [profile,setProfile] = useState([])
  const[address,setAddress] = useState({})
   const [addresses, setAddresses] = useState([]);



const updateAddresses=()=>{
  axios.post("http://127.0.0.1:8000/fch_add", { user: user }).then((res) => {
    console.log(res.data);
    setAddresses(res.data);
  });
}

  const profiles=()=>{
    axios
      .post("http://127.0.0.1:8000/profile", {
        id: user,
      })
      .then((e) => {
        console.log(e.data.batch);
        setBatch(e.data.batch);
        setProfile(e.data.profile);
      });

  }
  useEffect(() => {

    profiles()
    axios.get("http://127.0.0.1:8000/domains").then((res)=>{
      setDomains(res.data)
    })

    updateAddresses()

  }, []);


 
// decoding the jwt token
!user && setUser(jwt_decode(localStorage.getItem("studentToken")).user_id);
  
  const handleClickOpen = () => {
    setOpen(true);
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const profileFormSubmit = (e) => {

    console.log(e);
    formdata.append('domain_name',e.domain)
    formdata.append('img',e.img[0])
    formdata.append('id',user)

    let config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios.post('http://127.0.0.1:8000/prf_update',formdata,config).then((res)=>{
     profiles();  
    handleClose()
     
    })


  };

const addAddress = (e)=>{
const {name,value} = e.target
if(value != "")
{
  setAddress(address => ({...address,[name]:value}))

}
}
  
const updateAddress=(e)=>{
e.preventDefault()
console.log(address)
axios.post('http://127.0.0.1:8000/address',{
  user:user,
  dob:address.dob,
  age:address.age,
  gender:address.gender,
  father_name:address.father_name,
  father_contact:address.father_con,
  mother_name:address.mother_name,
  mother_contact:address.mother_con,
  address:address.address,
  village:address.village,
  taluk:address.taluk,
  education_qualification:address.education_qualification,
  collage_or_school:address.collage_or_school
}).then(res=>{
  console.log(res.data)
  setAddress(res.data)
  updateAddresses()
})
}

  if(profile.img){
    var profile_img = profile.img.replace("/Frontend/src/Assests/Advisors/","");
    
  }
    return (
      <div
        className="container font-sans   flex-auto bg-gray-100 rounded-md"
        style={{ height: "100%" }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="flex flex-row"
        >
          <Grid item xs={4}>
            <Paper
              elevation={3}
              className="prf_paper p-6"
              sx={{ borderRadius: 6, width: "auto" }}
            >
              <h4 className="font-sans p-1 pl-11">PROFILE</h4>
              <div className="m-4 p-6 justify-center font-sans">
                <Avatar
                  alt={profile.first_name}
                  src={
                    profile_img
                      ? require(`../../Assests/Advisors/` + profile_img)
                      : null
                  }
                  sx={{ width: 100, height: 100 }}
                />

                <Typography sx={{ m: 2 }}>
                  Name:
                  <TextField
                    disabled
                    variant="standard"
                    value={profile.first_name}
                    readOnly
                    sx={{ m: 1 }}
                  />
                </Typography>
                <Typography sx={{ m: 2 }}>
                  Batch:
                  <TextField
                    disabled
                    variant="standard"
                    value={batch.batch ? batch.batch.Batch_name : "Nil"}
                    sx={{ m: 1 }}
                  />
                </Typography>
                <Typography sx={{ m: 2 }}>
                  Email:
                  <TextField
                    disabled
                    value={profile.email}
                    variant="standard"
                    sx={{ m: 1 }}
                  />
                </Typography>
                <Typography sx={{ m: 2 }}>
                  Domain:
                  <TextField
                    disabled
                    value={
                      profile.domain_name ? profile.domain_name.title : "Nill"
                    }
                    variant="standard"
                  />
                </Typography>
              </div>

              <Button
                variant="contained"
                size="medium"
                className="sub_btn"
                sx={{
                  ml: 28,
                  backgroundColor: "#10b981",
                  ":hover": {
                    bgcolor: "black", // theme.palette.primary.main
                    color: "white",
                  },
                }}
                onClick={handleClickOpen}
              >
                Update
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Grid item xs={12} sx={{}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <h4 className="font-sans p-2">Personal Details</h4>
                <Box component="form" onSubmit={updateAddress}>
                  <FormControl component="fieldset">
                    {addresses &&
                      addresses.map((address) => (
                        <FormGroup row>
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="DOB"
                            type="date"
                            name="dob"
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.dob : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Age"
                            name="age"
                            type="number"
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.age : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <Select
                            helperText="Gender"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="gender"
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.gender : ""}
                            onChange={addAddress}
                            sx={{
                              m: 1,
                            }}
                            displayEmpty
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                          </Select>

                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Father's name"
                            name="father_name"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.father_name : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Father's contact"
                            name="father_contact"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.father_contact : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Mother's Name"
                            name="mother_name"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.mother_name : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Mother's Contact"
                            name="mother_contact"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.mother_contact : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          {/* <TextField
                          id="outlined-multiline-flexible"
                          helperText="Gardian"
                          name="gardian"
                          multiline
                          maxRows={10}
                          style={{ width: 210 }}
                          size="small"
                          value={address ? address.gardian : ""}
                          onChange={addAddress}
                          sx={{
                            mt: 1,
                            m: 1,
                          }}
                        /> */}
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Address"
                            name="address"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.address : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Village"
                            name="village"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.village : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Taluk"
                            name="taluk"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={address ? address.taluk : ""}
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Education Qualification"
                            name="education_qualification"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={
                              address ? address.education_qualification : ""
                            }
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            helperText="Name of College/ School"
                            name="collage_or_school"
                            multiline
                            maxRows={10}
                            style={{ width: 210 }}
                            size="small"
                            defaultValue={
                              address ? address.collage_or_school : ""
                            }
                            onChange={addAddress}
                            sx={{
                              mt: 1,
                              m: 1,
                            }}
                          />
                          <FormGroup row>
                            <Button
                              variant="contained"
                              type="submit"
                              sx={{
                                height: 40,
                                mt: 1,
                                m:1,
                                backgroundColor: "#10b981",
                                ":hover": {
                                  bgcolor: "black", // theme.palette.primary.main
                                  color: "white",
                                },
                              }}
                            >
                              update
                            </Button>
                          </FormGroup>
                        </FormGroup>
                      ))}
                  </FormControl>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* dialog box for profile updates */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Profile <EmojiEmotionsIcon />
          </DialogTitle>
          <Box
            component="form"
            onSubmit={handleSubmit((e) => profileFormSubmit(e))}
          >
            <DialogContent className="text-sm font-mono">
              <Grid container>
                <Grid item xs={6} sx={{ mb: 2 }}>
                  <InputLabel>Domain</InputLabel>
                  {errors.domain && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                  <Select
                    fullWidth
                    name="domain"
                    helperText="Domain"
                    id="domain"
                    value={domains.id}
                    variant="outlined"
                    sx={{ width: 190, ml: 2 }}
                    InputLabelProps={{
                      style: { color: "#fff" },
                    }}
                    {...register("domain", {
                      required: true,
                    })}
                  >
                    {domains.map((domain) => (
                      <MenuItem value={domain.id} key={domain.id}>
                        {domain.title}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Profile Picture</InputLabel>
                  {errors.img && (
                    <span style={{ color: "red", marginLeft: 60 }}>
                      Upload Image
                    </span>
                  )}
                  <TextField
                    type="file"
                    id="img"
                    name="img"
                    size="medium"
                    {...register("img", {
                      required: true,
                    })}
                    helperText="Profile Picture"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </div>
    );
}

export default Profile;
