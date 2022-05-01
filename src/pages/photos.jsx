import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import EntryCard from '../components/EntryCard';
import Layout from '../components/layout/layout';
import MetaData from '../components/page/MetaData';

const PhotoPage = (props) => {
  const { data } = props;
  const { edges: galleries } = data.allPhotosYaml;

  return (
    <Layout image={data.file} title="my photo galleries" lead="the panoramic pictures I have taken">
      <MetaData title="Galleries" description={'veeck shoots'} image={data.file} />
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
    </Layout>
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

export default PhotoPage;
