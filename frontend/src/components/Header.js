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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    [theme.breakpoints.down('md')]: {
      marginLeft: `-${drawerWidth}px` ,
    }
    
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

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
      <MyDrawer handleDrawerClose={handleDrawerClose} open={open} drawerWidth={drawerWidth} tools={props.tools}/>
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
