import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';

import Layout from '../components/page/Layout';
import ProTip from '../components/ProTip';
import SEO from '../components/page/Seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Box my={4}>
      <Typography variant="h1">Welcome to my new Gatsby site.</Typography>
      <Typography variant="h2">what is this</Typography>
      <p>
        Welcome to my private homepage. you can take the subtitle as a strong
        hint on what you can find here:
      </p>

      <ul className="article__list">
        <li>
          as a geek I use this page as a playground for trying out programming
          stuff, mostly html5/css3/js
        </li>
        <li>
          the photographer wants to show of his pictures from around the world
        </li>
        <li>
          and the terrorpoet writes his travel diaries down and posts them here
        </li>
      </ul>

      <iframe
        title="vivaconagua"
        src="//www.vivaconagua.org/banner/vca"
        frameBorder="0"
        width="350"
        height="60"
      >
        <a
          href="https://www.vivaconagua.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Viva con Agua - Alle für Wasser! Wasser für Alle!
        </a>
      </iframe>

      <Typography variant="h2">where have I been</Typography>
      <Link href="/travel/">Go to travel page</Link>

      <Typography variant="h2">what do I do</Typography>
      <Link href="/projects/">Go to projects page</Link>

      <Typography variant="h2">what do I see</Typography>
      <Link href="/photos/">Go to photo page</Link>

      <ProTip />
    </Box>
  </Layout>
);

export default IndexPage;
