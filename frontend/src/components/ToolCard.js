import * as React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, CardActions, Button, CardActionArea, Divider, Box } from '@mui/material/';
import { useTranslation } from "react-i18next";
import GeneralButton from "./GeneralButton"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles({
  card: {
    position:"relative",
    width: "300px",
    height: "300px",
    marginLeft: "15px",
    marginBottom: "15px"
  },
  responsiveCard: {
    position:"relative",
    width:" 90vw",
    height:" 90vw",
    // marginLeft: "15px",
    marginBottom: "15px"
  },
  content: {
   
    overflow: "clip",
    marginTop: "10px",
    padding: "5px"
  },
  responsiveContent: {

    overflow: "auto",
    marginTop: "10px",
    padding: "5px"
  },
  action:{
    position:"absolute",
    bottom:"5px",
    width:"100%"
  }


});

export default function ToolCard({ tool }) {
  const theme = createTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  var width=300
  width=fullScreen?450:250
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  let lang = i18n.language
  return (
    <>
      <Card className={!fullScreen ? classes.card : classes.responsiveCard}>

        <CardContent >
          <Typography sx={{ marginBottom: "5px" }} variant="h5" >
            {tool.general_info[lang].name}
          </Typography>
          <Divider />

          <Box className={!fullScreen ? classes.content : classes.responsiveContent}  >
        
              {((tool.general_info[lang].description).length > width) ?
              <span>{tool.general_info[lang].description.substr(0, width)}... {<a href={`/demo/${tool.enum}`} style={{ color: "#1876D1" }}>read more...</a>}</span> :
              <p>{(tool.general_info[lang].description)}</p>} 
          </Box>

        </CardContent>
        <div className={ classes.action} >

        <Divider  />
        <CardActions >
          <Link to={`/${tool.enum}`}>
            <GeneralButton sx={{  marginTop: "5px" }} size={!fullScreen ? "small" : "large"}>{t("trydemo")}</GeneralButton>
          </Link>
          {/* <Link to={`./${tool.enum}`}>
      <GeneralButton size="small">{t("learnmore")}</GeneralButton>
    </Link> */}
        </CardActions>
    </div>
      </Card>

    </>
  );
}