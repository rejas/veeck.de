import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';
import Hidden from '@material-ui/core/Hidden';
import HideOnScroll from '../utils/HideOnScroll';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    textTransform: 'uppercase',
    padding: theme.spacing(1),
    flexShrink: 0,

    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Header = props => {
  const classes = useStyles();
  const { title, menuLinks } = useSiteMetadata();

  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky">
        <Hidden xsDown>
          <Toolbar className={classes.toolbar} component="nav" variant="dense">
            <Typography variant="h4">
              <Link
                className={classes.toolbarLink}
                noWrap
                key="home"
                to="/"
                color="inherit"
              >
                {title}
              </Link>
            </Typography>
            {menuLinks.map(link => (
              <Typography variant="h5">
                <Link
                  className={classes.toolbarLink}
                  noWrap
                  color="inherit"
                  key={link.name}
                  to={link.url}
                >
                  {link.name}
                </Link>
              </Typography>
            ))}
          </Toolbar>
        </Hidden>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
