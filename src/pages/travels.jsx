import * as React from 'react';
import { graphql } from 'gatsby';
import { Grid } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import EntryCard from '../components/EntryCard';

const TravelsIndex = (props) => {
  const { edges: posts } = props.data.allMdx;

  return (
    <Layout title="my travel diaries">
      <SEO title="Travel" description="veeck travels" />
      <Grid container spacing={3}>
        {posts.map(({ node: post }, index) => (
          <EntryCard
            key={index}
            image={post.frontmatter.img.childImageSharp.fluid}
            link={post.fields.slug}
            title={`${post.frontmatter.when} - ${post.frontmatter.where}`}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query travelsIndex {
    allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/travels/" } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            when
            where
            img {
              childImageSharp {
                fluid(maxWidth: 786) {
                  ...GatsbyImageSharpFluid
                }
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
