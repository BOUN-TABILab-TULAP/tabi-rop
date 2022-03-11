import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Login from "./views/Login.js"
import ToolUse from "./views/ToolUse.js"
import { Menu, Container, Avatar, Tooltip, MenuItem,Paper,Toolbar,IconButton,Drawer } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.js"
import MyDrawer from "./components/Drawer.js"
import AddTool from "./views/addTool.js"
import MainPage from "./views/mainPage.js"
import toolsApi from './services/toolsApi.js';
import { makeStyles } from '@mui/styles';
import ToolManagement from './views/ToolManagement.js';
import UserManagement from "./views/UserManagement.js"
import AdminPage from './views/AdminPage.js';
import AppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  MainContainer: {
    marginLeft:"310px",
    backgroundColor:"white",
    marginRight:"60px",
    marginTop:"20px",
    padding:"20px"
  },
  mobileContainer: {
    marginLeft:"0px",
    backgroundColor:"white",
    marginRight:"0px",
    marginTop:"80px",
    padding:"20px"
  },
})
const drawerWidth = 290;
function App(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tools, setTools] = useState([])
  const [open, setOpen] = React.useState(true);
  const classes = useStyles(open);
  const handleDrawerToggle = () => {
   
    setMobileOpen(!mobileOpen);
  };
  const getTools = async () => {
    let tool = await toolsApi.getTools()
    console.log(tool)
    setTools(tool)
  };
  useEffect(() => {
    getTools()
  }, []);
  return (
    tools === undefined | tools.length == 0 ? <div>wait</div> :
      <> <Box >
        <Navigation   sx={{  zIndex:100,width:"100%"  }} handleDrawerToggle={handleDrawerToggle} />
        <MyDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} drawerWidth={drawerWidth} tools={tools} />
        
        <Box elevation="3"  
        className={!fullScreen?classes.MainContainer:classes.mobileContainer} 
        >
          <Routes>
            <Route exact path="/Login" element={<Login/>} />
            <Route exact path="/manageUsers" element={<UserManagement />} />
            <Route exact path="/manageTools" element={<ToolManagement />} />
            <Route exact path="/addTool" element={<AddTool />} />
            <Route exact path="/panel" element={<AdminPage />} />
            {tools.map((tool, index) => {
              return (
                <Route key={index}  path={"/" + tool.enum}
                  element={<ToolUse tool={tool} />}
                />
              );
            })}
            <Route path="/main" element={<MainPage/>} />
            <Route path="/" element={<MainPage/>} />
          </Routes>

        </Box>

       


      </Box>
      </>
  )

};


export default App;
