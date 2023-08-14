import React from 'react'
import logo from '../img/SocialApp.jpg'
import "../css/Navbar.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
function Navbar({login}) {
  const navigate=useNavigate();
  const {setModalOpen}=useContext(LoginContext);
  const loginStatus=()=>{
      const token=localStorage.getItem("jwt")
      if(login || token)
      {
        return [
          <>
              <Link to="/profile"><li>Profile</li> </Link> 
            <Link to="/createPost"><li>Create Post</li> </Link> 
            <Link  to="/followingpost" style={{marginLeft:"20px"}}>My Following</Link>
            <Link to={""}>
              <button className='primaryBtn' onClick={()=>setModalOpen(true)}>Log Out</button>
            </Link>
          </>
        ]
      }
      else
      {
         return [
          <>
            <Link to="/signup"><li>SignUp</li> </Link> 
          <Link to="signin"><li>SignIn</li> </Link> </>
         ]
      }
  }
  return (
    <div className='navbar'>
        <img src={logo} alt="" onClick={()=>navigate("/")}></img>
        <ul className='nav-menu'>
          {loginStatus()}
        
        </ul>
    </div>
  )
}

export default Navbar