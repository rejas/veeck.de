import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { graphql } from 'gatsby';
import { Box, Divider, Grid } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import CategoryCard from '../components/CategoryCard';

const useStyles = makeStyles(theme => ({
  adBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  grid: {
    marginBottom: theme.spacing(3),
  },
}));

const IndexPage = props => {
  const classes = useStyles();

  return (
    <Layout title="veeck" lead="computerschlampe, hoffotograf, terrorpoet">
      <SEO title="veeck.de" />
      <Grid container spacing={3} className={classes.grid}>
        <Divider />

        <CategoryCard
          title={props.data.latestProject.edges[0].node.frontmatter.title}
          subtitle=" all the techy nerdy geeky stuff I do for fun"
          slug={props.data.latestProject.edges[0].node.fields.slug}
          excerpt={props.data.latestProject.edges[0].node.excerpt}
          category={props.data.latestProject.edges[0].node.frontmatter.category}
          categoryImage={
            props.data.latestProject.edges[0].node.frontmatter.img
              .childImageSharp.fluid
          }
          categoryLink="/projects"
          categoryName="Computer&shy;schlampe"
        />

        <CategoryCard
          title={props.data.latestTravel.edges[0].node.frontmatter.title}
          subtitle="my diaries from around the world"
          slug={props.data.latestTravel.edges[0].node.fields.slug}
          excerpt={props.data.latestTravel.edges[0].node.excerpt}
          category={props.data.latestTravel.edges[0].node.frontmatter.category}
          categoryLink="/travels"
          categoryImage={
            props.data.latestTravel.edges[0].node.frontmatter.img
              .childImageSharp.fluid
          }
          categoryName="Terror&shy;poet"
        />

        <CategoryCard
          title={props.data.latestImage.edges[0].node.title}
          subtitle="showing of my pictures from around the world"
          excerpt={props.data.latestImage.edges[0].node.lead}
          slug={'photos/' + props.data.latestImage.edges[0].node.path}
          category={'camera'}
          categoryLink="/photos"
          categoryImage={
            props.data.latestImage.edges[0].node.img.childImageSharp.fluid
          }
          categoryName="Hof&shy;fotograf"
        />

        <Grid item xs={12}>
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
        </Grid>

        <CategoryCard
          title={props.data.latestBlog.edges[0].node.frontmatter.title}
          subtitle="all my ramblings and stuff I find noteworthy"
          slug={props.data.latestBlog.edges[0].node.fields.slug}
          excerpt={props.data.latestBlog.edges[0].node.excerpt}
          category="pencil"
          categoryLink="/blog"
          categoryName="Blog"
        />
      </Grid>
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
      filter: { fields: { slug: { regex: "/travels/" } } }
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
    latestImage: allPhotosYaml(
      sort: { fields: lastupdate, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          img {
            childImageSharp {
              fluid(maxWidth: 786) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          path
          title
          lead
        }
      }
    }
  }
`;

export default IndexPage;
