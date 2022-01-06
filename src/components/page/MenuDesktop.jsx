import { css, styled } from '@mui/material/styles';
import * as React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';
import MenuItem from './MenuItem';

const MenuStyled = styled('div')(css`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-self: flex-end;
`);

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
