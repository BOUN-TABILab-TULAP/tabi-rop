import * as React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Card,CardContent,Typography,CardActions,Button, CardActionArea,Divider,Box } from '@mui/material/';
import { useTranslation } from "react-i18next";
import GeneralButton from "./GeneralButton"
const useStyles = makeStyles({
  card:{
    width:"300px",
    height:"300px",
    marginLeft:"15px",
    marginBottom:"15px"
  }
  
});

export default function ToolCard({tool}) {
 const classes=useStyles()
 const {t, i18n}=useTranslation()
 let lang=i18n.language
  return (
   <>
       <Card className={classes.card}> 
       
       <CardContent >
      <Typography sx={{marginBottom:"5px"}} variant="h5" >
        {tool.general_info[lang].name}
      </Typography>
      <Divider/>
     
      <Box sx={{height:"160px",overflow:"scroll", marginTop:"10px",padding:"5px"}} >
        {tool.general_info[lang].description}
      </Box>
      
    </CardContent>
    <Divider/>
    <CardActions >
    <Link to={`/${tool.enum}`}>
      <GeneralButton size="small">{t("trydemo")}</GeneralButton>
      </Link>
      {/* <Link to={`./${tool.enum}`}>
      <GeneralButton size="small">{t("learnmore")}</GeneralButton>
      </Link> */}
    </CardActions>
       </Card>

    </>   
  );
}