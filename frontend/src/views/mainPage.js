import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img from "../nlp.jpeg"
import ToolCard from '../components/ToolCard';
import { useTranslation } from "react-i18next";
const url = process.env.REACT_APP_BACKEND+"/api/user/login";
const theme = createTheme();
export default function MainPage({tools}) {
  const {t,i18n}=useTranslation()

  return (
   <>
       {tools === undefined | tools.length == 0 ? <>dur buradayim</> :
                tools.map((tool, index) => {
                  return (
                   <ToolCard tool={tool}></ToolCard>
                  );
                })}

    </>
     
    
  );
}