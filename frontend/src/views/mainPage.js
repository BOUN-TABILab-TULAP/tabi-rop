import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ToolCard from '../components/ToolCard';
import { useTranslation } from "react-i18next";
export default function MainPage({tools}) {
  const {t,i18n}=useTranslation()
  let lang = i18n.language
  React.useEffect(()=>{
    document.title = t('homepage')
  },[lang])

  return (
   <>
       {tools === undefined | tools.length == 0 ? <>loading</> :
                tools.map((tool, index) => {
                  return (
                   <ToolCard key={index} tool={tool}></ToolCard>
                  );
                })}

    </>
     
    
  );
}