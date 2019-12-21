import React from 'react';
import Layout from '../components/page/Layout';
import { graphql } from 'gatsby';
import SEO from '../components/page/Seo';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Img from 'gatsby-image';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const PhotoPage = ({ data }) => {
  const { edges: galleries } = data.allPhotosYaml;
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Galleries" />
      <Grid container spacing={3}>
        {galleries.map(({ node: gallery }) => (
          <Grid key={gallery.id} item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
              <CardActionArea href={'/photos/' + gallery.path}>
                <Img fluid={gallery.img.childImageSharp.fluid} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {gallery.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allPhotosYaml {
      edges {
        node {
          id
          img {
            childImageSharp {
              resize(width: 1500, height: 1500) {
                src
              }
              fluid(maxWidth: 786) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          path
          title
        }
      }
    }
  }
`;

export default PhotoPage;
