import { Hidden } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import BackgroundImage from 'gatsby-background-image';
import { Link } from 'gatsby-theme-material-ui';
import * as React from 'react';

import CategoryIcon from '../icons/CategoryIcon';
import MenuDesktop from '../navigation/MenuDesktop';

const HeaderStyled = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    height: 'auto',
    maxHeight: '50vh',
  },
}));

const IconStyled = styled('div')(css`
  align-self: center;
  width: 150px;
  margin: 0;
`);

const HeadlineIconStyled = styled('h1')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
  },
}));

const HeadlineStyled = styled('h1')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'right',

  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
  },
}));

const LeadinStyled = styled('h2')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'right',

  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
  },
}));

const BackgroundImageStyled = styled(BackgroundImage)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  height: '100%',
  padding: '3rem',
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
  padding: '3rem',
  alignItems: 'flex-start',
}));

const HomeLinkStyled = styled(Link)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary,
  },

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ConditionalWrapper = ({
  condition,
  wrapperTrue,
  wrapperFalse,
  children,
}) => (condition ? wrapperTrue(children) : wrapperFalse(children));

const Header = (props) => {
  const { lead, bgImage, icon } = props;

  return (
    <HeaderStyled>
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
        <HomeLinkStyled noWrap key="home" to="/">
          <CategoryIcon category="home" color="primary" />
        </HomeLinkStyled>
        {icon && (
          <HeadlineIconStyled>
            <IconStyled>{icon}</IconStyled>
            {props.title}
          </HeadlineIconStyled>
        )}
        {!icon && <HeadlineStyled>{props.title}</HeadlineStyled>}
        <LeadinStyled>{lead}</LeadinStyled>
        <Hidden mdDown>
          <MenuDesktop />
        </Hidden>
      </ConditionalWrapper>
    </HeaderStyled>
  );
};

export default Header;
