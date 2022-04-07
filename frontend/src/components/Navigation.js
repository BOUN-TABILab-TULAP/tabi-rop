
import React, { useState, useEffect, useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles/";
import {Menu,AppBar} from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Build from '@mui/icons-material/Build';
import Logout from '@mui/icons-material/Logout';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
const useStyles = makeStyles({
  svg: {
    textDecoration: "none !important",
    color: "white",
    border: "none"
  },
  link: {
    textDecoration: "none !important",
    color: "black",

  }
})
export default function Navigation({ handleDrawerToggle }) {
  const classes = useStyles()
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(Boolean(anchorEl));
  const Log = () => {
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
    <AppBar color="primary" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex",flexDirection:"row", justifyContent: 'space-between', alignItems: "center", border: "2px solid rgb(169,169,169,0.5)" }}>
        <Toolbar>
          <IconButton
           
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link className={classes.link} to='/'>
            <Typography variant="h4" sx={{ mt: "5px" }} noWrap component="div">
              Tabilab
            </Typography>
          </Link>
        </Toolbar>
      
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
          {!user.auth ?
            <Link className={classes.svg} to='/login'>

              <AccountCircle className={classes.icon} fontSize="large" color="white" />
            </Link>
            :
            <Link className={classes.svg} to='/panel'>
              <Avatar >{user.username[0].toUpperCase()}</Avatar>
            </Link>
          }

        </IconButton>
        {user.auth ?
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            onMouseLeave={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {user.user_type === "administrator" ?
              <div>
                <MenuItem>
                  <Link className={classes.link} to='/manageTools'>
                    <ListItemIcon>
                      <ConstructionIcon fontSize="small" />
                    </ListItemIcon>
                    Manage Tools

                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link className={classes.link} to='/manageUsers'>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Manage Users
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className={classes.link} to='/AddTool'>
                    <ListItemIcon>
                      <Build fontSize="small" />
                    </ListItemIcon>
                    Add Tool
                  </Link>
                </MenuItem>
              </div> :
              <div>
                <MenuItem>
                  <Link className={classes.link} to='/AddTool'>
                    <ListItemIcon>
                      <Build fontSize="small" />
                    </ListItemIcon>
                    Add Tool
                  </Link>
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <Build fontSize="small" />
                  </ListItemIcon>
                  My Tools
                  <Link className={classes.link} to='/manageUsers'>
                  </Link>
                </MenuItem>
              </div>

            }
            <MenuItem onClick={() => Log()} >
              <ListItemIcon >
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu> :
          <div></div>}

      </div>
    </AppBar>
  </>
}