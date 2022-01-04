import HomeIcon from '@mui/icons-material/Cottage';
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Headline4Styled = styled(Typography)(({ theme }) => ({}));

const BackgroundImageStyled = styled(BackgroundImage)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: '1rem',
  backgroundSize: 'cover',

  '&::before, &::after': {
    filter: 'opacity(0.35)',
  },
}));

const BackgroundStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: '1rem',
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  padding: theme.spacing(1),
  flexShrink: 0,

  '&:hover': {
    textDecoration: 'none',
  },
}));

const ConditionalWrapper = ({
  condition,
  wrapperTrue,
  wrapperFalse,
  children,
}) => (condition ? wrapperTrue(children) : wrapperFalse(children));

const HeaderNew = (props) => {
  const { lead, bgImage } = props;
  const { menuLinks } = useSiteMetadata();

  return (
    <ToolbarStyled component="nav" variant="dense">
      <ConditionalWrapper
        condition={bgImage}
        wrapperTrue={(children) => (
          <BackgroundImageStyled {...bgImage} preserveStackingContext>
            {children}
          </BackgroundImageStyled>
        )}
        wrapperFalse={(children) => (
          <BackgroundStyled>{children}</BackgroundStyled>
        )}
      >
        <LinkStyled noWrap key="home" to="/" color="inherit">
          <HomeIcon />
        </LinkStyled>
        <Headline4Styled variant="h2">{props.title}</Headline4Styled>
        <Headline4Styled>{lead}</Headline4Styled>
        <div>
          {menuLinks.map((link, index) => (
            <MenuItem link={link} key={index} />
          ))}
        </div>
        <Footer />
      </ConditionalWrapper>
    </ToolbarStyled>
  );
};

export default HeaderNew;
