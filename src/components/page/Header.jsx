import { BigHead } from '@bigheads/core';
import { Hidden, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import BackgroundImage from 'gatsby-background-image';
import { getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-theme-material-ui';
import { convertToBgImage } from 'gbimage-bridge';
import PropTypes from 'prop-types';
import * as React from 'react';

import MenuDesktop from '../navigation/MenuDesktop';
import ThemeToggleButton from '../ui/ThemeToggleButton';

const HeaderStyled = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    position: 'relative',
    height: 'auto',
    maxHeight: '50vh',
  },
}));

const BackgroundImageStyled = styled(BackgroundImage)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  backgroundSize: 'cover',
  padding: '2rem 2rem 2rem',
  gap: '1rem',

  '&::before, &::after': {
    filter: 'opacity(0.35)',
  },

  [theme.breakpoints.up('md')]: {
    padding: '2rem',
  },
}));

const BackgroundStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  padding: '2rem 2rem 1rem',
  gap: '1rem',

  [theme.breakpoints.up('md')]: {
    padding: '2rem',
  },
}));

const HomeLinkStyled = styled(Link)(({ theme }) => ({
  margin: '0 auto',
  display: 'flex',
  maxWidth: '150px',

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const HeadlineIconStyled = styled(Typography)(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    alignSelf: 'center',
  },
}));

const ConditionalWrapper = ({
  condition,
  wrapperTrue,
  wrapperFalse,
  children,
}) => (condition ? wrapperTrue(children) : wrapperFalse(children));

const Header = (props) => {
  const { image } = props;

  let bgImage;
  if (image) {
    bgImage = convertToBgImage(getImage(image));
  }

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
        <HeadlineIconStyled variant="h1">
          <HomeLinkStyled key="home" to="/">
            <BigHead
              accessory="shades"
              body="chest"
              circleColor="blue"
              clothing="shirt"
              clothingColor="black"
              eyebrows="raised"
              eyes="simple"
              faceMask={false}
              faceMaskColor="white"
              facialHair="mediumBeard"
              graphic="react"
              hair="none"
              hairColor="white"
              hat="none"
              hatColor="blue"
              lashes
              lipColor="red"
              mask
              mouth="openSmile"
              skinTone="light"
            />
          </HomeLinkStyled>
          {props.title}
        </HeadlineIconStyled>
        <Hidden smDown>
          <MenuDesktop />
          <ThemeToggleButton />
        </Hidden>
      </ConditionalWrapper>
    </HeaderStyled>
  );
};

Header.propTypes = {
  image: PropTypes.object,
};

export default Header;
