import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby-theme-material-ui';

import {
  Divider,
  CssBaseline,
  Container,
  List,
  ListItem,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';

import Audio from '../shortcodes/Audio';
import CodeBlock from '../shortcodes/CodeBlock';
import WowFeed from '../shortcodes/WowFeed';

import Header from './Header';
import Footer from './Footer';
import {
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Paragraph,
} from '../Typography';

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
        {/* MDXProvider allows us to change how mdx blocks are rendered. */}
        <MDXProvider
          components={{
            h1: Headline1,
            h2: Headline2,
            h3: Headline3,
            h4: Headline4,
            h5: Headline5,
            h6: Headline6,
            p: Paragraph,
            a: Link,
            hr: Divider,
            ul: List,
            ol: List,
            li: ListItem,
            code: CodeBlock,
            Audio,
            WowFeed,
          }}
        >
          <Header />
          <Container
            className={classes.main}
            maxWidth={'md'}
            component={'main'}
          >
            {children}
          </Container>
          <Footer />
        </MDXProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
