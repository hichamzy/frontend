import React from 'react'
import { useState,useEffect,useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Clients from './Clients'
import PrivateRoute from '../utils/PrivateRoute'
import { Link } from 'react-router-dom'
const HomePage = () => {
  
  let [notes,setNotes]= useState([])
  

  let {authTokens,LogoutUser}=useContext(AuthContext)
 
  useEffect(()=>{
      getnotes()
  })

  let getnotes = async () => {
    let response = await fetch('http://localhost:8000/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)  // Add a space after 'Bearer'
      }
    });
  
    let data = await response.json();
      
    if(response.status===200){
      setNotes(data);
    }else if(response.statusText==="Unauthorized"){
      LogoutUser()
    }
    
  };
  
  return (
    <div>
      <Link to="/Clients"><p>Clients</p></Link>
      <Link to="/products"><p>products</p></Link>
      <Link to="/suppliers"><p>suppliers</p></Link>
      <Link to="/orders"><p>orders</p></Link>
      <Link to="/orderItems"><p>orderItems</p></Link>
      
      <p>this is the home page</p>
      <ul>
        {notes.map(note=>(
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
