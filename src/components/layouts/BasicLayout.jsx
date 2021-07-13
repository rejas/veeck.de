import * as React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Header from '../page/Header';
import Footer from '../page/Footer';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const BasicLayout = (props) => {
  const { children, maxWidth } = props;
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container className={classes.main} maxWidth={maxWidth} component="main">
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
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
