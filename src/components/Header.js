import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext, { AuthProvider } from '../context/AuthContext'
import { redirect } from 'react-router-dom'
const Header = () => {
 let {user,LogoutUser}=useContext(AuthContext)
  return (
    <div>
      <Link to="/"><p>home</p></Link>
      {user ? (<button onClick={LogoutUser}>logout</button>):(<Link to="/login"><p>login</p></Link>)}
      {user && <p><AuthProvider>hello {user.username}</AuthProvider></p>}
     
    </div>
  )
}

export default Header
