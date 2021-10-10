import * as React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container } from '@mui/material';
import {
  styled,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { isIE } from 'react-device-detect';
import theme from '../../theme';
import Header from '../page/Header';
import Footer from '../page/Footer';
import ErrorCard from '../ErrorCard';

const ContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const BasicLayout = (props) => {
  let { children, maxWidth } = props;

  if (isIE) {
    children = (
      <ErrorCard message="The Internet Explorer is not supported. Please download Firefox." />
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <ContainerStyled maxWidth={maxWidth} component="main">
          {children}
        </ContainerStyled>
        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

BasicLayout.defaultProps = {
  maxWidth: 'md',
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default BasicLayout;
