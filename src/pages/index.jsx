import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { graphql } from 'gatsby';
import { Divider, Grid } from '@material-ui/core';
import MetaData from '../components/page/MetaData';
import CategoryCard from '../components/CategoryCard';
import { BigHead } from '@bigheads/core';
import Headlines from '../components/page/Headlines';
import Layout from '../components/page/Layout';

const useStyles = makeStyles((theme) => ({
  headlines: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}));

const IndexPage = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <BigHead
            accessory="roundGlasses"
            body="chest"
            circleColor="blue"
            clothing="shirt"
            clothingColor="red"
            eyebrows="raised"
            eyes="wink"
            facialHair="mediumBeard"
            graphic="react"
            hair="none"
            hairColor="brown"
            hat="none"
            hatColor="green"
            mask="true"
            mouth="grin"
            skinTone="light"
          />
        </Grid>
        <Grid item xs={8} className={classes.headlines}>
          <Headlines
            title="veeck"
            lead="computerschlampe, hoffotograf, terrorpoet"
          />
        </Grid>
      </Grid>

      <MetaData title="veeck.de" thumbnail={data.file} />
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
