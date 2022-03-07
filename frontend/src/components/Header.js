import  React, {useState,useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';

import Typography from '@mui/material/Typography';

import Login from "./Login.js"
import { Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation.js"
import { getQuery } from "../utils.js"
import MyDrawer from "./Drawer.js"
import AddTool from  "./AddTool.js"

import { Link } from "react-router-dom";
const drawerWidth = 300;



export default function MyHeader(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [tools,setTools]=useState([])
  const [token, setToken] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed"  open={open}>
        <Navigation handleDrawerOpen={handleDrawerOpen} open={open}/>        
      </AppBar>
      <MyDrawer tools={props.tools}/>
      <Main open={open}>
        <DrawerHeader />
        <Container  sx={{display:"flex" }}className="site-layout-background">
        <Box>
           <Routes>
              <Route exact path="/Login" element={<Login token={token} setToken={setToken}/>} />
              <Route exact path="/addTool" element={<AddTool/>} />
              <Route exact path="/panel" element={<Login/>} />
              {tools.map((tool, index) => {
                return (
                  <Route path={"/" + tool.enum}
                    element={<Login/>}
                  />
                );
              })}
              <Route path="*" element={<AddTool/>} />
            </Routes>
        </Box>
        </Container>
        
        <Typography paragraph>
          
        </Typography>
      </Main>
     

      
    </Box>
  );
}
