import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';

const TravelsIndex = ({ data }) => {
  const { edges: posts } = data.allMdx;

  return (
    <Layout>
      <SEO title="Travel" />
      <Grid container spacing={3}>
        {posts.map(({ node: post }) => (
          <Grid key={post.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea href={post.fields.slug}>
                <Img fluid={post.frontmatter.img.childImageSharp.fluid} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.frontmatter.when} - {post.frontmatter.where}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query travelsIndex {
    allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/travel/" } } }
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
                resize(width: 1500, height: 1500) {
                  src
                }
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
