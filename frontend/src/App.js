import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Login from "./views/Login.js"
import ToolUse from "./views/ToolUse.js"
import { Menu, Container, Avatar, Tooltip, MenuItem,Paper } from '@mui/material';
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
import {UserContext} from './userContext.js';

const useStyles = makeStyles({
  MainContainer: {
    backgroundColor:"white",
    marginTop: "100px !important",
    marginRight:"50px",
    marginLeft:"50px",
    padding:"10px",
    minWidth:"600px",
    padding:"20px"
   
    // marginLeft:"300px"
    
  },
  
})
const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`, 
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  const [tools, setTools] = useState([])
  const [token, setToken] = useState("");
  const [open, setOpen] = React.useState(true);
  const classes = useStyles(open);
  const { user } = useContext(UserContext);
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
        <AppBar position="fixed" open={open}>
          <Navigation handleDrawerOpen={() => { setOpen(true) }} open={open} />
        </AppBar>
        <MyDrawer handleDrawerClose={() => setOpen(false) } open={open} drawerWidth={drawerWidth} tools={tools} />
        <Paper elevation="3"  className={classes.MainContainer} >
          <Routes>
            <Route exact path="/Login" element={<Login/>} />
            <Route exact path="/manageUsers" element={<UserManagement />} />
            <Route exact path="/manageTools" element={<ToolManagement />} />
            <Route exact path="/addTool" element={<AddTool />} />
            <Route exact path="/panel" element={<AdminPage />} />
            {tools.map((tool, index) => {
              {console.log(tool.enum)}
              return (
                <Route   path={"/" + tool.enum}
                  element={<ToolUse tool={tool} />}
                />
              );
            })}
            <Route path="/main" element={<MainPage/>} />
            <Route path="/" element={<MainPage/>} />
          </Routes>

        </Paper>

       


      </Box>
      </>
  )

};


export default App;
