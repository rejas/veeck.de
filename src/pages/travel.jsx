import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/page/Layout';
import { makeStyles } from '@material-ui/core/styles';
import SEO from '../components/page/Seo';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function TravelPage() {
  const classes = useStyles();
  return (
    <Layout>
      <SEO title="Travel" />
      <Card className={classes.card}>
        <CardActionArea href="/travel/2001-09-07__australien/">
          <CardMedia className={classes.media} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Australien 2001
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea href="/travel/2003-05-20__los-angeles/">
          <CardMedia className={classes.media} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              USA 2003
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Layout>
  );
}
