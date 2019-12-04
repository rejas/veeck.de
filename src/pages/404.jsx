import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query {
      fileName: file(relativePath: { eq: "hal_404.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Typography variant="h2" component="h2" gutterBottom>
        I am sorry Dave
      </Typography>
      <Img fluid={data.fileName.childImageSharp.fluid} />
      <p>I cannot let you find this page...</p>
    </Layout>
  );
};

export default NotFoundPage;
