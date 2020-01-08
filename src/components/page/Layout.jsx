/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import {
  CssBaseline,
  Container,
  Link,
  List,
  ListItem,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';

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
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            url
          }
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
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
            ul: List,
            ol: List,
            li: ListItem,
          }}
        >
          <Header
            menuLinks={data.site.siteMetadata.menuLinks}
            siteTitle={data.site.siteMetadata.title}
          />
          <main className={classes.main}>
            <Container maxWidth="md">{children}</Container>
          </main>
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
