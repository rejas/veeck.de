import { BottomNavigation, Hidden, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BottomNavigationAction, Link } from 'gatsby-theme-material-ui';
import * as React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';
import BoopedCategoryIcon from '../icons/BoopedCategoryIcon';

const FooterStyled = styled('footer')(({ theme }) => ({
  marginBottom: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(10),
  },
}));

const Body2styled = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  textAlign: 'center',
}));

const BottomNavigationStyled = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
}));

const Footer = () => {
  const { menuLinks } = useSiteMetadata();

  return (
    <React.Fragment>
      <FooterStyled>
        <Body2styled variant="body2" color="textSecondary">
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
        </Body2styled>
      </FooterStyled>
      <Hidden smUp>
        <BottomNavigationStyled showLabels>
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
        </BottomNavigationStyled>
      </Hidden>
    </React.Fragment>
  );
};

export default Footer;
