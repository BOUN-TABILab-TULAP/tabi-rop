import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Login from "./views/Login.js"
import ToolUse from "./views/ToolUse.js"
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.js"
import MyDrawer from "./components/Drawer.js"
import AddTool from "./views/addTool.js"
import MainPage from "./views/mainPage.js"
import toolsApi from './services/toolsApi.js';
import { makeStyles } from '@mui/styles';
import ToolManagement from './views/ToolManagement.js';
import UserManagement from "./views/UserManagement.js"
import AdminPage from './views/AdminPage.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import FeedbackButton from './components/FeedbackButton.js';
import Feedback from './components/Feedback.js';
import About from './views/About.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import NotFound from "./components/NotFound"
import { UserContext } from './userContext';

// Analytics
import ReactGA from "react-ga4";
ReactGA.initialize("G-3RZMD179KE");



const useStyles = makeStyles({
  mainContainer: {
    marginLeft: "300px",
    marginRight: "40px",
    marginTop: "70px",
    padding: "20px",
    backgroundColor: "white",
  },
  mobileContainer: {
    marginLeft: "0px",
    backgroundColor: "white",
    marginRight: "0px",
    marginTop: "70px",
    padding: "20px"
  },
  plainPage: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e9eb"
  },
  floating_button: {
    position: "fixed !important",
    right: "40px",
    bottom: "40px"
  },
  layout: {
    display: "flex",
    flexDirection: "column",

  }
})
const drawerWidth = 290;
function App(props) {
  const location = useLocation();
  const isMainPage = location.pathname === "/"


  const theme = createTheme();

  const [openFeedback, setOpenFeedback] = React.useState(false);
  const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tools, setTools] = useState([])
  const classes = useStyles(isMainPage);
  const handleDrawerToggle = () => {

    setMobileOpen(!mobileOpen);
  };
  const getTools = async () => {
    let tool = await toolsApi.getTools()
    setTools(tool)
  };
  useEffect(() => {
    getTools()
  }, []);
  const handleFeedback = () => {
    setOpenFeedback(true)
  }
  const { user, logout } = useContext(UserContext);
  return (
    <>

      <ThemeProvider theme={theme} >
        <Box className={classes.layout}>

          <Box >
            <Navigation handleDrawerToggle={handleDrawerToggle} />
            {!(isMainPage && !mobileScreen) && <MyDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} drawerWidth={drawerWidth} tools={tools} />}
          </Box>

          <Box elevation="3"
            className={[!mobileScreen ? classes.mainContainer : classes.mobileContainer, isMainPage && classes.plainPage]}

          >
            <Routes >

              <Route exact path="/login" element={<Login />} />

              {user && <Route exact path="/manageUsers" element={<UserManagement />} />}
              {user && <Route exact path="/manageTools" element={<ToolManagement />} />}
              {user && <Route exact path="/addTool" element={<AddTool />} />}
              {user&& <Route exact path="/panel" element={<AdminPage />} />}
              <Route exact path="/about" element={<About />} />
              {tools === undefined | tools.length === 0 ? <Route exact path="/Login" element={<Login />} /> :
                tools.map((tool, index) => {
                  return (
                    <Route key={tool.enum} path={"/" + tool.enum}
                      element={<ToolUse tools={tools} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} drawerWidth={drawerWidth} tool={tool} />}
                    />
                  );
                })}
              <Route path="/" exact element={<MainPage tools={tools} />} />
              <Route path="*" element={<NotFound></NotFound>} />
            </Routes>

          </Box>

          <Feedback open={openFeedback} setOpen={setOpenFeedback} />
        </Box>
      </ThemeProvider>
      <FeedbackButton onClick={handleFeedback} />
    </>
  )

};


export default App;
