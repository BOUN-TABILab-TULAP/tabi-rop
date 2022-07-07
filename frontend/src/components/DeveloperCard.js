import * as React from 'react';

import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography,CardMedia, CardActions,Button } from '@mui/material/';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const useStyles = makeStyles({
  card: {
   position:"relative",
    width: "200px",
    marginLeft: "0.4em",
    marginBottom: "0.2em",
    padding:"0.2em",
   alignItems:"center",
    display:"flex",
    flexDirection:"column",
    height:"19em",
    minWidth:"200px",
    justifyContent:"space-between"
  

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
        image={developer.image}
      />
      <CardContent className={classes.content}>
        <Typography  variant="h5" align="center" component="div">
          {developer.name}
        </Typography>
        <Typography variant="body2"  align="center" color="text.secondary">
          {developer.status}
        </Typography>
        
      </CardContent>
      <CardActions>
        <a href="developer.linkedin">
      <Button variant="outlined" startIcon={<LinkedInIcon />}>
    LinkedIn
</Button>
        </a>
      </CardActions>
     
    </Card>

    </>
  );
}