import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
//import { chunk, sum } from 'lodash';
import FsLightbox from 'fslightbox-react';
import { GridListTile, GridList } from '@material-ui/core';
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

  const node = props.data.allPhotosYaml.edges[0].node;
  const lightboxImages = node.images.map(
    (image) => image.img.childImageSharp.gatsbyImageData.images.fallback.src
  );
  /*
  const aspectRatios = node.images.map(
    (image) => (image.img.childImageSharp.gatsbyImageData.width / image.img.childImageSharp.gatsbyImageData.height)
  );
  const itemsPerRowByBreakpoints = [2, 3, 4, 5];
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    (itemsPerRow) =>
      chunk(aspectRatios, itemsPerRow).map((rowAspectRatios) =>
        sum(rowAspectRatios)
      )
  );
  */

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

      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {node.images.map((img, index) => {
          const image = getImage(img.img);
          return (
            <GridListTile
              key={index}
              cols={1}
              className={classes.box}
              onClick={
                () => openLightbox(index)
                /* width={rowAspectRatioSumsByBreakpoints.map(
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
                )} */
              }
            >
              <GatsbyImage image={image} alt={img.caption} />
            </GridListTile>
          );
        })}
      </GridList>
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
