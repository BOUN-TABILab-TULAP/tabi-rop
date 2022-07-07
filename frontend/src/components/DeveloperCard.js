import * as React from 'react';

import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography,CardMedia } from '@mui/material/';

import can from '../cancan.png'

const useStyles = makeStyles({
  card: {
    position: "relative",
    width: "12em",
    marginLeft: "0.4em",
    marginBottom: "0.2em",
    padding:"0.2em",
   alignItems:"center",
    display:"flex",
    flexDirection:"column"

  },

  media:{
      width: '10em !important',
      borderRadius: '50%',
  
  }

});

export default function DeveloperCard({developer}) {
  
  const classes = useStyles()
  

  return (
    <>
      <Card variant="outlined" className={classes.card}>
      <CardMedia
      className={classes.media}
        component="img"
        image={can}
      />
      <CardContent className={classes.content}>
        <Typography  variant="h5" align="center" component="div">
          {developer.name}
        </Typography>
        <Typography variant="body2"  align="center" color="text.secondary">
          {developer.status}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          {developer.responsibilities}
        </Typography>
      </CardContent>
     
    </Card>

    </>
  );
}