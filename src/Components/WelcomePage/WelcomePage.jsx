import React from 'react';
import {Link} from 'react-router-dom'
import './WelcomePage.css';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
function WelcomePage(){

    return (
      <div className="parent">
        <div className="child">
          <Grid container>
            <Grid item xs={12} md={4}>
                <Link to="login">
              <Button
                className="slide"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  width: "30vh",
                  marginTop: "2vh",
                }}
              >
                &nbsp;
              </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
                <Link to="adv_login">
              <Button
                className="slide1"
                style={{
                  backgroundColor: "#01ffff",
                  color: "white",
                  width: "30vh",
                  marginTop: "2vh",
                }}
              >
                Advisor
              </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link to="adm_login">
                {" "}
                <Button
                  className="slide2"
                  style={{
                    backgroundColor: "#01ffff",
                    color: "white",
                    width: "30vh",
                    marginTop: "2vh",
                  }}
                >
                  Admin
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
}
export default WelcomePage;