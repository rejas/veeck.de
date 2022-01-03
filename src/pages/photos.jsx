import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import EntryCard from '../components/EntryCard';
import HeroLayout from '../components/layouts/HeroLayout';
import MetaData from '../components/page/MetaData';

const PhotoPage = (props) => {
  const { data } = props;
  const { edges: galleries } = data.allPhotosYaml;

  return (
    <HeroLayout title="my photo galleries">
      <MetaData
        title="Galleries"
        description={'veeck shoots'}
        image={data.file}
      />
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
    </HeroLayout>
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
