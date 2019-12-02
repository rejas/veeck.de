import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/Link';
import ProTip from '../components/ProTip';
import Layout from '../components/page/Layout';

export default function About() {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gatsby v4-beta example
          </Typography>
          <Link to="/">Go to the main page</Link>
          <ProTip />
        </Box>
      </Container>
    </Layout>
  );
}
