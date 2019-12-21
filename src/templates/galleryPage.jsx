import React from 'react';
import Layout from '../components/page/Layout';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const GalleryTemplate = props => {
  const node = props.data.allPhotosYaml.edges[0].node;

  return (
    <Layout>
      <ul>
        {node.images.map((image, index) => {
          return (
            <li key={`content_item_${index}`}>
              <Img fluid={image.img.childImageSharp.fluid} />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query YamlPostQuery($id: String) {
    allPhotosYaml(filter: { id: { eq: $id } }) {
      edges {
        node {
          images {
            img {
              childImageSharp {
                resize(width: 1500, height: 1500) {
                  src
                }
                fluid(maxWidth: 786) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            caption
            isNew
          }
        }
      }
    }
  }
`;

export default GalleryTemplate;
