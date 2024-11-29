import { List, Paper } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import BasicLayout from '../components/layout/BasicLayout';
import BoopedListItem from '../components/list/BoopedListItem';
import MetaData from '../components/page/MetaData';

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx;

  return (
    <BasicLayout image={data.file} title="my blog" lead="ramblings and stuff I find noteworthy">
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

export const Head = ({ data }) => <MetaData title="Blog" description="veeck blogs" image={data.file} />;

export default BlogIndex;
