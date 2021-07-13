import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import FsLightbox from 'fslightbox-react';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import TitleLayout from '../components/layouts/TitleLayout';
import { makeStyles } from '@material-ui/core/styles';
import { useSearchParams } from '../hooks/use-search-param';
import MetaData from '../components/page/MetaData';

const useStyles = makeStyles((theme) => ({
  box: {
    cursor: 'pointer',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const GalleryTemplate = (props) => {
  const classes = useStyles();
  const searchParams = useSearchParams();

  const node = props.data.allPhotosYaml.edges[0].node;
  const lightboxImages = node.images.map(
    (image) => image.img.childImageSharp.gatsbyImageData.images.fallback.src
  );

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
    [toggler]
  );

  React.useEffect(() => {
    if (initialIndex >= 0) openLightbox(initialIndex);
  }, [initialIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TitleLayout title={node.title} lead={node.lead} maxWidth={false}>
      <MetaData title={node.title} />

      <GridList className={classes.gridList} cols={4}>
        {node.images.map((img, index) => {
          const image = getImage(img.img);
          const { col, row } = aspectRatios[index];
          return (
            <GridListTile
              key={index}
              cols={col}
              rows={row}
              className={classes.box}
              onClick={() => openLightbox(index)}
            >
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
                <GridListTileBar
                  className={classes.titleBar}
                  title=""
                  titlePosition="bottom"
                  actionIcon={
                    <IconButton>
                      <FiberNewIcon color="secondary" />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              )}
            </GridListTile>
          );
        })}
      </GridList>
      <FsLightbox
        toggler={toggler}
        sources={lightboxImages}
        sourceIndex={imageIndex}
      />
    </TitleLayout>
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

export default GalleryTemplate;
