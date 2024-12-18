import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import EntryCard from '../components/cards/EntryCard';
import BasicLayout from '../components/layout/BasicLayout';
import MetaData from '../components/page/MetaData';

const TravelsIndex = ({ data }) => {
  const { edges: posts } = data.allMdx;

  return (
    <BasicLayout image={data.file} title="my travels" lead="travel diaries from around the world">
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
    </BasicLayout>
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

export const Head = ({ data }) => <MetaData title="Travel" description="veeck travels" image={data.file} />;

export default TravelsIndex;
