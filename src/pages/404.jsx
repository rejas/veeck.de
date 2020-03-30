import * as React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Typography } from '@material-ui/core';

import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';

const NotFoundPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Typography variant="h2" component="h2" gutterBottom>
        I am sorry Dave
      </Typography>
      <Img fluid={data.file.childImageSharp.fluid} />
      <p>I cannot let you find this page...</p>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "hal_404.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default NotFoundPage;
