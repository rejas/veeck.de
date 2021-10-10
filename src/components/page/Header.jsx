import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Hidden, Toolbar, Typography } from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import ElevateOnScroll from '../utils/ElevateOnScroll';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  appBar: {},
  toolbar: {
    justifyContent: 'flex-end',
  },
  toolbarLogo: {
    flexGrow: 1,
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

const Header = (props) => {
  const classes = useStyles();
  const { title, menuLinks } = useSiteMetadata();

  return (
    <ElevateOnScroll {...props}>
      <AppBar position="sticky" color="transparent" className={classes.appBar}>
        <Hidden xsDown>
          <Toolbar className={classes.toolbar} component="nav" variant="dense">
            <Typography variant="h4" className={classes.toolbarLogo}>
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
            {menuLinks.map((link, index) => (
              <MenuItem link={link} key={index} />
            ))}
          </Toolbar>
        </Hidden>
      </AppBar>
    </ElevateOnScroll>
  );
};

export default Header;
