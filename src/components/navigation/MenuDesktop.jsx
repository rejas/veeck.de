import { styled } from '@mui/material/styles';
import * as React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';
import MenuItem from './MenuItem';

const MenuStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flexWrap: 'nowrap',
  alignSelf: 'center',
  flexDirection: 'row',
  gap: '1rem',
  marginTop: '2rem',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
}));

const MenuDesktop = () => {
  const { menuLinks } = useSiteMetadata();

  return (
    <MenuStyled>
      {menuLinks.map((link, index) => (
        <MenuItem link={link} key={index} />
      ))}
    </MenuStyled>
  );
};

export default MenuDesktop;
