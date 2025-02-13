import { styled } from '@mui/material/styles';
import * as React from 'react';

import ThemeToggleButton from '../ui/ThemeToggleButton';

const OptionsStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  [theme.breakpoints.down('md')]: {
    position: 'absolute',
    right: '2rem',
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const Options = () => {
  return (
    <OptionsStyled>
      <ThemeToggleButton />
    </OptionsStyled>
  );
};

export default Options;
