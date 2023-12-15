import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import EntryCard from '../components/cards/EntryCard';
import BasicLayout from '../components/layout/BasicLayout';
import MetaData from '../components/page/MetaData';

const PhotoPage = (props) => {
  const { data } = props;
  const { edges: galleries } = data.allPhotosYaml;

  return (
    <BasicLayout image={data.file} title="my photos" lead="the panoramic pictures I have taken">
      <Grid container spacing={3}>
        {galleries.map(({ node: gallery }, index) => (
          <EntryCard
            key={index}
            image={gallery.img.childImageSharp.gatsbyImageData}
            link={'/photos/' + gallery.path}
            title={gallery.title}
          />
        ))}
      </Grid>
    </BasicLayout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "categories/pictures.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 768)
      }
    }
    allPhotosYaml {
      edges {
        node {
          id
          img {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 768)
            }
          }
          path
          title
        }
      }
    }
  }
`;

export const Head = ({ data }) => <MetaData title="Galleries" description="veeck shoots" image={data.file} />;

export default PhotoPage;
