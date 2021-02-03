import * as React from 'react';
import { Box } from '@material-ui/core';
import { Fab } from 'gatsby-theme-material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import Zoom from '@material-ui/core/Zoom';
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
  const [checked, setChecked] = React.useState(false);

  const handleFabClick = (event) => {
    setChecked(!checked);
  };

  return (
    <Box className={classes.root}>
      <Zoom in={checked}>
        <Fab color="secondary">
          <MenuIcon />
        </Fab>
      </Zoom>

      <Fab onClick={handleFabClick} color="primary" aria-label="add">
        <MenuIcon />
      </Fab>
    </Box>
  );
};

export default MobileMenu;
