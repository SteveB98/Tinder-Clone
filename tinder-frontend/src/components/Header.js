import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
function Header() {
  const[cookies,setCookie,removeCookie] =useCookies(['user'])
  let navigate = useNavigate()
  const logout = () => {
    removeCookie('UserId',cookies.userId)
    removeCookie('AuthToken',cookies.token)
    navigate('/')
  }
  return (
    <div className="header">
      <IconButton>
      <PersonIcon fontSize="large" className="header__icon" />
      </IconButton>
      <button className ='log-out-button'onClick={logout}> 
      <IconButton>
      <FireplaceIcon fontSize="large" className="header__icon"/>
      </IconButton>
      </button>
    <img
    className="header_logo"
    src="https://1000logos.net/wp-content/uploads/2018/07/tinder-emblem-768x432.jpg"
    alt=""
     />
     <IconButton>
     <ForumIcon fontSize="large" className="header_icon"/>
     </IconButton>
     
     </div>
  )
}
export default Header
