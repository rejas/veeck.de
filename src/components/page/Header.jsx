import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-around',
  },
  toolbarTitle: {
    flex: 1,
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

const Header = ({ menuLinks, siteTitle }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link
          color="inherit"
          noWrap
          key="home"
          href="/"
          className={classes.toolbarLink}
        >
          <Typography
            variant="body1"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {siteTitle}
          </Typography>
        </Link>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {menuLinks.map(link => (
          <Link
            color="inherit"
            noWrap
            key={link.name}
            variant="body2"
            href={link.url}
            className={classes.toolbarLink}
          >
            {link.name}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
