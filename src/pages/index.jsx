import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/page/Layout';
import Image from '../components/Image';
import SEO from '../components/page/Seo';
import Typography from '@material-ui/core/Typography';
import ProTip from '../components/ProTip';
import Box from '@material-ui/core/Box';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Typography variant="h1" component="h1" gutterBottom>
      veeck.de
    </Typography>
    <Box my={4}>
      <p>Welcome to my new Gatsby site.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/links/">Go to links page</Link>
      <ProTip />
    </Box>
  </Layout>
);

export default IndexPage;
