import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
  },
}
  );
const useStyles = makeStyles({
  MainContainer: (theme) => ({
    marginLeft: "310px",
    backgroundColor: "white",
    marginRight: "60px",
    marginTop: "80px",
    padding: "20px",
  }),
  mobileContainer: {
    marginLeft: "0px",
    backgroundColor: "white",
    marginRight: "0px",
    marginTop: "80px",
    padding: "20px"
  },
  floating_button: {
    position: "fixed !important",
    right: "40px",
    bottom: "40px"



  }
})
const drawerWidth = 290;
function App(props) {
  const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const [openFeedback, setOpenFeedback] = React.useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tools, setTools] = useState([])
  const [open, setOpen] = React.useState(true);
  const classes = useStyles(theme);
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
  const handleFeedback = () => {
    console.log("am here")
    setOpenFeedback(true)
    console.log(openFeedback)

  }
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>

          <Box >
            <Navigation sx={{ width: "100%" }} handleDrawerToggle={handleDrawerToggle} />
            <MyDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} drawerWidth={drawerWidth} tools={tools} />
          </Box>
         
          <Box elevation="3"
            className={!fullScreen ? classes.MainContainer : classes.mobileContainer}
          >
            <Routes >

              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/manageUsers" element={<UserManagement />} />
              <Route exact path="/manageTools" element={<ToolManagement />} />
              <Route exact path="/addTool" element={<AddTool />} />
              <Route exact path="/panel" element={<AdminPage />} />
              {tools === undefined | tools.length == 0 ? <Route exact path="/Login" element={<Login />} /> :
                tools.map((tool, index) => {
                  return (
                    <Route key={tool.enum} path={"/" + tool.enum}
                      element={<ToolUse tool={tool} />}
                    />
                  );
                })}
              <Route path="/main" element={<MainPage />} />
              <Route path="/" element={<MainPage />} />
            </Routes>

          </Box>

          <FeedbackButton onClick={handleFeedback} />
          <Feedback open={openFeedback} setOpen={setOpenFeedback} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )

};


export default App;
