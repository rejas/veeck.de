import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link href="https://github.com/rejas">rejas</Link>{' '}
        {new Date().getFullYear()}
        {'. Built with '}
        <Link href="https://www.gatsbyjs.org">Gatsby</Link>
        {' and '}
        <Link href="https://material-ui.com/">Material UI</Link>
      </Typography>
    </footer>
  );
};

export default Footer;
