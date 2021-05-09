import * as React from 'react';
import { graphql } from 'gatsby';
import { List, Paper } from '@material-ui/core';
import BasicLayout from '../components/layouts/BasicLayout';
import MetaData from '../components/page/MetaData';
import BoopedListItem from '../components/BoopedListItem';

const BlogIndex = (props) => {
  const { data } = props;
  const { edges: posts } = data.allMdx;

  return (
    <BasicLayout title="my personal blog">
      <MetaData title="Blog" description={'veeck blogs'} image={data.file} />
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
        gatsbyImageData(layout: CONSTRAINED, width: 768)
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
