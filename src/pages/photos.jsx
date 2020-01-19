import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';

const PhotoPage = props => {
  const { edges: galleries } = props.data.allPhotosYaml;

  return (
    <Layout>
      <SEO title="Galleries" description={'veeck shots'} />
      <Grid container spacing={3}>
        {galleries.map(({ node: gallery }) => (
          <Grid key={gallery.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea to={'/photos/' + gallery.path}>
                <Img fluid={gallery.img.childImageSharp.fluid} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {gallery.title}
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
  query MyQuery {
    allPhotosYaml {
      edges {
        node {
          id
          img {
            childImageSharp {
              fluid(maxWidth: 786) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          path
          title
        }
      }
    }
  }
`;

export default PhotoPage;
