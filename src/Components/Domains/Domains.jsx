import React, { useState, useEffect } from "react";
import "./Domains.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import LoadingBar from "../LoadingBar/LoadingBar";
function Domains() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [domList, setDomList] = useState([]);
  const [preview, setPreview] = useState(null);
  const[sendPreview,setSendPreview] = useState(null)
  const [progress, setProgress] = useState(true);
  const listDomain = () => {
    let token = localStorage.getItem("adminToken").replaceAll('"', "");
    const data = {
      Authorization: `token ${token}`,
    };
    axios
      .get("http://127.0.0.1:8000/admin/domains", { headers: data })
      .then((res) => {
        setDomList(res.data);
        setProgress(false)
      });
  };

  useEffect(() => {
    listDomain();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const handleImageChange = (e) => {
  
     const file = e.target.files[0];
        console.log(file);
     setSendPreview(file);
     const reader = new FileReader();
     reader.onloadend = () => {
       setPreview(reader.result);
     };
     reader.readAsDataURL(file);
   };

  let formdata = new FormData();

  const domainSubmit = (e) => {

    if (preview) formdata.append("img", sendPreview);
    formdata.append("title", e.domain_name);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post("http://127.0.0.1:8000/admin/add_domain", formdata, config)
      .then((e) => {
        setDomList(e.data);
      });
    setOpen(false);
    listDomain();
  };

 


  if (progress) {
    return <LoadingBar />;
  }

  return (
    <div>
      {/* listing the domain names and logo */}
      <span className="font-sans text-blue-700 font-semibold text-lg">
        Domains
      </span>
      <Grid container spacing={3} style={{ color: "#5c5b58" }}>
        {domList.map((domain) => {
          return (
            <Grid item key={domain.id} md={6} xs={12}>
              <Paper
                className="domain_paper !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
                style={{
                  width: "400px",
                  height: 100,
                  margin: 2,
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={domain.img}
                      alt="domain_image"
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  </Grid>

                  <Grid
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <Button
                      onClick={() => {
                        axios
                          .delete(
                            `http://127.0.0.1:8000/admin/dom_del/${domain.id}`
                          )
                          .then((res) => {
                            console.log(res.data);
                            listDomain();
                          });
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              <Typography align="justify" ml={8}>
                {domain.title}
              </Typography>
            </Grid>
          );
        })}
        <Grid item mt={4} md={6} xs={12}>
          <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
            <Button onClick={handleClickOpen}>
              <AddIcon />
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* dialog box for adding domain name */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Domain</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit((e) => domainSubmit(e))}
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogContent>
            <DialogContentText>
              <Grid container style={{overflow:'hidden'}}>
                <Grid item xs={12} md={6}>

                <Avatar
                  alt="Remy Sharp"
                  src={preview}
                  sx={{ width: 100, height: 100 }}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <input
                  type="file"
                  size="medium"
                  name="domain_icn"
                  sx={{
                  
                  }}
  
                  onChange={handleImageChange}
                  // {...register("domain_icn", {
                  //   required: true,
                  // })}
                />
                </Grid>
                {/* {errors.domain_icn && (
                  <span style={{ color: "red" }}>This field is required</span>
                )} */}
              </Grid>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Domain Name"
                type="text"
                name="domain_name"
                
                variant="standard"
                {...register("domain_name", {
                  required: true,
                })}
              />
              {errors.domain_name && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default Domains;
