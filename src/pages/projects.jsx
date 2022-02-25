import { Grid } from '@mui/material';
import { graphql } from 'gatsby';
import * as React from 'react';

import EntryCard from '../components/EntryCard';
import Layout from '../components/layout/layout';
import MetaData from '../components/page/MetaData';

const ProjectsIndex = (props) => {
  const { data } = props;
  const { edges: posts } = data.allMdx;

  return (
    <Layout
      image={data.file}
      title="my side projects"
      lead="all the techy nerdy geeky stuff I do for fun"
    >
      <MetaData
        title="Projects"
        description="veeck tinkers"
        image={data.file}
      />
      <Grid container spacing={3}>
        {posts.map(({ node: post }, index) => (
          <EntryCard
            key={index}
            image={post.frontmatter.img.childImageSharp.gatsbyImageData}
            link={post.fields.slug}
            title={post.frontmatter.title}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "categories/projects.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 768)
      }
    }
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
  }
`;

export default ProjectsIndex;
