import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(to bottom, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    backgroundPosition: '0 100%',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '1px 2px',
    textDecoration: 'none',
    transition: 'background-size .2s',

    '&:hover': {
      backgroundSize: '1px 100%',
      textDecoration: 'none',
    },
  },
}));

const LinkElement = props => {
  const classes = useStyles();

  return (
    <Link className={classes.root} href={props.href}>
      {props.children}
    </Link>
  );
};

export default LinkElement;
