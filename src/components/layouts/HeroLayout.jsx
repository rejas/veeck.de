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
import Credits from '../page/Credits';
import Header from '../page/Header';
import MenuMobile from '../page/MenuMobile';

const PageStyled = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '3fr 7fr',

  [theme.breakpoints.down('sm')]: {
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

const HeroLayout = (props) => {
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

HeroLayout.defaultProps = {
  image: null,
  title: null,
  lead: null,
};

HeroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.object,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default HeroLayout;
