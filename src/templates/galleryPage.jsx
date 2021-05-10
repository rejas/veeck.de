import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { chunk, sum } from 'lodash';
import { SRLWrapper } from 'simple-react-lightbox';
import { Box, Grid } from '@material-ui/core';
import BasicLayout from '../components/layouts/BasicLayout';
import { makeStyles } from '@material-ui/core/styles';
import { useSearchParams } from '../hooks/use-search-param';
import MetaData from '../components/page/MetaData';

const useStyles = makeStyles((theme) => ({
  box: {
    cursor: 'pointer',
  },
}));

const GalleryTemplate = (props) => {
  const classes = useStyles();
  const searchParams = useSearchParams();

  const data = props.data;
  const images = data.images.edges[0].node.images;
  const node = data.images.edges[0].node;
  const thumbnails = node.images;

  const aspectRatios = images.map(
    (image) => image.img.childImageSharp.gatsbyImageData.aspectRatio
  );
  const lightboxImages = images.map(
    (image) => image.img.childImageSharp.gatsbyImageData.src
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

  const openLightbox = React.useCallback(
    (imageIndex) => {
      setImageIndex(imageIndex);
      setToggler(!toggler);
    },
    [toggler]
  );

  React.useEffect(() => {
    if (initialIndex >= 0) openLightbox(initialIndex);
  }, [initialIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BasicLayout title={node.title} lead={node.lead}>
      <MetaData title={node.title} />
      <SRLWrapper>
        {thumbnails.map((e, index) => {
          const image = getImage(e.img.childImageSharp.gatsbyImageData);
          return (
            <a
              href={
                images[index].img.childImageSharp.gatsbyImageData.images
                  .fallback.src
              }
              key={index}
            >
              <GatsbyImage image={image} alt={e.caption} />
            </a>
          );
        })}
      </SRLWrapper>
      {/*
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
                    (image.img.childImageSharp.gatsbyImageData.aspectRatio /
                      rowAspectRatioSum) *
                    100
                  }%`;
                }
              )}
            >
              <GatsbyImage image={image.img.childImageSharp.gatsbyImageData} />
            </Box>
          );
        })}
      </Grid>
      <FsLightbox
        toggler={toggler}
        sources={lightboxImages}
        sourceIndex={imageIndex}
      />
      */}
    </BasicLayout>
  );
};

export const query = graphql`
  query YamlPostQuery($id: String) {
    thumbnails: allPhotosYaml(filter: { id: { eq: $id } }) {
      edges {
        node {
          images {
            img {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  width: 300
                  height: 300
                )
              }
            }
            caption
            isNew
            name
          }
        }
      }
    }
    images: allPhotosYaml(filter: { id: { eq: $id } }) {
      edges {
        node {
          title
          lead
          images {
            img {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
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
