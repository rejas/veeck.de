import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';
import HideOnScroll from '../utils/HideOnScroll';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

const useStyles = makeStyles(theme => ({
  toolbarPrimary: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-around',
  },
  toolbarSecondary: {
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
        <Toolbar
          className={classes.toolbarPrimary}
          component="div"
          variant={'dense'}
        >
          <Link className={classes.toolbarLink} noWrap key="home" to="/">
            <Typography variant="h4">{title}</Typography>
          </Link>
        </Toolbar>
        <Toolbar
          className={classes.toolbarSecondary}
          component="nav"
          variant="dense"
        >
          {menuLinks.map(link => (
            <Link
              className={classes.toolbarLink}
              noWrap
              key={link.name}
              to={link.url}
            >
              <Typography variant="h5">{link.name}</Typography>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
