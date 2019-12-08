import React from 'react';
import { Link } from 'gatsby';
import Box from '@material-ui/core/Box';

import Layout from '../components/page/Layout';
import ProTip from '../components/ProTip';
import SEO from '../components/page/Seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Box my={4}>
      <p>Welcome to my new Gatsby site.</p>
      <Link to="/links/">Go to links page</Link>
      <ProTip />
    </Box>
  </Layout>
);

export default IndexPage;
