import * as React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container className={classes.main} maxWidth={'md'} component={'main'}>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

Layout.defaultProps = {};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
