
import  React, {useState,useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const useStyles = makeStyles({
  link:{
    textDecoration:"None",
    color:"black"
  }


});



export default function MyDrawer({drawerWidth,open,handleDrawerClose,tools}){
  const theme = useTheme();
  const classes = useStyles();
  return<>
<Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
       
        <List>
          {tools.map((tool, index) => (
             <Link className={classes.link}  to={'/'+tool.enum}>
            <ListItem button key={tool.enum}>
                   
              <ListItemText primary={tool.name} />
            </ListItem>
                </Link>
          ))}
        </List>

      </Drawer>
      </>
}