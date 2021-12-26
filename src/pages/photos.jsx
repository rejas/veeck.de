import * as React from 'react';
import { graphql } from 'gatsby';
import { Grid } from '@mui/material';
import TitleLayout from '../components/layouts/TitleLayout';
import MetaData from '../components/page/MetaData';
import EntryCard from '../components/EntryCard';

const PhotoPage = (props) => {
  const { data } = props;
  const { edges: galleries } = data.allPhotosYaml;

  return (
    <TitleLayout title="my photo galleries">
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
    </TitleLayout>
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
