import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'


function ProtectedRoute(props) {

  const navigate = useNavigate()
  

  let {Component} = props

  useEffect(()=>{

    let login =  localStorage.getItem("adminToken");

    if(!login){
      console.log("helllo world")
      navigate("/adm_login");
    }
  })
  return (
    <div>
     
      <Component/>
    </div>
  )
}

export default ProtectedRoute