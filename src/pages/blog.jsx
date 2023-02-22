import { List, Paper } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import BoopedListItem from '../components/BoopedListItem';
import Layout from '../components/layout/layout';
import MetaData from '../components/page/MetaData';

const BlogIndex = (props) => {
  const { data } = props;
  const { edges: posts } = data.allMdx;

  return (
    <Layout image={data.file} title="my blog" lead="ramblings and stuff I find noteworthy">
      <MetaData title="Blog" description="veeck blogs" image={data.file} />
      <Paper>
        <List>
          {posts.map(({ node: post }) => (
            <BoopedListItem key={post.id} post={post} />
          ))}
        </List>
      </Paper>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "categories/blog.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 768)
      }
    }
    allMdx(sort: { fields: fields___slug, order: DESC }, filter: { fields: { slug: { regex: "/blog/" } } }) {
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
