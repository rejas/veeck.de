import * as React from 'react';
import { Fab } from 'gatsby-theme-material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
}));

const MobileMenu = () => {
  const classes = useStyles();

  return (
    <Fab color="primary" aria-label="add" className={classes.root}>
      <MenuIcon />
    </Fab>
  );
};

export default MobileMenu;
