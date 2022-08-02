import * as React from 'react';

import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography,CardMedia, CardActions,Button, Link } from '@mui/material/';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles({
  card: {
    width: "22em",
    marginLeft: "0.7em",
    marginBottom: "0.7em",
    padding:"0.2em",
    alignItems:"center",
    justifyContent:"space-between",
    display:"flex",
    flexDirection:"column",
  
  },
  media:{
      width: '150px !important',
      height: '150px !important',
      borderRadius: '50%',
  }
});

const departmentURLS = {
  "Department of Computer Engineering":"https://www.cmpe.boun.edu.tr/",
  "Department of Linguistics":"https://linguistics.boun.edu.tr/"
}

export default function DeveloperCard({developer}) {
  const { t } = useTranslation()
  const classes = useStyles()
  

  return (
    <>
      <Card variant="outlined" className={classes.card}>
      <CardMedia
      className={classes.media}
        component="img"
        image={developer.image}
        sx={{width:"100px",height:"100px"}}
      />
      <CardContent className={classes.content}>
        <Typography  variant="h5" align="center" component="div">
          {`${developer.firstName} ${developer.lastName}`}
        </Typography>
        <Typography variant="body2"  align="center" color="text.secondary">
          {`${developer.affiliation} of `}
          <Link href={departmentURLS[developer.department]} target="_blank" underline="hover" color="inherit">
            {developer.department}
          </Link>
        </Typography>
        {developer.info?.length > 0 && <Typography variant="body2"  align="center" color="text.secondary">
          {developer.info}
        </Typography>}
        
      </CardContent>
      <CardActions>
        <a href={developer.linkedin}>
      <Button sx={{textTransform:'none !important'}} variant="outlined" startIcon={<InfoIcon />}>
    {t('learnmore')}
</Button>
        </a>
      </CardActions>
     
    </Card>

    </>
  );
}