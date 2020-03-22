import React from 'react';
import { graphql } from 'gatsby';
import { Grid } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import EntryCard from '../components/EntryCard';

const PhotoPage = (props) => {
  const { edges: galleries } = props.data.allPhotosYaml;

  return (
    <Layout title="my photo galleries">
      <SEO title="Galleries" description={'veeck shots'} />
      <Grid container spacing={3}>
        {galleries.map(({ node: gallery }, index) => (
          <EntryCard
            key={index}
            image={gallery.img.childImageSharp.fluid}
            link={'/photos/' + gallery.path}
            title={gallery.title}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allPhotosYaml {
      edges {
        node {
          id
          img {
            childImageSharp {
              fluid(maxWidth: 786) {
                ...GatsbyImageSharpFluid
              }
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
