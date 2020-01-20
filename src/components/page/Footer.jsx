import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import BlogIcon from '../BlogIcon';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  nav: {
    width: '100%',
    position: 'sticky',
    bottom: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { menuLinks } = useSiteMetadata();

  const [value, setValue] = React.useState(0);

  return (
    <React.Fragment>
      <Hidden smUp>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.nav}
        >
          {menuLinks.map(link => (
            <BottomNavigationAction
              label={link.name}
              icon={<BlogIcon category={link.icon} />}
            />
          ))}
        </BottomNavigation>
      </Hidden>
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
    </React.Fragment>
  );
};

export default Footer;
