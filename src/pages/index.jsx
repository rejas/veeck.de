import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import BasicCard from '../components/cards/BasicCard';
import Layout from '../components/layout/layout';
import MetaData from '../components/page/MetaData';

const IndexPage = (props) => {
  const { data } = props;

  return (
    <Layout image={data.file} title="veeck.de" lead="computerschlampe, hoffotograf, terrorpoet">
      <MetaData title="veeck.de" thumbnail={data.file} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BasicCard
            title={data.latestBlog.edges[0].node.frontmatter.title}
            link={data.latestBlog.edges[0].node.fields.slug}
            excerpt={data.latestBlog.edges[0].node.excerpt}
            imageAlt="Blog"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BasicCard
            title={data.latestProject.edges[0].node.frontmatter.title}
            link={data.latestProject.edges[0].node.fields.slug}
            excerpt={data.latestProject.edges[0].node.excerpt}
            image={data.latestProject.edges[0].node.frontmatter.img.childImageSharp.gatsbyImageData}
            imageAlt="Computer&shy;schlampe"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BasicCard
            title={data.latestImage.edges[0].node.title}
            link={'photos/' + data.latestImage.edges[0].node.path}
            excerpt={data.latestImage.edges[0].node.lead}
            image={data.latestImage.edges[0].node.img.childImageSharp.gatsbyImageData}
            imageAlt="Hof&shy;fotograf"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BasicCard
            title={data.latestTravel.edges[0].node.frontmatter.title}
            link={data.latestTravel.edges[0].node.fields.slug}
            excerpt={data.latestTravel.edges[0].node.excerpt}
            image={data.latestTravel.edges[0].node.frontmatter.img.childImageSharp.gatsbyImageData}
            imageAlt="Terror&shy;poet"
          />
        </Grid>
      </Grid>
    </Layout>
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
    latestImage: allPhotosYaml(sort: { fields: last_update, order: DESC }, limit: 1) {
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
