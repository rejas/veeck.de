import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import EntryCard from '../components/cards/EntryCard';
import Layout from '../components/layout/layout';
import MetaData from '../components/page/MetaData';

const TravelsIndex = (props) => {
  const { data } = props;
  const { edges: posts } = data.allMdx;

  return (
    <Layout image={data.file} title="my travel diaries" lead="my travel diaries from around the world">
      <MetaData title="Travel" description="veeck travels" image={data.file} />
      <Grid container spacing={3}>
        {posts.map(({ node: post }, index) => (
          <EntryCard
            key={index}
            image={post.frontmatter.img.childImageSharp.gatsbyImageData}
            link={post.fields.slug}
            title={`${post.frontmatter.when} - ${post.frontmatter.where}`}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "categories/travels.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 768)
      }
    }
    allMdx(sort: { fields: fields___slug, order: DESC }, filter: { fields: { slug: { regex: "/travels/" } } }) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            when
            where
            img {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 768)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default TravelsIndex;
