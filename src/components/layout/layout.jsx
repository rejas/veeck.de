import { CssBaseline, Hidden, Typography } from '@mui/material';
import { ThemeProvider, css, styled } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

import { getTheme } from '../../theme';
import MenuMobile from '../navigation/MenuMobile';
import Credits from '../page/Credits';
import Header from '../page/Header';
import { darkModeContext } from '../ui/ThemeHandler';
import './layout.css';

const PageStyled = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '3fr 7fr',
  //backgroundImage: `linear-gradient(to bottom right, ${theme.palette.secondary.main},${theme.palette.primary.main},#000)`,

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const MainStyled = styled('div')(css`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  //background-image: linear-gradient(to bottom right, #fc0345,#fc03b1,#4a03fc);
`);

const ContentStyled = styled('main')(css`
  flex-basis: 100%;
  padding-bottom: 2rem;
`);

const LeadinStyled = styled(Typography)(css`
  align-self: center;
  text-align: center;
  margin-bottom: 2rem;
`);

const Layout = (props) => {
  let { children, image, lead, title } = props;

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
  return (
    <StylesProvider>
      <ThemeProvider theme={getTheme(darkMode)}>
        <CssBaseline />
        <PageStyled>
          <Header image={image} lead={lead} title={title} />
          <MainStyled>
            <LeadinStyled variant="h2">{lead}</LeadinStyled>
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
