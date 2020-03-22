import React from 'react';
import { graphql } from 'gatsby';
import { Grid } from '@material-ui/core';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import EntryCard from '../components/EntryCard';

const ProjectsIndex = (props) => {
  const { edges: posts } = props.data.allMdx;

  return (
    <Layout title="my side projects">
      <SEO title="Projects" description="veeck tinkers" />
      <Grid container spacing={3}>
        {posts.map(({ node: post }, index) => (
          <EntryCard
            key={index}
            image={post.frontmatter.img.childImageSharp.fluid}
            link={post.fields.slug}
            title={post.frontmatter.title}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query projectsIndex {
    allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/projects/" } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
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

export default ProjectsIndex;
