import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { graphql } from 'gatsby';
import { Box, Grid, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import CategoryCard from '../components/CategoryCard';

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

const IndexPage = props => {
  const classes = useStyles();

  console.log(props.data);

  return (
    <Layout title="computerschlampe - hoffotograf - terrorpoet">
      <SEO title="Home" />
      <Grid container spacing={3} className={classes.grid}>
        <CategoryCard
          title={props.data.latestTravel.edges[0].node.frontmatter.title}
          slug={props.data.latestTravel.edges[0].node.fields.slug}
          excerpt={props.data.latestTravel.edges[0].node.excerpt}
          category={props.data.latestTravel.edges[0].node.frontmatter.category}
          categoryName="terrorpoet"
        >
          <Typography variant={'body1'} gutterBottom>
            the terrorpoet writes his travel diaries down and posts them here
          </Typography>
          <Typography className={classes.arrow} variant={'body2'}>
            <ArrowForwardIcon fontSize={'small'} />
            all travel diaries
          </Typography>
        </CategoryCard>

        <CategoryCard
          title={props.data.latestProject.edges[0].node.frontmatter.title}
          slug={props.data.latestProject.edges[0].node.fields.slug}
          excerpt={props.data.latestProject.edges[0].node.excerpt}
          category={props.data.latestProject.edges[0].node.frontmatter.category}
          categoryName="computerschlampe"
        >
          <Typography variant={'body1'} gutterBottom>
            as a geek I use this page as a playground for trying out programming
            stuff, mostly html5/css3/js
          </Typography>
          <Typography className={classes.arrow} variant={'body2'}>
            <ArrowForwardIcon fontSize={'small'} /> all projects
          </Typography>
        </CategoryCard>

        <CategoryCard categoryName="hoffotograf">
          <Typography variant={'body1'} gutterBottom>
            the photographer wants to show of his pictures from around the world
          </Typography>
          <Typography className={classes.arrow} variant={'body2'}>
            <ArrowForwardIcon fontSize={'small'} /> all image galleries
          </Typography>
        </CategoryCard>

        <CategoryCard
          title={props.data.latestBlog.edges[0].node.frontmatter.title}
          slug={props.data.latestBlog.edges[0].node.fields.slug}
          excerpt={props.data.latestBlog.edges[0].node.excerpt}
          category={props.data.latestBlog.edges[0].node.frontmatter.category}
          categoryName="blog"
        >
          <Typography variant={'body1'} gutterBottom>
            all other stuff and ramblings go into my blog
          </Typography>
          <Typography className={classes.arrow} variant={'body2'}>
            <ArrowForwardIcon fontSize={'small'} />
            all blog entries
          </Typography>
        </CategoryCard>
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

export const query = graphql`
  query {
    latestBlog: allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/blog/" } } }
      limit: 1
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            category
          }
          fields {
            slug
          }
        }
      }
    }
    latestProject: allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/projects/" } } }
      limit: 1
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            category
          }
          fields {
            slug
          }
        }
      }
    }
    latestTravel: allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/travel/" } } }
      limit: 1
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
