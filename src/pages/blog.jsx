import * as React from 'react';
import { graphql } from 'gatsby';
import { List, Paper } from '@material-ui/core';
import BasicLayout from '../components/layouts/BasicLayout';
import SEO from '../components/page/Seo';
import BoopedListItem from '../components/BoopedListItem';

const BlogIndex = (props) => {
  const { edges: posts } = props.data.allMdx;

  return (
    <BasicLayout title="my personal blog">
      <SEO
        title="Blog"
        description={'veeck blogs'}
        thumbnail={props.data.file}
      />
      <Paper>
        <List>
          {posts.map(({ node: post }) => (
            <BoopedListItem key={post.id} post={post} />
          ))}
        </List>
      </Paper>
    </BasicLayout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "categories/blog.jpg" }) {
      childImageSharp {
        sizes(maxWidth: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
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
            subcategory
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
