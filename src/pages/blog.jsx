import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyLink } from 'gatsby-theme-material-ui';
import CropIcon from '@material-ui/icons/Crop32';
import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Paper,
} from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';

const BlogIndex = props => {
  const { edges: posts } = props.data.allMdx;

  return (
    <Layout>
      <SEO title="Blog" description={'veeck blogs'} />
      <Paper>
        <List>
          {posts.map(({ node: post }) => (
            <ListItem button component={GatsbyLink} to={post.fields.slug}>
              <ListItemIcon>
                <CropIcon />
              </ListItemIcon>
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
