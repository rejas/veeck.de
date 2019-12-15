import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import { Headline1 } from '../components/Typography';

const TravelTemplate = ({ data: { mdx } }) => {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} lang={mdx.frontmatter.lang} />
      <Headline1>{mdx.frontmatter.title}</Headline1>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        lang
      }
    }
  }
`;

export default TravelTemplate;
