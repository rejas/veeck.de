import React from 'react';

import Layout from '../components/page/Layout';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import SEO from '../components/page/Seo';
import Img from 'gatsby-image';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx;
  console.log(posts);
  const classes = useStyles();
  return (
    <Layout>
      <SEO title="Travel" />
      <Grid container spacing={3}>
        {posts.map(({ node: post }) => (
          <Grid key={post.id} item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
              <CardActionArea href={post.fields.slug}>
                <Img fluid={post.frontmatter.img.childImageSharp.fluid} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.frontmatter.title}
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

export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default BlogIndex;
