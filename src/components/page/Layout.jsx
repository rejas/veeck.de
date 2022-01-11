import { Box, CssBaseline, Hidden } from '@mui/material';
import { ThemeProvider, css, styled } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { isIE } from 'react-device-detect';

import { darkTheme, lightTheme } from '../../newtheme';
import ErrorCard from '../ErrorCard';
import MenuMobile from '../navigation/MenuMobile';
import { darkModeContext } from '../ui/ThemeHandler';
import Credits from './Credits';
import Header from './Header';

const PageStyled = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '3fr 7fr',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const MainStyled = styled('div')(css`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`);

const ContentStyled = styled('main')(css`
  flex-basis: 100%;
  padding-bottom: 2rem;
`);

const LeadinStyled = styled('h2')(({ theme }) => ({
  alignSelf: 'center',
  textAlign: 'center',
  marginBottom: '2rem',
}));

const Layout = (props) => {
  let { children, icon, image, lead, title } = props;

  const DarkModeContext = React.useContext(darkModeContext);
  const { darkMode, setDarkMode } = DarkModeContext;

  React.useEffect(() => {
    const theme = localStorage.getItem('preferred-theme');
    if (theme) {
      const themePreference = localStorage.getItem('preferred-theme');
      if (themePreference === 'dark') {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    } else {
      localStorage.setItem('preferred-theme', 'light');
      setDarkMode(true);
    }
    //eslint-disable-next-line
  }, []);

  if (isIE) {
    children = (
      <ErrorCard message="The Internet Explorer is not supported. Please download Firefox." />
    );
  }

  return (
    <StylesProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <PageStyled>
          <Header image={image} icon={icon} lead={lead} title={title} />
          <MainStyled>
            <LeadinStyled>{lead}</LeadinStyled>
            <ContentStyled>{children}</ContentStyled>
            <Credits />
          </MainStyled>
          <Hidden smUp>
            <MenuMobile />
          </Hidden>
        </PageStyled>
      </ThemeProvider>
    </StylesProvider>
  );
};

Layout.defaultProps = {
  icon: null,
  image: null,
  lead: null,
  title: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.object,
  image: PropTypes.object,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default Layout;
