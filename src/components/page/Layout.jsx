/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import Container from '@material-ui/core/Container';
import { MDXProvider } from '@mdx-js/react';
import { Link, List, ListItem } from '@material-ui/core';
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

const Layout = ({ children }) => {
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
      <main>
        <Container maxWidth="md">{children}</Container>
      </main>
      <Footer />
    </MDXProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
