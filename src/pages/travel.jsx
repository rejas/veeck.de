import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
}));

const TravelsIndex = props => {
  const classes = useStyles();
  const { edges: posts } = props.data.allMdx;

  return (
    <Layout title="my travel diaries">
      <SEO title="Travel" description="veeck travels" />
      <Grid container spacing={3}>
        {posts.map(({ node: post }) => (
          <Grid key={post.id} item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea to={post.fields.slug}>
                <Img fluid={post.frontmatter.img.childImageSharp.fluid} />
                <CardContent>
                  <Typography component="h2" variant="subtitle1">
                    {post.frontmatter.when} - {post.frontmatter.where}
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
  query travelsIndex {
    allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/travel/" } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            when
            where
            img {
              childImageSharp {
                fluid(maxWidth: 786) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default TravelsIndex;
