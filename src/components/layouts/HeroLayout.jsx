import { Container, CssBaseline } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider,
  styled,
} from '@mui/material/styles';
import { getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import PropTypes from 'prop-types';
import * as React from 'react';
import { isIE } from 'react-device-detect';

import theme from '../../theme';
import ErrorCard from '../ErrorCard';
import HeaderNew from '../page/HeaderNew';

const PageStyled = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
}));

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
          <HeaderNew bgImage={bgImage} icon={icon} lead={lead} title={title} />
          <Container sx={{ pt: 3, pb: 3 }} component="main" maxWidth="md">
            {children}
          </Container>
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
