import React from 'react';
import {Link} from 'react-router-dom'
import './WelcomePage.css';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';


function WelcomePage(){

    return (
     <div className="welcome">
        <Stack spacing={2}>
        <Header />
        <Home/>
        <Footer/>
        </Stack>
      </div>
    );
}
export default WelcomePage;