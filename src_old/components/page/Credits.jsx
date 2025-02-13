import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'gatsby-theme-material-ui';
import * as React from 'react';

const CreditsStyled = styled('div')(({ theme }) => ({
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

const Credits = () => {
  return (
    <CreditsStyled>
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
    </CreditsStyled>
  );
};

export default Credits;
