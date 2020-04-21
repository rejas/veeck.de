import * as React from 'react';
import { BottomNavigation, Hidden, Typography } from '@material-ui/core';
import { BottomNavigationAction } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import BoopedCategoryIcon from '../BoopedCategoryIcon';
import MobileMenu from './MobileMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
  info: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: 'center',
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
        <Typography
          className={classes.info}
          variant="body2"
          color="textSecondary"
        >
          {'Copyright © '}
          <Link to="https://github.com/rejas">rejas</Link>
          {' ' + new Date().getFullYear()}
          {'. Built with '}
          <Link to="https://gatsbyjs.org">Gatsby</Link>
          {', '}
          <Link to="https://reactjs.org">React</Link>
          {' and '}
          <Link to="https://material-ui.com">Material UI</Link>
          {'.'}
        </Typography>
      </footer>
      <Hidden smUp>
        <MobileMenu className={classes.nav}>
          <BottomNavigationAction
            key="home"
            to="/"
            label="veeck"
            icon={<BoopedCategoryIcon color="primary" />}
          />
          {menuLinks.map((link) => (
            <BottomNavigationAction
              key={link.name}
              to={link.url}
              label={link.name}
              icon={<BoopedCategoryIcon category={link.icon} color="primary" />}
            />
          ))}
        </MobileMenu>
      </Hidden>
    </React.Fragment>
  );
};

export default Footer;
