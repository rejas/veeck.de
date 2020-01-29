import React from 'react';
import { BottomNavigation, Hidden, Typography } from '@material-ui/core';
import { BottomNavigationAction } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import CategoryIcon from '../icons/CategoryIcon';

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
              key={link.name}
              to={link.url}
              label={link.name}
              icon={<CategoryIcon category={link.icon} />}
            />
          ))}
        </BottomNavigation>
      </Hidden>
    </React.Fragment>
  );
};

export default Footer;
