import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import { CardActionArea } from 'gatsby-theme-material-ui';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCameraOutlined';

import Layout from '../components/page/Layout';
import LightBulbIcon from '../components/icons/LightBulb';
import SEO from '../components/page/Seo';

const useStyles = makeStyles(theme => ({
  adBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    marginBottom: theme.spacing(3),
  },
  arrow: {
    display: 'flex',
  },
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Home" />
      <Typography variant="h1" gutterBottom>
        computerschlampe - hoffotograf - terrorpoet
      </Typography>

      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader avatar={<LightBulbIcon />} title={'What do I do?'} />
            <CardActionArea to="/projects">
              <CardContent>
                <Typography variant={'body1'} gutterBottom>
                  as a geek I use this page as a playground for trying out
                  programming stuff, mostly html5/css3/js
                </Typography>
                <Typography className={classes.arrow} variant={'body2'}>
                  <ArrowForwardIcon fontSize={'small'} /> to the projects page
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader avatar={<PhotoCameraIcon />} title={'What do I see?'} />
            <CardActionArea to="/photos">
              <CardContent>
                <Typography variant={'body1'} gutterBottom>
                  the photographer wants to show of his pictures from around the
                  world
                </Typography>
                <Typography className={classes.arrow} variant={'body2'}>
                  <ArrowForwardIcon fontSize={'small'} /> to the photo page
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader avatar={<ExploreIcon />} title={'Where have I been?'} />
            <CardActionArea to="/travel">
              <CardContent>
                <Typography variant={'body1'} gutterBottom>
                  the terrorpoet writes his travel diaries down and posts them
                  here
                </Typography>
                <Typography className={classes.arrow} variant={'body2'}>
                  <ArrowForwardIcon fontSize={'small'} />
                  to the travel page
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Box className={classes.adBox}>
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
    </Layout>
  );
};

export default IndexPage;
