import * as React from 'react';
import { graphql } from 'gatsby';
import { Grid } from '@material-ui/core';
import BasicLayout from '../components/layouts/BasicLayout';
import SEO from '../components/page/Seo';
import EntryCard from '../components/EntryCard';

const PhotoPage = (props) => {
  const { data } = props;
  const { edges: galleries } = data.allPhotosYaml;

  return (
    <BasicLayout title="my photo galleries">
      <SEO title="Galleries" description={'veeck shoots'} image={data.file} />
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
        gatsbyImageData(layout: FULL_WIDTH, width: 600)
      }
    }
    allPhotosYaml {
      edges {
        node {
          id
          img {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, width: 786)
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
