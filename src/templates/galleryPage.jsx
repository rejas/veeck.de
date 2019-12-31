import React from 'react';
import Layout from '../components/page/Layout';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Grid } from '@material-ui/core';

const GalleryTemplate = props => {
  const node = props.data.allPhotosYaml.edges[0].node;

  return (
    <Layout>
      <Grid container spacing={3}>
        {node.images.map((image, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`content_item_${index}`}
            >
              <Img fluid={image.img.childImageSharp.fluid} />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query YamlPostQuery($id: String) {
    allPhotosYaml(filter: { id: { eq: $id } }) {
      edges {
        node {
          images {
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
            caption
            isNew
          }
        }
      }
    }
  }
`;

export default GalleryTemplate;
