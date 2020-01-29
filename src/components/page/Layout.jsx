import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Header from './Header';
import Footer from './Footer';
import { Headline1, Headline2 } from '../shortcodes/Typography';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  h2: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
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
          <Headline1>{props.title}</Headline1>
          <Headline2 className={classes.h2}>{props.lead}</Headline2>
          {children}
        </Container>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
};

export default Layout;
