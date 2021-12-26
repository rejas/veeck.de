import * as React from 'react';
import { Link } from 'gatsby-theme-material-ui';
import { AppBar, Hidden, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ElevateOnScroll from '../utils/ElevateOnScroll';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import MenuItem from './MenuItem';

const AppBarStyled = styled(AppBar)(({ theme }) => ({}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'flex-end',
}));

const Headline4Styled = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  padding: theme.spacing(1),
  flexShrink: 0,

  '&:hover': {
    textDecoration: 'none',
  },
}));

const Header = (props) => {
  const { title, menuLinks } = useSiteMetadata();

  return (
    <ElevateOnScroll {...props}>
      <AppBarStyled position="sticky" color="inherit">
        <Hidden smDown>
          <ToolbarStyled component="nav" variant="dense">
            <Headline4Styled variant="h4">
              <LinkStyled noWrap key="home" to="/" color="inherit">
                {title}
              </LinkStyled>
            </Headline4Styled>
            {menuLinks.map((link, index) => (
              <MenuItem link={link} key={index} />
            ))}
          </ToolbarStyled>
        </Hidden>
      </AppBarStyled>
    </ElevateOnScroll>
  );
};

export default Header;
