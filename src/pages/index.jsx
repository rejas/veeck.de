import React from 'react';
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';
import ExploreIcon from '@material-ui/icons/Explore';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Typography variant="h1" gutterBottom>
        Welcome to my new Gatsby site.
      </Typography>
      <Typography variant="h2" gutterBottom>
        what is this
      </Typography>

      <Typography variant="body1">
        Welcome to my private homepage. you can take the subtitle as a strong
        hint on what you can find here:
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary="as a geek I use this page as a playground for trying out programming stuff, mostly html5/css3/js" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhotoCameraIcon />
          </ListItemIcon>
          <ListItemText primary="the photographer wants to show of his pictures from around the world" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="and the terrorpoet writes his travel diaries down and posts them here" />
        </ListItem>
      </List>

      <Box>
        <iframe
          title="vivaconagua"
          src="//www.vivaconagua.org/banner/vca"
          frameBorder="0"
          width="350"
          height="64"
        >
          <a
            href="https://www.vivaconagua.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Viva con Agua - Alle für Wasser! Wasser für Alle!
          </a>
        </iframe>
      </Box>

      <Typography variant="h2" gutterBottom>
        where have I been
      </Typography>
      <Link href="/travel/">Go to travel page</Link>

      <Typography variant="h2" gutterBottom>
        what do I do
      </Typography>
      <Link href="/projects/">Go to projects page</Link>

      <Typography variant="h2" gutterBottom>
        what do I see
      </Typography>
      <Link href="/photos/">Go to photo page</Link>
    </Layout>
  );
};

export default IndexPage;
