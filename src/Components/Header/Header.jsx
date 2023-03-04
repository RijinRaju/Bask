import React from 'react'
import logo from '../../Assests/logo2.png'
import Stack from "@mui/material/Stack";
import { Typography } from '@mui/material';


function Header() {
  return (
    <div>
    <Stack direction="row">
    <img src={logo} width="50px" height="50px" style={{margin:'1vh'}}/>
    <Typography sx={{fontWeight:'700',margin:'2vh'}} variant="h6">BASK</Typography>
    </Stack>
    </div>
  )
}

export default Header