import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { graphql } from 'gatsby';
import { Box, Grid, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import CategoryCard from '../components/CategoryCard';
import { Link } from 'gatsby-theme-material-ui';

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

  return (
    <Layout>
      <SEO title="Home" />
      <Grid container spacing={3} className={classes.grid}>
        <CategoryCard
          title={props.data.latestBlog.edges[0].node.frontmatter.title}
          slug={props.data.latestBlog.edges[0].node.fields.slug}
          excerpt={props.data.latestBlog.edges[0].node.excerpt}
          category="pencil"
          categoryName="blog"
        >
          <Typography variant={'subtitle1'} gutterBottom>
            all my ramblings and stuff I find noteworthy
          </Typography>
          <Link className={classes.arrow} noWrap key="home" to="/blog">
            <ArrowForwardIcon fontSize={'small'} />
            <Typography variant="h4">all blog entries</Typography>
          </Link>
        </CategoryCard>

        <CategoryCard
          title={props.data.latestProject.edges[0].node.frontmatter.title}
          slug={props.data.latestProject.edges[0].node.fields.slug}
          excerpt={props.data.latestProject.edges[0].node.excerpt}
          category={props.data.latestProject.edges[0].node.frontmatter.category}
          categoryImage={
            props.data.latestProject.edges[0].node.frontmatter.img
              .childImageSharp.fluid
          }
          categoryName="computerschlampe"
        >
          <Typography variant={'subtitle1'} gutterBottom>
            all the techy stuff I do for fun, hard & soft :-)
          </Typography>
          <Link className={classes.arrow} noWrap key="home" to="/projects">
            <ArrowForwardIcon fontSize={'small'} />
            <Typography variant="h4">all projects</Typography>
          </Link>
        </CategoryCard>

        <CategoryCard
          title={props.data.latestTravel.edges[0].node.frontmatter.title}
          slug={props.data.latestTravel.edges[0].node.fields.slug}
          excerpt={props.data.latestTravel.edges[0].node.excerpt}
          category={props.data.latestTravel.edges[0].node.frontmatter.category}
          categoryImage={
            props.data.latestTravel.edges[0].node.frontmatter.img
              .childImageSharp.fluid
          }
          categoryName="terrorpoet"
        >
          <Typography variant={'subtitle1'} gutterBottom>
            I write diaries when I am traveling the world and post them here
          </Typography>
          <Link className={classes.arrow} noWrap key="home" to="/travel">
            <ArrowForwardIcon fontSize={'small'} />
            <Typography variant="h4">all travel diaries</Typography>
          </Link>
        </CategoryCard>

        <CategoryCard category={'camera'} categoryName="hoffotograf">
          <Typography variant={'subtitle1'} gutterBottom>
            showing of my pictures from around the world
          </Typography>
          <Link className={classes.arrow} noWrap key="home" to="/photos">
            <ArrowForwardIcon fontSize={'small'} />
            <Typography variant="h4">all galleries</Typography>
          </Link>
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
            img {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                  aspectRatio
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
            img {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                  aspectRatio
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

export default IndexPage;
