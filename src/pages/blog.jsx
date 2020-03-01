import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyLink } from 'gatsby-theme-material-ui';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import CategoryIcon from '../components/CategoryIcon';

const BlogIndex = (props) => {
  const { edges: posts } = props.data.allMdx;

  return (
    <Layout title="my personal blog">
      <SEO title="Blog" description={'veeck blogs'} />
      <Paper>
        <List>
          {posts.map(({ node: post }) => (
            <ListItem
              button
              key={post.id}
              component={GatsbyLink}
              to={post.fields.slug}
            >
              <ListItemIcon>
                <CategoryIcon
                  category={post.frontmatter.category}
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText
                primary={post.frontmatter.title}
                secondary={post.excerpt}
              />
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
