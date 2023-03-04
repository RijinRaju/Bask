import React from 'react'
import { Link } from "react-router-dom";
import "../WelcomePage/WelcomePage.css"
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import GroupsIcon from "@mui/icons-material/Groups";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffff",

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


function Home() {
  return (
    <div className="parent">
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "30px",
        }}
      >
        <Grid item>
          <Stack spacing={2}>
            <Item className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
              <Grid item xs={12} md={4}>
                <Link to="login">
                  <Button
                    className="slide"
                    style={{
                      backgroundColor: "#121212",
                      color: "white",
                      width: "30vh",
                      marginTop: "2vh",
                    }}
                  >
                    Student
                  </Button>
                </Link>
              </Grid>
            </Item>
            <Item className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
              <Grid item xs={12} md={4}>
                <Link to="adv_login">
                  <Button
                    className="slide1"
                    style={{
                      backgroundColor: "#121212",
                      color: "white",
                      width: "30vh",
                      marginTop: "2vh",
                    }}
                  >
                    Advisor
                  </Button>
                </Link>
              </Grid>
            </Item>
            <Item className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
              <Grid item xs={12} md={4}>
                <Link to="adm_login">
                  {" "}
                  <Button
                    className="slide2"
                    style={{
                      backgroundColor: "#121212",
                      color: "white",
                      width: "30vh",
                      marginTop: "2vh",
                    }}
                  >
                    Admin
                  </Button>
                </Link>
              </Grid>
            </Item>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home