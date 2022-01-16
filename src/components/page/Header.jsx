import { Hidden } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import BackgroundImage from 'gatsby-background-image';
import { getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-theme-material-ui';
import { convertToBgImage } from 'gbimage-bridge';
import PropTypes from 'prop-types';
import * as React from 'react';

import CategoryIcon from '../icons/CategoryIcon';
import ToggleIcon from '../icons/ToggleIcon';
import MenuDesktop from '../navigation/MenuDesktop';
import { darkModeContext } from '../ui/ThemeHandler';

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

const IconBarStyled = styled('div')(css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`);

const IconStyled = styled('div')(css`
  align-self: center;
  width: 150px;
  margin: 0;
`);

const HeadlineIconStyled = styled('h1')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    alignSelf: 'center',
  },
}));

const HeadlineStyled = styled('h1')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'right',

  [theme.breakpoints.down('md')]: {
    alignSelf: 'center',
  },
}));

const BackgroundImageStyled = styled(BackgroundImage)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  height: '100%',
  backgroundSize: 'cover',
  padding: '2rem 2rem 1rem',

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
  height: '100%',
  alignItems: 'flex-start',
  padding: '2rem 2rem 1rem',

  [theme.breakpoints.up('md')]: {
    padding: '2rem',
  },
}));

const HomeLinkStyled = styled(Link)(({ theme }) => ({
  border: '1px solid ' + theme.palette.primary.main,
  borderRadius: '4px',
  width: '36px',
  height: '36px',
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',

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
  const { image, icon } = props;

  let bgImage;
  if (image) {
    bgImage = convertToBgImage(getImage(image));
  }

  const DarkModeContext = React.useContext(darkModeContext);
  const { darkMode, setDarkMode } = DarkModeContext;
  const handleThemeChange = () => {
    if (darkMode) {
      localStorage.setItem('preferred-theme', 'light');
      setDarkMode(false);
    } else {
      localStorage.setItem('preferred-theme', 'dark');
      setDarkMode(true);
    }
  };

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
        <IconBarStyled>
          <HomeLinkStyled key="home" to="/">
            <CategoryIcon category="home" color="primary" />
          </HomeLinkStyled>
          <ToggleIcon mode={darkMode} onClick={handleThemeChange} />
        </IconBarStyled>
        {icon && (
          <HeadlineIconStyled>
            <IconStyled>{icon}</IconStyled>
            {props.title}
          </HeadlineIconStyled>
        )}
        {!icon && <HeadlineStyled>{props.title}</HeadlineStyled>}
        <Hidden smDown>
          <MenuDesktop />
        </Hidden>
      </ConditionalWrapper>
    </HeaderStyled>
  );
};

Header.propTypes = {
  icon: PropTypes.object,
  image: PropTypes.object,
};

export default Header;
