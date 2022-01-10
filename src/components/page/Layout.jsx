import { CssBaseline, Hidden } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider,
  css,
  styled,
} from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { isIE } from 'react-device-detect';

import theme from '../../theme';
import ErrorCard from '../ErrorCard';
import MenuMobile from '../navigation/MenuMobile';
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
  padding: 3rem;
  display: flex;
  flex-direction: column;
`);

const ContentStyled = styled('main')(css`
  flex-basis: 100%;
  padding-bottom: 3rem;
`);

const LeadinStyled = styled('h2')(({ theme }) => ({
  alignSelf: 'center',
  textAlign: 'center',
  marginBottom: '2rem',
}));

const Layout = (props) => {
  let { children, icon, image, lead, title } = props;

  if (isIE) {
    children = (
      <ErrorCard message="The Internet Explorer is not supported. Please download Firefox." />
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
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
    </StyledEngineProvider>
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
