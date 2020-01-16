import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { chunk, sum } from 'lodash';
import FsLightbox from 'fslightbox-react';
import { Box, Grid } from '@material-ui/core';
import Layout from '../components/page/Layout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  box: {
    cursor: 'pointer',
  },
}));

const GalleryTemplate = props => {
  const classes = useStyles();

  const node = props.data.allPhotosYaml.edges[0].node;
  const aspectRatios = node.images.map(
    image => image.img.childImageSharp.fluid.aspectRatio
  );
  const lightboxImages = node.images.map(
    image => image.img.childImageSharp.fluid.src
  );
  const itemsPerRowByBreakpoints = [2, 3, 4, 5];
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios)
      )
  );

  const [toggler, setToggler] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const openLightbox = imageIndex => {
    setImageIndex(imageIndex + 1);
    setToggler(!toggler);
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {node.images.map((image, index) => {
          return (
            <Box
              className={classes.box}
              onClick={() => openLightbox(index)}
              key={`content_item_${index}`}
              width={rowAspectRatioSumsByBreakpoints.map(
                (rowAspectRatioSums, j) => {
                  const rowIndex = Math.floor(
                    index / itemsPerRowByBreakpoints[j]
                  );
                  const rowAspectRatioSum = rowAspectRatioSums[rowIndex];
                  return `${(image.img.childImageSharp.fluid.aspectRatio /
                    rowAspectRatioSum) *
                    100}%`;
                }
              )}
            >
              <Img fluid={image.img.childImageSharp.fluid} />
            </Box>
          );
        })}
      </Grid>
      <FsLightbox
        toggler={toggler}
        sources={lightboxImages}
        slide={imageIndex}
      />
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
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid
                  aspectRatio
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
