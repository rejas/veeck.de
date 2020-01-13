import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';

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
        <Link to="https://github.com/rejas">rejas</Link>{' '}
        {new Date().getFullYear()}
        {'. Built with '}
        <Link to="https://www.gatsbyjs.org">Gatsby</Link>
        {' and '}
        <Link to="https://material-ui.com/">Material UI</Link>
      </Typography>
    </footer>
  );
};

export default Footer;
