import { CssBaseline, Hidden } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider,
  css,
  styled,
} from '@mui/material/styles';
import { getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
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

const Layout = (props) => {
  let { children, image, lead, title, icon } = props;

  if (isIE) {
    children = (
      <ErrorCard message="The Internet Explorer is not supported. Please download Firefox." />
    );
  }

  let bgImage;
  if (image) {
    bgImage = convertToBgImage(getImage(image));
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageStyled>
          <Header bgImage={bgImage} icon={icon} lead={lead} title={title} />
          <MainStyled>
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
  image: null,
  title: null,
  lead: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.object,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default Layout;
