import { BigHead } from '@bigheads/core';
import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import CategoryCard from '../components/CategoryCard';
import HeroLayout from '../components/layouts/HeroLayout';
import MetaData from '../components/page/MetaData';

const IndexPage = (props) => {
  const { data } = props;

  return (
    <HeroLayout
      title="veeck.de"
      lead="computerschlampe, hoffotograf, terrorpoet"
      icon={

        <BigHead
          accessory="shades"
          body="chest"
          circleColor="blue"
          clothing="shirt"
          clothingColor="black"
          eyebrows="raised"
          eyes="simple"
          faceMask={false}
          faceMaskColor="white"
          facialHair="mediumBeard"
          graphic="react"
          hair="none"
          hairColor="white"
          hat="none"
          hatColor="blue"
          lashes
          lipColor="red"
          mask
          mouth="openSmile"
          skinTone="light"
        />
      }
    >
      <MetaData title="veeck.de" thumbnail={data.file} />

      <Grid container spacing={3}>
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
          subtitle="all the techy nerdy geeky stuff I do for fun"
          slug={data.latestProject.edges[0].node.fields.slug}
          excerpt={data.latestProject.edges[0].node.excerpt}
          category={data.latestProject.edges[0].node.frontmatter.category}
          categoryImage={
            data.latestProject.edges[0].node.frontmatter.img.childImageSharp
              .gatsbyImageData
          }
          categoryLink="/projects"
          categoryName="Computer&shy;schlampe"
        />

        <CategoryCard
          title={data.latestImage.edges[0].node.title}
          subtitle="the panoramic pictures I have taken"
          excerpt={data.latestImage.edges[0].node.lead}
          slug={'photos/' + data.latestImage.edges[0].node.path}
          category="photos"
          categoryLink="/photos"
          categoryImage={
            data.latestImage.edges[0].node.img.childImageSharp.gatsbyImageData
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
              .gatsbyImageData
          }
          categoryName="Terror&shy;poet"
        />
      </Grid>
    </HeroLayout>
  );
};

export const query = graphql`
  {
    file(relativePath: { eq: "categories/index.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 768)
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
                gatsbyImageData(layout: CONSTRAINED, width: 768)
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
                gatsbyImageData(layout: CONSTRAINED, width: 768)
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
      sort: { fields: last_update, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          img {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 768)
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
