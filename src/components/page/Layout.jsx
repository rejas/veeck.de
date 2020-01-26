import React from 'react';
import PropTypes from 'prop-types';

import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Layout = props => {
  const classes = useStyles();
  const { children } = props;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <Container className={classes.main} maxWidth={'md'} component={'main'}>
          {children}
        </Container>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
