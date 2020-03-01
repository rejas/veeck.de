import * as React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Header from './Header';
import Footer from './Footer';
import { Headline1 } from '../shortcodes/Typography';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  lead: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <Container className={classes.main} maxWidth={'md'} component={'main'}>
          {props.title && <Headline1>{props.title}</Headline1>}
          {props.lead && (
            <Typography
              className={classes.lead}
              gutterBottom
              variant="subtitle1"
            >
              {props.lead}
            </Typography>
          )}
          {children}
        </Container>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default Layout;
