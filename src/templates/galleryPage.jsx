import FiberNewIcon from '@mui/icons-material/FiberNew';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import FsLightbox from 'fslightbox-react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';

import BasicLayout from '../components/layout/BasicLayout';
import MetaData from '../components/page/MetaData';
import { useSearchParams } from '../hooks/use-search-param';

const ImageListItemStyled = styled(ImageListItem)(() => ({
  cursor: 'pointer',
}));

const ImageListItemBarStyled = styled(ImageListItemBar)(() => ({
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
}));

const GalleryTemplate = (props) => {
  const searchParams = useSearchParams();

  const node = props.data.allPhotosYaml.edges[0].node;
  const lightboxImages = node.images.map((image) => image.img.childImageSharp.gatsbyImageData.images.fallback.src);

  const aspectRatios = node.images.map((image) => {
    const data = image.img.childImageSharp.gatsbyImageData;
    let ar = data.width / data.height;
    if (ar < 0.5) return { col: 1, row: 2 };
    else if (ar > 1.5) return { col: 2, row: 1 };

    return { col: 1, row: 1 };
  });

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
    [toggler],
  );

  React.useEffect(() => {
    if (initialIndex >= 0) openLightbox(initialIndex);
  }, [initialIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BasicLayout title={node.title} lead={node.lead}>
      <ImageList cols={4}>
        {node.images.map((img, index) => {
          const image = getImage(img.img);
          const { col, row } = aspectRatios[index];
          return (
            <ImageListItemStyled key={index} cols={col} rows={row} onClick={() => openLightbox(index)}>
              <GatsbyImage
                image={image}
                alt={img.caption}
                style={{
                  height: '100%',
                }}
                imgStyle={{
                  objectFit: 'cover',
                  objectPosition: '50% 50%',
                }}
              />
              {img.is_new && (
                <ImageListItemBarStyled
                  position="bottom"
                  actionIcon={
                    <IconButton size="large">
                      <FiberNewIcon color="secondary" />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              )}
            </ImageListItemStyled>
          );
        })}
      </ImageList>
      <FsLightbox toggler={toggler} sources={lightboxImages} sourceIndex={imageIndex} />
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
            is_new
            name
          }
        }
      }
    }
  }
`;

export const Head = (props) => <MetaData title={props.data.allPhotosYaml.edges[0].node.title} />;

export default GalleryTemplate;
