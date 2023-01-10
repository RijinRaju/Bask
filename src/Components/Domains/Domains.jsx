import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Paper from '@mui/material/Paper'

function Domains() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [domList, setDomList] = useState([]);
   

  useEffect(() => {
    let token = localStorage.getItem("adminToken").replaceAll('"','')
    const data = {
      Authorization: `token ${token}`,
    };
    axios
      .get("http://127.0.0.1:8000/admin/domains",{headers: data})
      .then((res) => {
        setDomList(res.data);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let formdata = new FormData();
  const domainSubmit = (e) => {
    formdata.append("img", e.domain_icn[0]);
    formdata.append("title", e.domain_name);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post("http://127.0.0.1:8000/admin/add_domain", formdata, config)
      .then((e) => {
        setDomList(e.data);
      });
      setOpen(false)
  };

  return (
    <div>
      {/* listing the domain names and logo */}
      <span className="font-sans text-blue-700 font-semibold text-lg">
          Domains 
        </span>
      <Grid container spacing={3} style={{ color: "#5c5b58" }}>
        {domList.map((domain) => {
          let img_name = domain.img.replace(
            "/Frontend/src/Assests/Domains/",
            ""
          );
          return (
            <Grid item key={domain.id}>
              <Paper
                elevation={3}
                // component="card"
                sx={{
                  width: 500,
                  height: 100,
                  margin: 2,
                }}
              >
                <img
                  src={img_name && require("../../Assests/Domains/" + img_name)}
                  width="100"
                  height="70"
                  alt="domain image"
                />
              </Paper>
              <Typography align="justify" ml={8}>
                {domain.title}
              </Typography>
            </Grid>
          );
        })}
        <Grid item mt={4}>
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
              <TextField
                type="file"
                size="medium"
                name="domain_icn"
                {...register("domain_icn", {
                  required: true,
                })}
              />
              {errors.domain_icn && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Domain Name"
                type="text"
                name="domain_name"
                fullWidth
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
