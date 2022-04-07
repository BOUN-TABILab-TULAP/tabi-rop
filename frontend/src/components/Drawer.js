
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import { List, Box,Toolbar } from '@mui/material/';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    textDecoration: "None",
    color: "black"
  }
});
const drawerWidth = 290;


export default function MyDrawer({ tools, mobileOpen, handleDrawerToggle, ...props }) {
  const [selectedIndex, setSelectedIndex] = React.useState();
  const theme = useTheme();
  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  return <>
    
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        <List>

          {tools.map((tool, index) => (
            <Link  key={index} className={classes.link} to={'/' + tool.enum}>
              <ListItem button key={tool.enum}>

                <ListItemText primary={tool.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
         <Toolbar />
        <Divider />
        <List 
        
        >

          {tools.map((tool, index) => (
            <Link  key={index}className={classes.link} to={'/' + tool.enum}>
              <ListItem button key={tool.enum}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              >

                <ListItemText primary={tool.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        
        </Drawer>

  </>
}