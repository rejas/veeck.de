import { BottomNavigation } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BottomNavigationAction } from 'gatsby-theme-material-ui';
import * as React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';
import BoopedCategoryIcon from '../icons/BoopedCategoryIcon';

const BottomNavigationStyled = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
}));

const MenuMobile = () => {
  const { menuLinks } = useSiteMetadata();

  return (
    <BottomNavigationStyled showLabels>
      <BottomNavigationAction
        key="home"
        to="/"
        label="veeck"
        icon={<BoopedCategoryIcon color="primary" category="home" />}
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
  );
};

export default MenuMobile;
