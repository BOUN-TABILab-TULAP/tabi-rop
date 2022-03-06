
import React, { useState, useEffect, useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles/";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Build from '@mui/icons-material/Build';
import Logout from '@mui/icons-material/Logout';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import  ConstructionIcon  from '@mui/icons-material/Construction';
const useStyles = makeStyles({
  svg: {
    textDecoration: "none !important",
    color:"white",  
  },
  link: {
    textDecoration: "none !important",
    color:"black",
    
  }
})
export default function Navigation({ handleDrawerToggle }) {
  const classes = useStyles()
  const { user, logout } = useContext(UserContext);
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const [open,setOpen] = React.useState(Boolean(anchorEl));
  const Log=()=>{
    console.log("logged out")
    logout()
    navigate("./main")

  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };
  return <>
    <Toolbar sx={{ zIndex:2,display: "flex", justifyContent: 'space-between',alignItems:"center" }}>
      <div style={{ display: "flex" }}>

      <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        <Typography variant="h4" sx={{ mt: "5px" }} noWrap component="div">
          Tabilab
        </Typography>
      </div>
      <div>
        
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.svg}
          onMouseOver={handleClick}
        >
          {!user.auth? 
          <Link  className={classes.svg} to='/login'>
             
            <AccountCircle className={classes.icon} fontSize="large" color="white" />
            </Link>
            :
             <Link  className={classes.svg} to='/panel'>
              <Avatar >{user.username[0].toUpperCase()}</Avatar>
             </Link>
              }
          
        </IconButton>
        {user.auth?
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          onMouseLeave={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
         {user.user_type==="administrator"?
         <div>
          <MenuItem>
          <Link  className={classes.link} to='/manageTools'>
          <ListItemIcon>
          <ConstructionIcon  fontSize="small"/>
          </ListItemIcon>
           Manage Tools
          
          </Link>
          </MenuItem>
         
         <MenuItem>
         <Link  className={classes.link} to='/manageUsers'>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Manage Users
             </Link>
          </MenuItem>
          <MenuItem>
         <Link  className={classes.link} to='/AddTool'>
            <ListItemIcon>
              <Build fontSize="small" />
            </ListItemIcon>
           Add Tool
             </Link>
          </MenuItem>
          </div>:
          <div>
            <MenuItem>
         <Link  className={classes.link} to='/AddTool'>
            <ListItemIcon>
              <Build fontSize="small" />
            </ListItemIcon>
           Add Tool
             </Link>
          </MenuItem>
          
          <MenuItem>
          <ListItemIcon>
          <Build  fontSize="small"/>
          </ListItemIcon>
           My Tools
          <Link  className={classes.link} to='/manageUsers'>
          </Link>
          </MenuItem>
          </div>

        }
          <MenuItem onClick={()=>Log()} >
            <ListItemIcon >
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>:
        <div></div>}

      </div>
    </Toolbar>
  </>
}