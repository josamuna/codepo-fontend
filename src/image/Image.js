import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import img from './loginImg.png';

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: '850px',
    maxHeight: '750px',
  }
}));

const Logo = () => {
  const classes = useStyles();
  return (
    <Box>
      <img
        src={img}
        alt="Maps"
        className={classes.image}
        width="920px"
        height="635px"
      />
    </Box>
  );
};

export default Logo;
