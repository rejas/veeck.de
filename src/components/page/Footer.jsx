import React from 'react';
import { BottomNavigation, Hidden, Typography } from '@material-ui/core';
import { BottomNavigationAction } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import CategoryIcon from '../CategoryIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  nav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { menuLinks } = useSiteMetadata();

  return (
    <React.Fragment>
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
      <Hidden smUp>
        <BottomNavigation showLabels className={classes.nav}>
          <BottomNavigationAction
            key="home"
            to="/"
            label="veeck"
            icon={<CategoryIcon color="primary" />}
          />
          {menuLinks.map((link) => (
            <BottomNavigationAction
              key={link.name}
              to={link.url}
              label={link.name}
              icon={<CategoryIcon category={link.icon} color="primary" />}
            />
          ))}
        </BottomNavigation>
      </Hidden>
    </React.Fragment>
  );
};

export default Footer;
