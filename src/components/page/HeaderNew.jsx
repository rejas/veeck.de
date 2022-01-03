import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import BackgroundImage from 'gatsby-background-image';
import { Link } from 'gatsby-theme-material-ui';
import * as React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';
import Footer from './Footer';
import MenuItem from './MenuItem';

const ToolbarStyled = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  height: '100vh',
  padding: 0,
}));

const Headline4Styled = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const BackgroundImageStyled = styled(BackgroundImage)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: '100%',
  backgroundSize: 'cover',

  '&::before, &::after': {
    filter: 'opacity(0.35)',
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  padding: theme.spacing(1),
  flexShrink: 0,

  '&:hover': {
    textDecoration: 'none',
  },
}));

const HeaderNew = (props) => {
  const { bgImage } = props;
  const { title, menuLinks } = useSiteMetadata();

  return (
    <ToolbarStyled component="nav" variant="dense">
      {bgImage && (
        <BackgroundImageStyled {...bgImage} preserveStackingContext>
          <Headline4Styled variant="h4">
            <LinkStyled noWrap key="home" to="/" color="inherit">
              {title}
            </LinkStyled>
          </Headline4Styled>
          {menuLinks.map((link, index) => (
            <MenuItem link={link} key={index} />
          ))}
          <Footer />
        </BackgroundImageStyled>
      )}
      {!bgImage && (
        <React.Fragment>
          <Headline4Styled variant="h4">
            <LinkStyled noWrap key="home" to="/" color="inherit">
              {title}
            </LinkStyled>
          </Headline4Styled>
          {menuLinks.map((link, index) => (
            <MenuItem link={link} key={index} />
          ))}
          <Footer />
        </React.Fragment>
      )}
    </ToolbarStyled>
  );
};

export default HeaderNew;
