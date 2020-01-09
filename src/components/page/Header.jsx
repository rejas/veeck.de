import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import HideOnScroll from '../utils/HideOnScroll';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-around',
  },
  toolbarTitle: {
    textTransform: 'uppercase',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Header = props => {
  const { menuLinks, siteTitle } = props;
  const classes = useStyles();

  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar} variant={'dense'}>
          <Link color="inherit" noWrap key="home" href="/">
            <Typography
              variant="h3"
              color="inherit"
              className={classes.toolbarTitle}
            >
              {siteTitle}
            </Typography>
          </Link>
        </Toolbar>
        <Toolbar
          className={classes.toolbarSecondary}
          component="nav"
          variant="dense"
        >
          {menuLinks.map(link => (
            <Link
              color="inherit"
              noWrap
              key={link.name}
              variant="button"
              href={link.url}
              className={classes.toolbarLink}
            >
              {link.name}
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
