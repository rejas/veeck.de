import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyLink } from 'gatsby-theme-material-ui';
import { List, ListItemText, ListItem, Paper } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import BlogIcon from '../components/BlogIcon';

const BlogIndex = props => {
  const { edges: posts } = props.data.allMdx;

  return (
    <Layout>
      <SEO title="Blog" description={'veeck blogs'} />
      <Paper>
        <List>
          {posts.map(({ node: post }) => (
            <ListItem button component={GatsbyLink} to={post.fields.slug}>
              <BlogIcon category={post.frontmatter.category} />
              <ListItemText primary={post.frontmatter.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Layout>
  );
};

export const query = graphql`
  query blogIndex {
    allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/blog/" } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default BlogIndex;
