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
    width: "300px",
    height: "300px",
    marginLeft: "15px",
    marginBottom: "15px"
  },
  responsiveCard: {
    width: "500px",
    height: "500px",
    marginLeft: "15px",
    marginBottom: "15px"
  },
  content: {
    height: "160px",
    overflow: "clip",
    marginTop: "10px",
    padding: "5px"
  },
  responsiveContent: {
    height: "300px",
    overflow: "auto",
    marginTop: "10px",
    padding: "5px"
  }


});

export default function ToolCard({ tool }) {
  const theme = createTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
            {(tool.general_info[lang].description).length > 300 ?
              <span>{tool.general_info[lang].description.substr(0, 300)}... {<a href="/" style={{ color: "#1876D1" }}>read more...</a>}</span> :
              <p>{(tool.general_info[lang].description)}</p>}
          </Box>

        </CardContent>
        <Divider />
        <CardActions >
          <Link to={`/${tool.enum}`}>
            <GeneralButton sx={{ marginTop: "5px" }} size={!fullScreen ? "small" : "large"}>{t("trydemo")}</GeneralButton>
          </Link>
          {/* <Link to={`./${tool.enum}`}>
      <GeneralButton size="small">{t("learnmore")}</GeneralButton>
      </Link> */}
        </CardActions>
      </Card>

    </>
  );
}