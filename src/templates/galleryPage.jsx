import * as React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { chunk, sum } from 'lodash';
import FsLightbox from 'fslightbox-react';
import { Box, Grid } from '@material-ui/core';
import BasicLayout from '../components/layouts/BasicLayout';
import { makeStyles } from '@material-ui/core/styles';
import { useSearchParams } from '../hooks/use-search-param';
import SEO from '../components/page/Seo';

const useStyles = makeStyles((theme) => ({
  box: {
    cursor: 'pointer',
  },
}));

const GalleryTemplate = (props) => {
  const classes = useStyles();
  const searchParams = useSearchParams();

  const node = props.data.allPhotosYaml.edges[0].node;
  const aspectRatios = node.images.map(
    (image) => image.img.childImageSharp.fluid.aspectRatio
  );
  const lightboxImages = node.images.map(
    (image) => image.img.childImageSharp.fluid.src
  );
  const itemsPerRowByBreakpoints = [2, 3, 4, 5];
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    (itemsPerRow) =>
      chunk(aspectRatios, itemsPerRow).map((rowAspectRatios) =>
        sum(rowAspectRatios)
      )
  );

  let initialIndex = -1;
  const name = searchParams.name;
  if (name) {
    node.images.forEach((img, i) => {
      if (img.name === name) {
        initialIndex = i;
      }
    });
  }

  const [toggler, setToggler] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(initialIndex);

  const openLightbox = (imageIndex) => {
    setImageIndex(imageIndex);
    setToggler(!toggler);
  };

  return (
    <BasicLayout title={node.title} lead={node.lead}>
      <SEO title={node.title} />
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
                  return `${
                    (image.img.childImageSharp.fluid.aspectRatio /
                      rowAspectRatioSum) *
                    100
                  }%`;
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
        sourceIndex={imageIndex}
      />
    </BasicLayout>
  );
};

export const query = graphql`
  query YamlPostQuery($id: String) {
    allPhotosYaml(filter: { id: { eq: $id } }) {
      edges {
        node {
          title
          lead
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
            name
          }
        }
      }
    }
  }
`;

export default GalleryTemplate;
