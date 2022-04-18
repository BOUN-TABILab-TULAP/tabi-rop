
import React, { useState, useEffect } from 'react';

import Drawer from '@mui/material/Drawer';

import { List, Toolbar } from '@mui/material/';
import { createTheme } from "@mui/material/styles";
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    textDecoration: "None",
    color: "black"
  }
});
const drawerWidth = 290;
const theme = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "32px !important",
          minHeight: "32px !important",
          '@media(min-width:600px)': {
            minHeight: "48px "
          }
        }
      }

    }
  }
});
export default function MyDrawer({ tools, mobileOpen, handleDrawerToggle, ...props }) {
  const [selectedIndex, setSelectedIndex] = React.useState();

  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return <>
    <ThemeProvider theme={theme}>


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
        <Toolbar 
        />
        <List>

          {tools.map((tool, index) => (
            <Link key={index} className={classes.link} to={'/' + tool.enum}>
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
            <Link key={index} className={classes.link} to={'/' + tool.enum}>
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
    </ThemeProvider>
  </>
}