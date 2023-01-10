import React,{useEffect} from 'react'
import AdminHome from '../Components/AdminHome/AdminHome'
import {useNavigate} from 'react-router-dom'

function AdminHomePage() {
  const navigate = useNavigate()
useEffect(()=>{
  localStorage.getItem('adminToken') ? navigate('/adm_home') : navigate('/adm_login');
},[])
  
  return (
    <div>
      <AdminHome/>
    </div>
  )
}

export default AdminHomePage
