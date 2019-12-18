import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';

import Layout from '../components/page/Layout';
import ProTip from '../components/ProTip';
import SEO from '../components/page/Seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Box my={4}>
      <Typography>Welcome to my new Gatsby site.</Typography>
      <Link href="/links/">Go to links page</Link>
      <ProTip />
    </Box>
  </Layout>
);

export default IndexPage;
