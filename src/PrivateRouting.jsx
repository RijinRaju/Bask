import React from 'react'
import jwtDecode from 'jwt-decode'
import{Route, useNavigate,Routes,Navigate} from 'react-router-dom'
import { Outlet } from 'react-router';

const PrivateRouting = () => {

const token = localStorage.getItem('studentToken');

const decode = token? jwtDecode(token): null;
console.log("decode",decode)

  return (

    decode?<Outlet/>:<Navigate to="/" />
  );
}

export default PrivateRouting


export const AdminPrivateRoute = ()=>{
const token  = localStorage.getItem('adminToken');

const decode = token ? jwtDecode(token): null;
console.log("token generated", decode);
return decode ? <Outlet />: <Navigate to="/" />;
}


export const AdvisorPrivateRoute = () => {
  const token = localStorage.getItem("AdvisorToken");

  const decode = token ? jwtDecode(token) : null;
  return decode ? <Outlet /> : <Navigate to="/" />;
};