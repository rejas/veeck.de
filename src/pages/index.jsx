import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { graphql } from 'gatsby';
import { Box, Divider, Grid } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import CategoryCard from '../components/CategoryCard';

const useStyles = makeStyles((theme) => ({
  adBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: `0 -12px ${theme.spacing(3)}px`,
  },
}));

const IndexPage = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <Layout title="veeck" lead="computerschlampe, hoffotograf, terrorpoet">
      <SEO title="veeck.de" thumbnail={data.file} />
      <Grid container spacing={3}>
        <Divider />

        <CategoryCard
          title={data.latestBlog.edges[0].node.frontmatter.title}
          subtitle="ramblings and stuff I find noteworthy"
          slug={data.latestBlog.edges[0].node.fields.slug}
          excerpt={data.latestBlog.edges[0].node.excerpt}
          category="blog"
          categoryLink="/blog"
          categoryName="Blog"
        />

        <CategoryCard
          title={data.latestProject.edges[0].node.frontmatter.title}
          subtitle=" all the techy nerdy geeky stuff I do for fun"
          slug={data.latestProject.edges[0].node.fields.slug}
          excerpt={data.latestProject.edges[0].node.excerpt}
          category={data.latestProject.edges[0].node.frontmatter.category}
          categoryImage={
            data.latestProject.edges[0].node.frontmatter.img.childImageSharp
              .fluid
          }
          categoryLink="/projects"
          categoryName="Computer&shy;schlampe"
        />

        <CategoryCard
          title={data.latestImage.edges[0].node.title}
          subtitle="the panoramic pictures I have taken"
          excerpt={data.latestImage.edges[0].node.lead}
          slug={'photos/' + data.latestImage.edges[0].node.path}
          category={'photos'}
          categoryLink="/photos"
          categoryImage={
            data.latestImage.edges[0].node.img.childImageSharp.fluid
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
          title={data.latestTravel.edges[0].node.frontmatter.title}
          subtitle="my travel diaries from around the world"
          slug={data.latestTravel.edges[0].node.fields.slug}
          excerpt={data.latestTravel.edges[0].node.excerpt}
          category={data.latestTravel.edges[0].node.frontmatter.category}
          categoryLink="/travels"
          categoryImage={
            data.latestTravel.edges[0].node.frontmatter.img.childImageSharp
              .fluid
          }
          categoryName="Terror&shy;poet"
        />
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "categories/index.jpg" }) {
      childImageSharp {
        sizes(maxWidth: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
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
